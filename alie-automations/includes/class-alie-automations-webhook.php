<?php
/**
 * Envía un webhook a n8n cuando un post de WordPress pasa a "publish".
 *
 * @package AlieAutomations
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Alie_Automations_Webhook {

	/**
	 * Registra el hook de transición de estado.
	 */
	public static function register() {
		add_action( 'transition_post_status', array( __CLASS__, 'maybe_send' ), 10, 3 );
	}

	/**
	 * Decide si debe emitirse el webhook y lo envía.
	 *
	 * @param string  $new_status Nuevo estado del post.
	 * @param string  $old_status Estado anterior del post.
	 * @param WP_Post $post       Objeto del post.
	 */
	public static function maybe_send( $new_status, $old_status, $post ) {
		// Solo posts de blog pasando a 'publish' (no republish inmediato).
		if ( 'post' !== $post->post_type || 'publish' !== $new_status || 'publish' === $old_status ) {
			return;
		}

		// Ignorar revisiones y auto-guardados.
		if ( wp_is_post_revision( $post->ID ) || wp_is_post_autosave( $post->ID ) ) {
			return;
		}

		$url    = self::get_webhook_url();
		$secret = self::get_webhook_secret();

		// FAIL CLOSED: sin endpoint o sin secreto, no se envía nada.
		if ( '' === $url || '' === $secret ) {
			self::log_safe( 'Alié Automations: webhook omitido (falta URL o secret).' );
			return;
		}

		$payload = self::build_payload( $post );

		$body = wp_json_encode( $payload );
		if ( false === $body ) {
			self::log_safe( 'Alié Automations: wp_json_encode falló para el post #' . $post->ID . '.' );
			return;
		}

		$response = wp_remote_post(
			$url,
			array(
				'method'      => 'POST',
				'timeout'     => 15,
				'redirection' => 5,
				'httpversion' => '1.1',
				// No bloqueante: publicar un post no debe depender de n8n.
				// Consecuencia: WordPress no puede verificar el status HTTP de n8n.
				'blocking'    => false,
				'headers'     => array(
					'Content-Type'          => 'application/json; charset=utf-8',
					'X-Alie-Automation-Key' => $secret,
				),
				'body'        => $body,
				'data_format' => 'body',
			)
		);

		// Con blocking=false no hay status que validar; solo se detecta fallo inmediato.
		if ( is_wp_error( $response ) ) {
			self::log_safe( 'Alié Automations: wp_remote_post falló para el post #' . $post->ID . '. ' . $response->get_error_message() );
		}
	}

	/**
	 * Resuelve el endpoint del webhook: constante → opción → vacío.
	 */
	private static function get_webhook_url() {
		if ( defined( 'ALIE_AUTOMATIONS_WEBHOOK_URL' ) && is_string( ALIE_AUTOMATIONS_WEBHOOK_URL ) ) {
			return trim( ALIE_AUTOMATIONS_WEBHOOK_URL );
		}

		$option = get_option( 'alie_automations_webhook_url', '' );

		return is_string( $option ) ? trim( $option ) : '';
	}

	/**
	 * Resuelve el secreto compartido (solo constante; nunca hardcodeado).
	 */
	private static function get_webhook_secret() {
		if ( defined( 'ALIE_AUTOMATIONS_WEBHOOK_SECRET' ) && is_string( ALIE_AUTOMATIONS_WEBHOOK_SECRET ) ) {
			return ALIE_AUTOMATIONS_WEBHOOK_SECRET;
		}

		return '';
	}

	/**
	 * Construye el payload compatible con el webhook histórico.
	 */
	private static function build_payload( $post ) {
		$featured_image_id = get_post_thumbnail_id( $post->ID );

		return array(
			'id'             => $post->ID,
			'title'          => get_the_title( $post->ID ),
			'slug'           => $post->post_name,
			'content'        => $post->post_content,
			'featured_media' => $featured_image_id ? (int) $featured_image_id : 0,
			'status'         => $post->post_status,
			'published_at'   => get_the_date( 'c', $post->ID ),
			'event_id'       => self::build_event_id( $post ),
		);
	}

	/**
	 * event_id determinista: mismo evento → mismo identificador.
	 */
	private static function build_event_id( $post ) {
		$date_gmt = isset( $post->post_date_gmt ) ? $post->post_date_gmt : '0000-00-00 00:00:00';

		return 'wp-post-published:' . $post->ID . ':' . $date_gmt;
	}

	/**
	 * Log seguro: solo bajo WP_DEBUG y sin datos sensibles.
	 */
	private static function log_safe( $message ) {
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			error_log( $message );
		}
	}
}
