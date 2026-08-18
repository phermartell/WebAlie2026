<?php
/**
 * Registra los campos meta del CPT "lead".
 *
 * @package AlieCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class AlieCore_Meta {

	public static function register() {
		$fields = array(
			'nombre'   => 'sanitize_text_field',
			'whatsapp' => 'sanitize_text_field',
			'servicio' => 'sanitize_text_field',
			'mensaje'  => 'sanitize_textarea_field',
			'canal'    => 'sanitize_text_field',
		);

		foreach ( $fields as $field => $sanitize_callback ) {
			register_post_meta(
				'lead',
				$field,
				array(
					'show_in_rest'      => true,
					'single'            => true,
					'type'              => 'string',
					'sanitize_callback' => $sanitize_callback,
					'auth_callback'     => function () {
						return true;
					},
				)
			);
		}

		// Registrar campos meta para posts (fuentes y herramientas)
		$post_fields = array(
			'fuentes'      => 'sanitize_text_field',
			'herramientas' => 'sanitize_text_field',
		);

		foreach ( $post_fields as $field => $sanitize_callback ) {
			register_post_meta(
				'post',
				$field,
				array(
					'show_in_rest'      => true,
					'single'            => true,
					'type'              => 'string',
					'sanitize_callback' => $sanitize_callback,
					'auth_callback'     => function () {
						return current_user_can( 'edit_posts' );
					},
				)
			);
		}

		// Registrar hooks para metaboxes en el panel de administración
		add_action( 'add_meta_boxes', array( 'AlieCore_Meta', 'add_post_meta_boxes' ) );
		add_action( 'save_post', array( 'AlieCore_Meta', 'save_post_meta' ) );
	}

	/**
	 * Añadir la caja meta a la pantalla de edición de Posts y Leads.
	 */
	public static function add_post_meta_boxes() {
		// Caja para Entradas (Posts)
		add_meta_box(
			'alie_post_fields_meta_box',
			'Alié Digital - Fuentes y Herramientas de la Publicación',
			array( 'AlieCore_Meta', 'render_post_meta_box' ),
			'post',
			'normal',
			'high'
		);

		// Caja para Leads
		add_meta_box(
			'alie_lead_fields_meta_box',
			'Detalles del Lead',
			array( 'AlieCore_Meta', 'render_lead_meta_box' ),
			'lead',
			'normal',
			'high'
		);
	}

	/**
	 * Renderizar la interfaz del metabox para posts.
	 */
	public static function render_post_meta_box( $post ) {
		// Nonce para verificación de seguridad
		wp_nonce_field( 'save_alie_post_meta_nonce', 'alie_post_meta_nonce' );

		// Obtener valores actuales
		$fuentes_raw = get_post_meta( $post->ID, 'fuentes', true );
		$herramientas_raw = get_post_meta( $post->ID, 'herramientas', true );

		// Formatear JSON a texto amigable "Nombre | URL" por línea
		$fuentes_text = self::json_to_textarea_format( $fuentes_raw );
		$herramientas_text = self::json_to_textarea_format( $herramientas_raw );

		?>
		<div style="margin-top: 15px;">
			<p><strong>Fuentes y Referencias:</strong></p>
			<p class="description">Ingresa una fuente por línea en formato: <code>Nombre de la fuente | URL</code> (Ej: <code>Google | https://google.com</code>)</p>
			<textarea name="alie_fuentes" rows="5" style="width: 100%; font-family: monospace; padding: 10px; margin-top: 5px;"><?php echo esc_textarea( $fuentes_text ); ?></textarea>
		</div>

		<div style="margin-top: 20px; margin-bottom: 15px;">
			<p><strong>Herramientas Utilizadas:</strong></p>
			<p class="description">Ingresa una herramienta por línea en formato: <code>Nombre de la herramienta | URL</code> (Ej: <code>HubSpot | https://hubspot.com</code>)</p>
			<textarea name="alie_herramientas" rows="5" style="width: 100%; font-family: monospace; padding: 10px; margin-top: 5px;"><?php echo esc_textarea( $herramientas_text ); ?></textarea>
		</div>
		<?php
	}

	/**
	 * Renderizar la interfaz del metabox para leads.
	 */
	public static function render_lead_meta_box( $post ) {
		wp_nonce_field( 'save_alie_lead_meta_nonce', 'alie_lead_meta_nonce' );

		$nombre   = get_post_meta( $post->ID, 'nombre', true );
		$whatsapp = get_post_meta( $post->ID, 'whatsapp', true );
		$servicio = get_post_meta( $post->ID, 'servicio', true );
		$mensaje  = get_post_meta( $post->ID, 'mensaje', true );
		$canal    = get_post_meta( $post->ID, 'canal', true );
		?>
		<table class="form-table">
			<tr>
				<th><label for="alie_lead_nombre">Nombre</label></th>
				<td><input type="text" id="alie_lead_nombre" name="alie_lead_nombre" value="<?php echo esc_attr( $nombre ); ?>" class="regular-text" /></td>
			</tr>
			<tr>
				<th><label for="alie_lead_whatsapp">WhatsApp / Teléfono</label></th>
				<td><input type="text" id="alie_lead_whatsapp" name="alie_lead_whatsapp" value="<?php echo esc_attr( $whatsapp ); ?>" class="regular-text" /></td>
			</tr>
			<tr>
				<th><label for="alie_lead_servicio">Servicios de Interés</label></th>
				<td><input type="text" id="alie_lead_servicio" name="alie_lead_servicio" value="<?php echo esc_attr( $servicio ); ?>" class="regular-text" /></td>
			</tr>
			<tr>
				<th><label for="alie_lead_canal">Canal de Origen</label></th>
				<td>
					<select id="alie_lead_canal" name="alie_lead_canal">
						<option value="web" <?php selected( $canal, 'web' ); ?>>Web (Directo)</option>
						<option value="facebook" <?php selected( $canal, 'facebook' ); ?>>Facebook</option>
						<option value="instagram" <?php selected( $canal, 'instagram' ); ?>>Instagram</option>
						<option value="whatsapp" <?php selected( $canal, 'whatsapp' ); ?>>WhatsApp</option>
					</select>
				</td>
			</tr>
			<tr>
				<th><label for="alie_lead_mensaje">Mensaje / Datos Adicionales</label></th>
				<td><textarea id="alie_lead_mensaje" name="alie_lead_mensaje" rows="5" class="large-text"><?php echo esc_textarea( $mensaje ); ?></textarea></td>
			</tr>
		</table>
		<?php
	}

	/**
	 * Guardar metadatos desde el panel de edición de WordPress.
	 */
	public static function save_post_meta( $post_id ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		// Guardar metadatos de Post (Fuentes y Herramientas)
		if ( isset( $_POST['alie_post_meta_nonce'] ) && wp_verify_nonce( $_POST['alie_post_meta_nonce'], 'save_alie_post_meta_nonce' ) ) {
			if ( isset( $_POST['alie_fuentes'] ) ) {
				$fuentes_json = self::textarea_format_to_json( $_POST['alie_fuentes'] );
				update_post_meta( $post_id, 'fuentes', $fuentes_json );
			}
			if ( isset( $_POST['alie_herramientas'] ) ) {
				$herramientas_json = self::textarea_format_to_json( $_POST['alie_herramientas'] );
				update_post_meta( $post_id, 'herramientas', $herramientas_json );
			}
		}

		// Guardar metadatos de Lead (Nombre, WhatsApp, Servicio, Canal, Mensaje)
		if ( isset( $_POST['alie_lead_meta_nonce'] ) && wp_verify_nonce( $_POST['alie_lead_meta_nonce'], 'save_alie_lead_meta_nonce' ) ) {
			$fields = array( 'nombre', 'whatsapp', 'servicio', 'canal', 'mensaje' );
			foreach ( $fields as $field ) {
				if ( isset( $_POST['alie_lead_' . $field] ) ) {
					$value = $_POST['alie_lead_' . $field];
					if ( $field === 'mensaje' ) {
						update_post_meta( $post_id, $field, sanitize_textarea_field( $value ) );
					} else {
						update_post_meta( $post_id, $field, sanitize_text_field( $value ) );
					}
				}
			}
		}
	}

	/**
	 * Helper: Convierte metadatos JSON a formato de texto plano para el editor textarea.
	 */
	private static function json_to_textarea_format( $raw_value ) {
		if ( empty( $raw_value ) ) {
			return '';
		}

		// Intentar decodificar como JSON
		$decoded = json_decode( $raw_value, true );
		if ( is_array( $decoded ) ) {
			$lines = array();
			foreach ( $decoded as $item ) {
				if ( isset( $item['name'] ) && isset( $item['url'] ) ) {
					$lines[] = $item['name'] . ' | ' . $item['url'];
				}
			}
			return implode( "\n", $lines );
		}

		// Si no era JSON, retornar como estaba
		return $raw_value;
	}

	/**
	 * Helper: Convierte texto plano de textarea a un string JSON.
	 */
	private static function textarea_format_to_json( $textarea_value ) {
		$textarea_value = trim( $textarea_value );
		if ( empty( $textarea_value ) ) {
			return '';
		}

		$lines = explode( "\n", $textarea_value );
		$items = array();

		foreach ( $lines as $line ) {
			$line = trim( $line );
			if ( empty( $line ) ) {
				continue;
			}

			$parts = explode( '|', $line, 2 );
			$name = trim( $parts[0] );
			$url = isset( $parts[1] ) ? trim( $parts[1] ) : '';

			if ( ! empty( $name ) && ! empty( $url ) ) {
				$items[] = array(
					'name' => $name,
					'url'  => $url,
				);
			}
		}

		return json_encode( $items, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
	}
}
