<?php
/**
 * Proceso de entrega y sincronización de leads hacia HubSpot CRM.
 *
 * @package AlieCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class AlieCore_HubSpot {

	const CRON_HOOK = 'alie_hubspot_cron_sync';

	/**
	 * Registra el hook del cron y el intervalo si no están definidos.
	 */
	public static function init() {
		add_filter( 'cron_schedules', array( __CLASS__, 'add_cron_interval' ) );
		add_action( self::CRON_HOOK, array( __CLASS__, 'process_queue' ) );

		if ( ! wp_next_scheduled( self::CRON_HOOK ) ) {
			wp_schedule_event( time(), 'five_minutes', self::CRON_HOOK );
		}
	}

	/**
	 * Añade intervalo de 5 minutos al cron de WordPress.
	 */
	public static function add_cron_interval( $schedules ) {
		if ( ! isset( $schedules['five_minutes'] ) ) {
			$schedules['five_minutes'] = array(
				'interval' => 300,
				'display'  => 'Cada 5 minutos',
			);
		}
		return $schedules;
	}

	/**
	 * Obtiene el token de acceso privado de HubSpot.
	 */
	public static function get_access_token() {
		if ( defined( 'HUBSPOT_ACCESS_TOKEN' ) && ! empty( HUBSPOT_ACCESS_TOKEN ) ) {
			return HUBSPOT_ACCESS_TOKEN;
		}
		return get_option( 'alie_hubspot_access_token', '' );
	}

	/**
	 * URL base de la API de HubSpot (filtrable para pruebas y simulaciones).
	 */
	public static function get_api_base_url() {
		return apply_filters( 'alie_hubspot_api_base_url', 'https://api.hubapi.com' );
	}

	/**
	 * Procesa los elementos pendientes de la cola de HubSpot.
	 *
	 * @param int $limit Número máximo de solicitudes a procesar por lote.
	 * @return array Resumen de resultados del lote procesado.
	 */
	public static function process_queue( $limit = 10 ) {
		global $wpdb;
		$table = AlieCore_DB::get_table_name();

		$token = self::get_access_token();
		if ( empty( $token ) ) {
			return array(
				'success' => false,
				'message' => 'HUBSPOT_ACCESS_TOKEN no configurado. Sincronización en espera.',
				'synced'  => 0,
			);
		}

		$items = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM {$table} WHERE hubspot_status = 'PENDING' AND attempts < 5 ORDER BY id ASC LIMIT %d",
				(int) $limit
			)
		);

		if ( empty( $items ) ) {
			return array(
				'success' => true,
				'message' => 'No hay elementos pendientes en la cola.',
				'synced'  => 0,
			);
		}

		$results = array();

		foreach ( $items as $item ) {
			$sync_result = self::sync_single_lead( $item, $token );
			$results[]   = $sync_result;
		}

		return array(
			'success' => true,
			'synced'  => count( array_filter( $results, fn( $r ) => $r['status'] === 'SYNCED' ) ),
			'items'   => $results,
		);
	}

	/**
	 * Sincroniza un lead individual hacia HubSpot de manera idempotente.
	 */
	public static function sync_single_lead( $item, $token ) {
		global $wpdb;
		$table = AlieCore_DB::get_table_name();
		$api_url = self::get_api_base_url();

		try {
			// 1. Upsert de Contacto por whatsapp_e164 (identificador único)
			$name_parts = explode( ' ', trim( $item->nombre ), 2 );
			$firstname  = $name_parts[0];
			$lastname   = isset( $name_parts[1] ) ? $name_parts[1] : '';

			$contact_props = array(
				'whatsapp_e164' => $item->whatsapp_e164,
				'phone'         => $item->whatsapp_e164,
				'mobilephone'   => $item->whatsapp,
				'firstname'     => $firstname,
			);
			if ( ! empty( $lastname ) ) {
				$contact_props['lastname'] = $lastname;
			}
			if ( ! empty( $item->email ) ) {
				$contact_props['email'] = $item->email;
			}
			if ( ! empty( $item->empresa ) ) {
				$contact_props['company'] = $item->empresa;
			}

			$contact_payload = array(
				'inputs' => array(
					array(
						'idProperty' => 'whatsapp_e164',
						'id'         => $item->whatsapp_e164,
						'properties' => $contact_props,
					),
				),
			);

			$contact_res = wp_remote_post(
				"{$api_url}/crm/v3/objects/contacts/batch/upsert",
				array(
					'headers' => array(
						'Content-Type'  => 'application/json',
						'Authorization' => 'Bearer ' . $token,
					),
					'body'    => wp_json_encode( $contact_payload ),
					'timeout' => 15,
				)
			);

			if ( is_wp_error( $contact_res ) ) {
				throw new Exception( 'Error HTTP Contacto: ' . $contact_res->get_error_message() );
			}

			$contact_code = wp_remote_retrieve_response_code( $contact_res );
			$contact_body = json_decode( wp_remote_retrieve_body( $contact_res ), true );

			if ( $contact_code < 200 || $contact_code >= 300 || empty( $contact_body['results'][0]['id'] ) ) {
				throw new Exception( 'Respuesta inválida al upsert de contacto (HTTP ' . $contact_code . ')' );
			}

			$contact_id = (string) $contact_body['results'][0]['id'];

			// 2. Upsert de Ticket por submission_id (identificador único del envío)
			$clean_servicio = explode( ' [', $item->servicio )[0];
			$ticket_props = array(
				'submission_id'      => $item->submission_id,
				'subject'            => "Lead: {$item->nombre} - {$clean_servicio}",
				'content'            => $item->mensaje,
				'hs_pipeline'        => '0',
				'hs_pipeline_stage'  => '1',
				'hs_ticket_category' => $clean_servicio,
				'source_type'        => ( 'whatsapp' === $item->canal ) ? 'WHATSAPP' : 'WEB',
			);

			$ticket_payload = array(
				'inputs' => array(
					array(
						'idProperty' => 'submission_id',
						'id'         => $item->submission_id,
						'properties' => $ticket_props,
					),
				),
			);

			$ticket_res = wp_remote_post(
				"{$api_url}/crm/v3/objects/tickets/batch/upsert",
				array(
					'headers' => array(
						'Content-Type'  => 'application/json',
						'Authorization' => 'Bearer ' . $token,
					),
					'body'    => wp_json_encode( $ticket_payload ),
					'timeout' => 15,
				)
			);

			if ( is_wp_error( $ticket_res ) ) {
				throw new Exception( 'Error HTTP Ticket: ' . $ticket_res->get_error_message() );
			}

			$ticket_code = wp_remote_retrieve_response_code( $ticket_res );
			$ticket_body = json_decode( wp_remote_retrieve_body( $ticket_res ), true );

			if ( $ticket_code < 200 || $ticket_code >= 300 || empty( $ticket_body['results'][0]['id'] ) ) {
				throw new Exception( 'Respuesta inválida al upsert de ticket (HTTP ' . $ticket_code . ')' );
			}

			$ticket_id = (string) $ticket_body['results'][0]['id'];

			// 3. Comprobar / crear asociación Ticket -> Contacto
			$assoc_res = wp_remote_request(
				"{$api_url}/crm/v4/objects/tickets/{$ticket_id}/associations/default/contacts/{$contact_id}",
				array(
					'method'  => 'PUT',
					'headers' => array(
						'Content-Type'  => 'application/json',
						'Authorization' => 'Bearer ' . $token,
					),
					'timeout' => 10,
				)
			);

			// 4. Actualizar estado exitoso en MariaDB
			$wpdb->update(
				$table,
				array(
					'hubspot_status'     => 'SYNCED',
					'hubspot_contact_id' => $contact_id,
					'hubspot_ticket_id'  => $ticket_id,
					'attempts'           => $item->attempts + 1,
					'last_error'         => null,
					'synced_at'          => current_time( 'mysql' ),
					'updated_at'         => current_time( 'mysql' ),
				),
				array( 'id' => (int) $item->id ),
				array( '%s', '%s', '%s', '%d', '%s', '%s', '%s' ),
				array( '%d' )
			);

			return array(
				'submission_id' => $item->submission_id,
				'status'        => 'SYNCED',
				'contact_id'    => $contact_id,
				'ticket_id'     => $ticket_id,
			);

		} catch ( Exception $e ) {
			$new_attempts = $item->attempts + 1;
			$new_status   = ( $new_attempts >= 5 ) ? 'FAILED' : 'PENDING';

			$wpdb->update(
				$table,
				array(
					'hubspot_status' => $new_status,
					'attempts'       => $new_attempts,
					'last_error'     => $e->getMessage(),
					'updated_at'     => current_time( 'mysql' ),
				),
				array( 'id' => (int) $item->id ),
				array( '%s', '%d', '%s', '%s' ),
				array( '%d' )
			);

			return array(
				'submission_id' => $item->submission_id,
				'status'        => $new_status,
				'attempts'      => $new_attempts,
				'error'         => $e->getMessage(),
			);
		}
	}
}
