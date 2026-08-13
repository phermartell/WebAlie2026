<?php
/**
 * Endpoint REST para recibir leads desde la landing.
 *
 * @package AlieCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class AlieCore_REST {

	public static function register() {
		register_rest_route(
			'alie/v1',
			'/lead',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'create_lead' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	public static function create_lead( WP_REST_Request $request ) {
		// Rate limit por IP: máx. 5 leads cada 10 minutos (anti-abuso).
		$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		if ( $ip ) {
			$key   = 'alie_rate_' . md5( $ip );
			$count = (int) get_transient( $key );
			if ( $count >= 5 ) {
				return new WP_Error( 'rate_limited', 'Demasiadas solicitudes. Intenta más tarde.', array( 'status' => 429 ) );
			}
			set_transient( $key, $count + 1, 10 * MINUTE_IN_SECONDS );
		}

		$nombre   = sanitize_text_field( $request->get_param( 'nombre' ) );
		$whatsapp = sanitize_text_field( $request->get_param( 'whatsapp' ) );
		$servicio = sanitize_text_field( $request->get_param( 'servicio' ) );
		$mensaje  = sanitize_textarea_field( $request->get_param( 'mensaje' ) );
		$canal    = sanitize_text_field( $request->get_param( 'canal' ) );
		$website  = sanitize_text_field( $request->get_param( 'website' ) ); // honeypot

		if ( ! empty( $website ) ) {
			return new WP_Error( 'spam_detected', 'Spam detectado', array( 'status' => 400 ) );
		}

		if ( empty( $nombre ) && empty( $whatsapp ) ) {
			return new WP_Error( 'missing_fields', 'Faltan datos obligatorios', array( 'status' => 400 ) );
		}

		$title = ! empty( $nombre ) ? $nombre : $whatsapp;

		$post_id = wp_insert_post(
			array(
				'post_type'   => 'lead',
				'post_status' => 'publish',
				'post_title'  => $title,
			)
		);

		if ( is_wp_error( $post_id ) ) {
			return new WP_Error( 'create_failed', 'No se pudo crear el lead', array( 'status' => 500 ) );
		}

		update_post_meta( $post_id, 'nombre', $nombre );
		update_post_meta( $post_id, 'whatsapp', $whatsapp );
		update_post_meta( $post_id, 'servicio', $servicio );
		update_post_meta( $post_id, 'mensaje', $mensaje );
		update_post_meta( $post_id, 'canal', $canal );

		return rest_ensure_response(
			array(
				'success' => true,
				'id'      => $post_id,
			)
		);
	}
}
