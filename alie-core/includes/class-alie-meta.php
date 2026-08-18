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
	 * Añadir la caja meta a la pantalla de edición de Posts.
	 */
	public static function add_post_meta_boxes() {
		add_meta_box(
			'alie_post_fields_meta_box',
			'Alié Digital - Fuentes y Herramientas de la Publicación',
			array( 'AlieCore_Meta', 'render_post_meta_box' ),
			'post',
			'normal',
			'high'
		);
	}

	/**
	 * Renderizar la interfaz del metabox.
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
	 * Guardar metadatos desde el panel de edición de WordPress.
	 */
	public static function save_post_meta( $post_id ) {
		// Validar seguridad
		if ( ! isset( $_POST['alie_post_meta_nonce'] ) || ! wp_verify_nonce( $_POST['alie_post_meta_nonce'], 'save_alie_post_meta_nonce' ) ) {
			return;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		// Guardar y procesar Fuentes
		if ( isset( $_POST['alie_fuentes'] ) ) {
			$fuentes_json = self::textarea_format_to_json( $_POST['alie_fuentes'] );
			update_post_meta( $post_id, 'fuentes', $fuentes_json );
		}

		// Guardar y procesar Herramientas
		if ( isset( $_POST['alie_herramientas'] ) ) {
			$herramientas_json = self::textarea_format_to_json( $_POST['alie_herramientas'] );
			update_post_meta( $post_id, 'herramientas', $herramientas_json );
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
