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

		$submission_id = sanitize_text_field( $request->get_param( 'submission_id' ) );
		$email         = sanitize_email( $request->get_param( 'email' ) );
		$empresa       = sanitize_text_field( $request->get_param( 'empresa' ) );

		// Autenticación de servidor a servidor para el flujo piloto con submission_id
		// Si falta el secreto o es incorrecto, el flujo piloto debe fallar sin guardar
		if ( ! empty( $submission_id ) ) {
			$pilot_secret = defined( 'ALIE_PILOT_SECRET' ) ? ALIE_PILOT_SECRET : get_option( 'alie_pilot_secret', '' );
			$auth_header  = $request->get_header( 'x-alie-pilot-token' );
			if ( empty( $auth_header ) ) {
				$raw_auth = $request->get_header( 'authorization' );
				if ( $raw_auth && str_starts_with( $raw_auth, 'Bearer ' ) ) {
					$auth_header = substr( $raw_auth, 7 );
				}
			}
			if ( empty( $pilot_secret ) || empty( $auth_header ) || ! hash_equals( (string) $pilot_secret, (string) $auth_header ) ) {
				return new WP_Error( 'unauthorized', 'No autorizado para el flujo piloto', array( 'status' => 401 ) );
			}
		}

		$nombre     = sanitize_text_field( $request->get_param( 'nombre' ) );
		$whatsapp   = sanitize_text_field( $request->get_param( 'whatsapp' ) );
		$servicio   = sanitize_text_field( $request->get_param( 'servicio' ) );
		$mensaje    = sanitize_textarea_field( $request->get_param( 'mensaje' ) );
		$wp_mensaje = sanitize_textarea_field( $request->get_param( 'wp_mensaje' ) );
		if ( empty( $wp_mensaje ) ) {
			$wp_mensaje = $mensaje;
		}
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

		$queue_id     = null;
		$is_recovered = false;

		// 1. Guarda PRIMERO en la tabla del piloto.
		// La inserción atómica con submission_id UNIQUE decide qué petición creó la solicitud.
		if ( ! empty( $submission_id ) ) {
			$content_hash = AlieCore_DB::calculate_content_hash(
				array(
					'nombre'     => $nombre,
					'whatsapp'   => $whatsapp,
					'email'      => $email,
					'empresa'    => $empresa,
					'servicio'   => $servicio,
					'mensaje'    => $mensaje, // Conserva completo el mensaje que escribió el prospecto
					'canal'      => $canal,
					'formulario' => $formulario,
					'pagina'     => $pagina,
				)
			);

			$existing = AlieCore_DB::get_by_submission_id( $submission_id );

			if ( $existing ) {
				// Mismo submission_id con datos canónicos idénticos: recuperación idempotente
				if ( hash_equals( $existing->content_hash, $content_hash ) ) {
					$queue_id     = (int) $existing->id;
					$is_recovered = true;

					// Si ya tiene un CPT lead post vinculado, reutilizarlo sin duplicar post ni email
					if ( ! empty( $existing->wp_post_id ) ) {
						return rest_ensure_response(
							array(
								'success'       => true,
								'id'            => (int) $existing->wp_post_id,
								'queue_id'      => $queue_id,
								'submission_id' => $existing->submission_id,
								'status'        => $existing->hubspot_status,
								'recovered'     => true,
							)
						);
					}

					// Si wp_post_id es null, comprobar si el post ya existe en postmeta
					// (caso de interrupción después de crear el registro y antes de enlazarlo)
					global $wpdb;
					$dangling_post = $wpdb->get_var(
						$wpdb->prepare(
							"SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_alie_submission_id' AND meta_value = %s LIMIT 1",
							$submission_id
						)
					);
					if ( ! empty( $dangling_post ) ) {
						AlieCore_DB::link_post_id( $queue_id, (int) $dangling_post );
						return rest_ensure_response(
							array(
								'success'       => true,
								'id'            => (int) $dangling_post,
								'queue_id'      => $queue_id,
								'submission_id' => $existing->submission_id,
								'status'        => $existing->hubspot_status,
								'recovered'     => true,
							)
						);
					}

					// Si wp_post_id y postmeta son null (el proceso original se interrumpió tras guardar la fila
					// y antes de crear el registro lead), este reintento asume la finalización:
					// crea el registro lead, lo enlaza a la fila existente y confirma el envío sin quedarse en 503.
				} else {
					// Mismo submission_id con datos distintos: conflicto 409
					return new WP_Error(
						'submission_conflict',
						'El submission_id ya fue utilizado con datos distintos.',
						array( 'status' => 409 )
					);
				}
			} else {
				// Inserción primaria en wp_alie_hubspot_queue
				$whatsapp_e164 = AlieCore_DB::normalize_e164( $whatsapp );
				$inserted_id   = AlieCore_DB::insert_lead(
					array(
						'submission_id' => $submission_id,
						'content_hash'  => $content_hash,
						'nombre'        => $nombre,
						'whatsapp'      => $whatsapp,
						'whatsapp_e164' => $whatsapp_e164,
						'email'         => $email,
						'empresa'       => $empresa,
						'servicio'      => $servicio,
						'mensaje'       => $mensaje, // Mensaje completo del prospecto
						'canal'         => $canal,
						'pagina'        => $pagina,
						'formulario'    => $formulario,
						'attribution'   => $attribution,
						'wp_post_id'    => null,
					)
				);

				if ( false === $inserted_id ) {
					// Carrera concurrente: otra petición insertó el submission_id en este microsegundo
					$concurrent = AlieCore_DB::get_by_submission_id( $submission_id );
					if ( $concurrent ) {
						if ( hash_equals( $concurrent->content_hash, $content_hash ) ) {
							$queue_id     = (int) $concurrent->id;
							$is_recovered = true;

							// Espera de sincronización de cortesía si la primera petición está en curso
							global $wpdb;
							$retries = 0;
							while ( empty( $concurrent->wp_post_id ) && $retries < 10 ) {
								usleep( 100000 ); // 100ms
								$concurrent = AlieCore_DB::get_by_submission_id( $submission_id );
								$retries++;
							}

							if ( ! empty( $concurrent->wp_post_id ) ) {
								return rest_ensure_response(
									array(
										'success'       => true,
										'id'            => (int) $concurrent->wp_post_id,
										'queue_id'      => $queue_id,
										'submission_id' => $concurrent->submission_id,
										'status'        => $concurrent->hubspot_status,
										'recovered'     => true,
									)
								);
							}

							// Comprobar si quedó huérfano en postmeta
							$dangling = $wpdb->get_var(
								$wpdb->prepare(
									"SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_alie_submission_id' AND meta_value = %s LIMIT 1",
									$submission_id
								)
							);
							if ( ! empty( $dangling ) ) {
								AlieCore_DB::link_post_id( $queue_id, (int) $dangling );
								return rest_ensure_response(
									array(
										'success'       => true,
										'id'            => (int) $dangling,
										'queue_id'      => $queue_id,
										'submission_id' => $concurrent->submission_id,
										'status'        => $concurrent->hubspot_status,
										'recovered'     => true,
									)
								);
							}

							// Si superó el límite de espera y aún no está el post: solicitud en progreso
							// Jamás crear un post duplicado ni enviar correo duplicado
							return new WP_Error(
								'request_in_progress',
								'La solicitud ya está siendo procesada en el servidor. Intenta de nuevo en unos momentos.',
								array( 'status' => 503 )
							);
						} else {
							return new WP_Error(
								'submission_conflict',
								'El submission_id ya fue utilizado con datos distintos.',
								array( 'status' => 409 )
							);
						}
					} else {
						// Falla real al insertar en tabla: error 500 y cero conversiones
						return new WP_Error(
							'queue_insert_failed',
							'Error al guardar la solicitud en la base de datos.',
							array( 'status' => 500 )
						);
					}
				} else {
					$queue_id = (int) $inserted_id;
				}
			}
		}

		// 2. Crear CPT lead por compatibilidad (solo el creador primario o flujo legacy)
		$title = ! empty( $nombre ) ? $nombre : $whatsapp;

		$post_id = wp_insert_post(
			array(
				'post_type'    => 'lead',
				'post_status'  => 'publish',
				'post_title'   => $title,
				'post_content' => $wp_mensaje,
			)
		);

		if ( is_wp_error( $post_id ) ) {
			return new WP_Error( 'create_failed', 'No se pudo crear el lead', array( 'status' => 500 ) );
		}

		update_post_meta( $post_id, 'nombre', $nombre );
		update_post_meta( $post_id, 'whatsapp', $whatsapp );
		update_post_meta( $post_id, 'servicio', $servicio );
		update_post_meta( $post_id, 'mensaje', $wp_mensaje );
		update_post_meta( $post_id, 'canal', $canal );
		update_post_meta( $post_id, 'pagina', $pagina );
		update_post_meta( $post_id, 'formulario', $formulario );
		if ( ! empty( $email ) ) {
			update_post_meta( $post_id, 'email', $email );
		}
		if ( ! empty( $empresa ) ) {
			update_post_meta( $post_id, 'empresa', $empresa );
		}
		if ( ! empty( $submission_id ) ) {
			update_post_meta( $post_id, '_alie_submission_id', $submission_id );
			if ( $queue_id ) {
				AlieCore_DB::link_post_id( $queue_id, $post_id );
			}
		}

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

		// Notificación por correo: solo si NO es una solicitud recuperada (evita duplicar correos)
		if ( ! $is_recovered ) {
			$to = AlieCore_Settings::get_notification_email();
			if ( $to ) {
				$subject = 'Nuevo lead desde la web: ' . $title;
				$body    = "Nombre: {$nombre}\nWhatsApp/Teléfono: {$whatsapp}\nServicio: {$servicio}\nMensaje: {$wp_mensaje}\nCanal: {$canal}\n";
				$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
				wp_mail( $to, $subject, $body, $headers );
			}
		}

		$response_data = array(
			'success' => true,
			'id'      => $post_id,
		);
		if ( ! empty( $submission_id ) ) {
			$response_data['submission_id'] = $submission_id;
			$response_data['queue_id']      = $queue_id;
			$response_data['status']        = 'PENDING';
		}

		return rest_ensure_response( $response_data );
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
