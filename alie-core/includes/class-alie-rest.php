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

		$nombre     = sanitize_text_field( $request->get_param( 'nombre' ) );
		$whatsapp   = sanitize_text_field( $request->get_param( 'whatsapp' ) );
		$servicio   = sanitize_text_field( $request->get_param( 'servicio' ) );
		$mensaje    = sanitize_textarea_field( $request->get_param( 'mensaje' ) );
		$canal      = sanitize_text_field( $request->get_param( 'canal' ) );
		$website    = sanitize_text_field( $request->get_param( 'website' ) ); // honeypot
		$pagina     = sanitize_text_field( $request->get_param( 'pagina' ) );
		$formulario = sanitize_text_field( $request->get_param( 'formulario' ) );

		// C5.6A: attribution estructurada. Input NO confiable: whitelist estricta.
		// Si es inválida se descarta (null) y el lead SIEMPRE se sigue creando.
		$attribution = self::sanitize_attribution( $request->get_param( 'attribution' ) );

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
		update_post_meta( $post_id, 'pagina', $pagina );
		update_post_meta( $post_id, 'formulario', $formulario );

		// C5.6A: persiste la attribution estructurada (snapshot versionado + meta promovidos).
		// Fuente de verdad: alie_attribution. Los alie_* son copias consultables.
		if ( null !== $attribution ) {
			$snapshot = array(
				'attribution_version' => 1,
				'visitor_id'          => $attribution['visitor_id'],
				'returning_visitor'   => $attribution['returning_visitor'],
				'first_touch'         => $attribution['first_touch'],
				'last_touch'          => $attribution['last_touch'],
			);

			$encoded = wp_json_encode( $snapshot, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

			if ( false !== $encoded ) {
				update_post_meta( $post_id, 'alie_attribution', $encoded );

				// Touchpoint más relevante para la conversión:
				// last_touch si existe; si no, first_touch.
				$touch = null !== $attribution['last_touch'] ? $attribution['last_touch'] : $attribution['first_touch'];

				$promoted_fields = array(
					'gclid'    => '',
					'gbraid'   => '',
					'wbraid'   => '',
					'source'   => '',
					'medium'   => '',
					'campaign' => '',
				);

				if ( null !== $touch ) {
					$promoted_fields['gclid']    = isset( $touch['gclid'] ) ? $touch['gclid'] : '';
					$promoted_fields['gbraid']   = isset( $touch['gbraid'] ) ? $touch['gbraid'] : '';
					$promoted_fields['wbraid']   = isset( $touch['wbraid'] ) ? $touch['wbraid'] : '';
					$promoted_fields['source']   = isset( $touch['source'] ) ? $touch['source'] : '';
					$promoted_fields['medium']   = isset( $touch['medium'] ) ? $touch['medium'] : '';
					$promoted_fields['campaign'] = isset( $touch['campaign'] ) ? $touch['campaign'] : '';
				}

				foreach ( $promoted_fields as $field => $value ) {
					update_post_meta( $post_id, 'alie_' . $field, $value );
				}
			}
		}

		// Notificación por correo (destinatario configurable en Ajustes → Alié Digital).
		$to = AlieCore_Settings::get_notification_email();
		if ( $to ) {
			$subject = 'Nuevo lead desde la web: ' . $title;
			$body    = "Nombre: {$nombre}\nWhatsApp/Teléfono: {$whatsapp}\nServicio: {$servicio}\nMensaje: {$mensaje}\nCanal: {$canal}\n";
			$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
			wp_mail( $to, $subject, $body, $headers );
		}

		return rest_ensure_response(
			array(
				'success' => true,
				'id'      => $post_id,
			)
		);
	}

	/**
	 * Sanitiza el snapshot de attribution recibido del cliente (C5.6A).
	 *
	 * Input NO confiable: se aplica whitelist estricta de claves y límites
	 * alineados con src/lib/attribution-sanitize.ts. Nunca se copian arrays
	 * externos ni se serializa input arbitrario.
	 *
	 * Devuelve un array limpio con visitor_id, returning_visitor,
	 * first_touch y last_touch; o null si la atribución es inválida.
	 *
	 * @param mixed $input Parámetro 'attribution' del request.
	 * @return array|null
	 */
	private static function sanitize_attribution( $input ) {
		if ( ! is_array( $input ) ) {
			return null;
		}

		$raw_visitor_id = isset( $input['visitor_id'] ) ? $input['visitor_id'] : '';
		$visitor_id     = self::sanitize_attribution_string( $raw_visitor_id, 100 );

		// visitor_id es obligatorio y debe tener formato válido. Si falla,
		// toda la atribución se descarta; el lead NO se ve afectado.
		if ( '' === $visitor_id || ! preg_match( '/^[A-Za-z0-9_-]{8,100}$/', $visitor_id ) ) {
			return null;
		}

		return array(
			'visitor_id'        => $visitor_id,
			'returning_visitor' => ( true === ( isset( $input['returning_visitor'] ) ? $input['returning_visitor'] : false ) ),
			'first_touch'       => self::sanitize_touchpoint( isset( $input['first_touch'] ) ? $input['first_touch'] : null ),
			'last_touch'        => self::sanitize_touchpoint( isset( $input['last_touch'] ) ? $input['last_touch'] : null ),
		);
	}

	/**
	 * Sanitiza un touchpoint con whitelist estricta.
	 *
	 * @param mixed $input Touchpoint crudo.
	 * @return array|null
	 */
	private static function sanitize_touchpoint( $input ) {
		if ( ! is_array( $input ) ) {
			return null;
		}

		// timestamp obligatorio, parseable y dentro de una ventana razonable.
		$timestamp = self::sanitize_attribution_string( isset( $input['timestamp'] ) ? $input['timestamp'] : '', 40 );
		$ts        = strtotime( $timestamp );
		if ( false === $ts || $ts < strtotime( '2000-01-01T00:00:00+00:00' ) || $ts > time() + DAY_IN_SECONDS ) {
			return null;
		}

		$touch = array();

		// Campos string con límites alineados a attribution-sanitize.ts.
		$string_fields = array(
			'source'       => 100,
			'medium'       => 50,
			'campaign'     => 200,
			'content'      => 200,
			'term'         => 200,
			'referrer'     => 253,
			'landing_page' => 2000,
		);
		foreach ( $string_fields as $field => $max ) {
			$raw           = isset( $input[ $field ] ) ? $input[ $field ] : '';
			$touch[ $field ] = self::sanitize_attribution_string( $raw, $max );
		}

		// Click IDs con charset estricto.
		$click_fields = array( 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid' );
		foreach ( $click_fields as $field ) {
			$raw           = isset( $input[ $field ] ) ? $input[ $field ] : '';
			$touch[ $field ] = self::sanitize_click_id( $raw );
		}

		$touch['timestamp'] = $timestamp;

		return $touch;
	}

	/**
	 * Sanitiza un string de attribution: solo strings, sin control chars,
	 * trim y truncado al límite indicado.
	 *
	 * @param mixed $value Valor crudo.
	 * @param int   $max   Longitud máxima.
	 * @return string
	 */
	private static function sanitize_attribution_string( $value, $max ) {
		if ( ! is_string( $value ) ) {
			return '';
		}
		$value = trim( $value );
		$value = preg_replace( '/[\x00-\x1f\x7f]/', '', $value );
		if ( null === $value ) {
			$value = '';
		}
		return function_exists( 'mb_substr' ) ? mb_substr( $value, 0, $max ) : substr( $value, 0, $max );
	}

	/**
	 * Sanitiza un click ID (gclid, gbraid, wbraid, fbclid, msclkid).
	 *
	 * @param mixed $value Valor crudo.
	 * @return string
	 */
	private static function sanitize_click_id( $value ) {
		$value = self::sanitize_attribution_string( $value, 500 );
		if ( '' === $value ) {
			return '';
		}
		return preg_match( '/^[A-Za-z0-9._-]+$/', $value ) ? $value : '';
	}

}
