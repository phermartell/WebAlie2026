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
			'nombre'     => 'sanitize_text_field',
			'whatsapp'   => 'sanitize_text_field',
			'servicio'   => 'sanitize_text_field',
			'mensaje'    => 'sanitize_textarea_field',
			'canal'      => 'sanitize_text_field',
			'pagina'     => 'sanitize_text_field',
			'formulario' => 'sanitize_text_field',
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

		// Registrar columnas personalizadas en el listado de Leads
		add_filter( 'manage_lead_posts_columns', array( 'AlieCore_Meta', 'add_lead_columns' ) );
		add_action( 'manage_lead_posts_custom_column', array( 'AlieCore_Meta', 'render_lead_columns' ), 10, 2 );
	}

	/**
	 * Definir qué columnas se muestran en el listado de Leads (estilo Elementor).
	 */
	public static function add_lead_columns( $columns ) {
		$new_columns = array(
			'cb'              => $columns['cb'],
			'title'           => 'Nombre / Identificador',
			'lead_whatsapp'   => 'WhatsApp / Teléfono',
			'lead_servicio'   => 'Servicio de Interés',
			'lead_formulario' => 'Formulario',
			'lead_pagina'     => 'Página de Origen',
			'lead_canal'      => 'Canal',
			'date'            => $columns['date'],
		);
		return $new_columns;
	}

	/**
	 * Renderizar el contenido de cada celda de las columnas personalizadas.
	 */
	public static function render_lead_columns( $column, $post_id ) {
		switch ( $column ) {
			case 'lead_whatsapp':
				echo esc_html( get_post_meta( $post_id, 'whatsapp', true ) );
				break;
			case 'lead_servicio':
				echo esc_html( get_post_meta( $post_id, 'servicio', true ) );
				break;
			case 'lead_formulario':
				echo esc_html( get_post_meta( $post_id, 'formulario', true ) );
				break;
			case 'lead_pagina':
				$pagina = get_post_meta( $post_id, 'pagina', true );
				if ( ! empty( $pagina ) ) {
					$short_url = wp_parse_url( $pagina, PHP_URL_PATH );
					$query     = wp_parse_url( $pagina, PHP_URL_QUERY );
					if ( $query ) {
						$short_url .= '?' . substr( $query, 0, 25 ) . '...';
					}
					echo '<a href="' . esc_url( $pagina ) . '" target="_blank" title="' . esc_attr( $pagina ) . '">' . esc_html( $short_url ) . ' ↗</a>';
				} else {
					echo '<span class="description">—</span>';
				}
				break;
			case 'lead_canal':
				$canal = get_post_meta( $post_id, 'canal', true );
				$badge_style = 'display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase;';
				if ( $canal === 'facebook' ) {
					echo '<span style="' . $badge_style . ' background: #e7f3ff; color: #1877f2;">Facebook</span>';
				} elseif ( $canal === 'instagram' ) {
					echo '<span style="' . $badge_style . ' background: #fdf0f5; color: #e1306c;">Instagram</span>';
				} elseif ( $canal === 'whatsapp' ) {
					echo '<span style="' . $badge_style . ' background: #e8f9ee; color: #25d366;">WhatsApp</span>';
				} else {
					echo '<span style="' . $badge_style . ' background: #f0f0f1; color: #50575e;">Web</span>';
				}
				break;
		}
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

		$nombre     = get_post_meta( $post->ID, 'nombre', true );
		$whatsapp   = get_post_meta( $post->ID, 'whatsapp', true );
		$servicio   = get_post_meta( $post->ID, 'servicio', true );
		$mensaje    = get_post_meta( $post->ID, 'mensaje', true );
		$canal      = get_post_meta( $post->ID, 'canal', true );
		$pagina     = get_post_meta( $post->ID, 'pagina', true );
		$formulario = get_post_meta( $post->ID, 'formulario', true );
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
				<th><label for="alie_lead_formulario">Formulario de Origen</label></th>
				<td><input type="text" id="alie_lead_formulario" name="alie_lead_formulario" value="<?php echo esc_attr( $formulario ); ?>" class="regular-text" /></td>
			</tr>
			<tr>
				<th><label for="alie_lead_pagina">Página de Origen (URL)</label></th>
				<td><input type="text" id="alie_lead_pagina" name="alie_lead_pagina" value="<?php echo esc_attr( $pagina ); ?>" class="large-text" style="width: 100%;" /></td>
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

		// Guardar metadatos de Lead (Nombre, WhatsApp, Servicio, Canal, Mensaje, Página, Formulario)
		if ( isset( $_POST['alie_lead_meta_nonce'] ) && wp_verify_nonce( $_POST['alie_lead_meta_nonce'], 'save_alie_lead_meta_nonce' ) ) {
			$fields = array( 'nombre', 'whatsapp', 'servicio', 'canal', 'mensaje', 'pagina', 'formulario' );
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
