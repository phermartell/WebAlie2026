<?php
/**
 * Gestión de la base de datos y migración versionada de AlieCore.
 *
 * @package AlieCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ALIE_CORE_DB_VERSION', '1.1.0' );

class AlieCore_DB {

	/**
	 * Nombre de la tabla de cola de HubSpot.
	 */
	public static function get_table_name() {
		global $wpdb;
		return $wpdb->prefix . 'alie_hubspot_queue';
	}

	/**
	 * Verifica si la base de datos necesita actualización de esquema.
	 * Funciona tanto al activar el plugin como en tiempo de ejecución
	 * cuando el plugin ya está activo.
	 */
	public static function maybe_upgrade() {
		$installed_ver = get_option( 'alie_core_db_version' );

		if ( $installed_ver !== ALIE_CORE_DB_VERSION ) {
			self::install();
			update_option( 'alie_core_db_version', ALIE_CORE_DB_VERSION );
		}
	}

	/**
	 * Crea o actualiza la tabla de base de datos usando dbDelta.
	 */
	public static function install() {
		global $wpdb;

		$table_name      = self::get_table_name();
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE {$table_name} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			submission_id varchar(64) NOT NULL,
			content_hash char(64) NOT NULL,
			nombre varchar(255) NOT NULL,
			whatsapp varchar(50) NOT NULL,
			whatsapp_e164 varchar(25) NOT NULL,
			email varchar(255) DEFAULT NULL,
			empresa varchar(255) DEFAULT NULL,
			servicio varchar(255) NOT NULL,
			mensaje text DEFAULT NULL,
			canal varchar(50) NOT NULL,
			pagina varchar(500) DEFAULT NULL,
			formulario varchar(255) DEFAULT NULL,
			attribution longtext DEFAULT NULL,
			wp_post_id bigint(20) unsigned DEFAULT NULL,
			hubspot_status varchar(20) NOT NULL DEFAULT 'PENDING',
			hubspot_contact_id varchar(64) DEFAULT NULL,
			hubspot_ticket_id varchar(64) DEFAULT NULL,
			attempts int(11) NOT NULL DEFAULT 0,
			last_error text DEFAULT NULL,
			created_at datetime NOT NULL,
			updated_at datetime NOT NULL,
			synced_at datetime DEFAULT NULL,
			PRIMARY KEY  (id),
			UNIQUE KEY uq_submission_id (submission_id),
			KEY idx_status_attempts (hubspot_status, attempts)
		) {$charset_collate};";

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( $sql );
	}

	/**
	 * Normaliza un número telefónico a formato internacional E.164.
	 */
	public static function normalize_e164( $phone ) {
		$clean = preg_replace( '/[^\d+]/', '', (string) $phone );

		// Si ya tiene prefijo internacional con '+'
		if ( str_starts_with( $clean, '+' ) ) {
			$digits = substr( $clean, 1 );
			// Caso especial México con '521': suprimir el '1' móvil obsoleto
			if ( str_starts_with( $digits, '521' ) && strlen( $digits ) === 13 ) {
				return '+52' . substr( $digits, 3 );
			}
			return $clean;
		}

		// Reemplazar prefijo '00' internacional
		if ( str_starts_with( $clean, '00' ) ) {
			return '+' . substr( $clean, 2 );
		}

		$digits = preg_replace( '/\D/', '', $clean );

		// Caso México: 10 dígitos locales
		if ( strlen( $digits ) === 10 ) {
			return '+52' . $digits;
		}

		// Caso México: 12 dígitos comenzando con '52'
		if ( strlen( $digits ) === 12 && str_starts_with( $digits, '52' ) ) {
			return '+' . $digits;
		}

		// Caso México: 13 dígitos con '521'
		if ( strlen( $digits ) === 13 && str_starts_with( $digits, '521' ) ) {
			return '+52' . substr( $digits, 3 );
		}

		// Fallback: si tiene código de país razonable (> 10 dígitos)
		if ( strlen( $digits ) >= 11 ) {
			return '+' . $digits;
		}

		return '+' . $digits;
	}

	/**
	 * Calcula un hash canónico SHA-256 de los datos invariables de la solicitud.
	 * Excluye tokens de reCAPTCHA, timestamps, IPs y datos volátiles de red.
	 * Si el mensaje incluye sufijo de diagnóstico (estilo Elementor), se ignora lo posterior a "\n\n---".
	 */
	public static function calculate_content_hash( $data ) {
		$raw_mensaje = trim( (string) ( $data['mensaje'] ?? '' ) );
		if ( strpos( $raw_mensaje, "\n\n---" ) !== false ) {
			$parts       = explode( "\n\n---", $raw_mensaje, 2 );
			$raw_mensaje = trim( $parts[0] );
		}

		$canonical = array(
			'nombre'     => trim( (string) ( $data['nombre'] ?? '' ) ),
			'whatsapp'   => trim( (string) ( $data['whatsapp'] ?? '' ) ),
			'email'      => trim( (string) ( $data['email'] ?? '' ) ),
			'empresa'    => trim( (string) ( $data['empresa'] ?? '' ) ),
			'servicio'   => trim( (string) ( $data['servicio'] ?? '' ) ),
			'mensaje'    => $raw_mensaje,
			'canal'      => trim( (string) ( $data['canal'] ?? '' ) ),
			'formulario' => trim( (string) ( $data['formulario'] ?? '' ) ),
			'pagina'     => trim( (string) ( $data['pagina'] ?? '' ) ),
		);

		return hash( 'sha256', wp_json_encode( $canonical ) );
	}

	/**
	 * Obtiene un registro de la cola por su submission_id.
	 */
	public static function get_by_submission_id( $submission_id ) {
		global $wpdb;
		$table = self::get_table_name();

		return $wpdb->get_row(
			$wpdb->prepare( "SELECT * FROM {$table} WHERE submission_id = %s LIMIT 1", $submission_id )
		);
	}

	/**
	 * Intenta reclamar de manera atómica el derecho exclusivo de crear el post CPT 'lead'.
	 * Retorna true si este proceso ganó el reclamo (1 fila afectada), false si otro proceso ya lo reclamó o completó.
	 */
	public static function claim_post_creation( $queue_id ) {
		global $wpdb;
		$table = self::get_table_name();
		$affected = $wpdb->query(
			$wpdb->prepare(
				"UPDATE {$table} SET wp_post_id = -1, updated_at = %s WHERE id = %d AND wp_post_id IS NULL",
				current_time( 'mysql' ),
				(int) $queue_id
			)
		);
		return ( 1 === $affected );
	}

	/**
	 * Actualiza el wp_post_id vinculado a un registro de la cola.
	 */
	public static function link_post_id( $queue_id, $post_id ) {
		global $wpdb;
		$table = self::get_table_name();

		return $wpdb->update(
			$table,
			array(
				'wp_post_id' => (int) $post_id,
				'updated_at' => current_time( 'mysql' ),
			),
			array( 'id' => (int) $queue_id ),
			array( '%d', '%s' ),
			array( '%d' )
		);
	}

	/**
	 * Inserta una nueva solicitud en la cola de HubSpot con status PENDING.
	 */
	public static function insert_lead( $data ) {
		global $wpdb;
		$table = self::get_table_name();

		$result = $wpdb->insert(
			$table,
			array(
				'submission_id'      => $data['submission_id'],
				'content_hash'       => $data['content_hash'],
				'nombre'             => $data['nombre'],
				'whatsapp'           => $data['whatsapp'],
				'whatsapp_e164'      => $data['whatsapp_e164'],
				'email'              => ! empty( $data['email'] ) ? $data['email'] : null,
				'empresa'            => ! empty( $data['empresa'] ) ? $data['empresa'] : null,
				'servicio'           => $data['servicio'],
				'mensaje'            => $data['mensaje'],
				'canal'              => $data['canal'],
				'pagina'             => $data['pagina'],
				'formulario'         => $data['formulario'],
				'attribution'        => ! empty( $data['attribution'] ) ? wp_json_encode( $data['attribution'] ) : null,
				'wp_post_id'         => ! empty( $data['wp_post_id'] ) ? (int) $data['wp_post_id'] : null,
				'hubspot_status'     => 'PENDING',
				'hubspot_contact_id' => null,
				'hubspot_ticket_id'  => null,
				'attempts'           => 0,
				'last_error'         => null,
				'created_at'         => current_time( 'mysql' ),
				'updated_at'         => current_time( 'mysql' ),
			),
			array(
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%d', '%s',
				'%s', '%s', '%d', '%s', '%s', '%s',
			)
		);

		if ( false === $result ) {
			return false;
		}

		return $wpdb->insert_id;
	}
}
