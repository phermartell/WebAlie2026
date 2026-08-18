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

		// Añadir filtros y buscador extendido al listado de Leads
		add_action( 'restrict_manage_posts', array( 'AlieCore_Meta', 'add_lead_filters' ) );
		add_action( 'pre_get_posts', array( 'AlieCore_Meta', 'filter_lead_query' ) );

		// Manejar exportación a CSV
		add_action( 'admin_init', array( 'AlieCore_Meta', 'handle_csv_export' ) );
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

	/**
	 * Añadir dropdowns de filtro en el listado de Leads (Formularios y Páginas) y botón de Exportar.
	 */
	public static function add_lead_filters() {
		global $wpdb, $typenow;
		if ( 'lead' !== $typenow ) {
			return;
		}

		// 1. Obtener todos los formularios (estáticos + los que existan en BD)
		$formularios_estaticos = array(
			'Formulario de Landing (Estrategia)',
			'Formulario de Cotización (Contacto)',
			'Modal Messenger (FB)',
			'Modal Instagram (IG)',
			'Chat WhatsApp Monterrey',
			'Chat WhatsApp Puebla',
		);
		$formularios_db = $wpdb->get_col(
			"SELECT DISTINCT meta_value FROM {$wpdb->postmeta} WHERE meta_key = 'formulario' AND meta_value != '' ORDER BY meta_value ASC"
		);
		$formularios = array_unique( array_merge( $formularios_estaticos, $formularios_db ) );
		sort( $formularios );

		$current_form = isset( $_GET['filter_formulario'] ) ? sanitize_text_field( $_GET['filter_formulario'] ) : '';
		?>
		<select name="filter_formulario">
			<option value=""><?php esc_html_e( 'Todos los formularios', 'alie-core' ); ?></option>
			<?php foreach ( $formularios as $form ) : ?>
				<option value="<?php echo esc_attr( $form ); ?>" <?php selected( $current_form, $form ); ?>><?php echo esc_html( $form ); ?></option>
			<?php endforeach; ?>
		</select>
		<?php

		// 2. Obtener todas las páginas (estáticas principales + las registradas en BD)
		$paginas_estaticas = array(
			'/' => 'Inicio (Home)',
			'/contacto' => 'Contacto (Formulario completo)',
			'/agencia' => 'Agencia',
			'/nosotros' => 'Nosotros',
			'/casos-de-exito' => 'Casos de éxito',
			'/puebla' => 'Puebla (Home)',
			'/puebla/diseno-de-paginas-web' => 'Puebla > Diseño Web',
			'/puebla/growth-marketing-b2b' => 'Puebla > Growth Marketing',
			'/monterrey' => 'Monterrey (Home)',
			'/monterrey/diseno-de-paginas-web' => 'Monterrey > Diseño Web',
			'/monterrey/growth-marketing-b2b' => 'Monterrey > Growth Marketing',
			// Los 8 servicios principales + IA
			'/diseno-de-paginas-web' => 'Servicio > Diseño Web',
			'/growth-marketing-b2b' => 'Servicio > Growth B2B',
			'/seo' => 'Servicio > SEO',
			'/redes-sociales' => 'Servicio > Redes Sociales',
			'/paid-media' => 'Servicio > Paid Media',
			'/identidad-grafica' => 'Servicio > Identidad Gráfica',
			'/ecommerce' => 'Servicio > E-commerce',
			'/email-marketing' => 'Servicio > Email Marketing',
			'/ia' => 'Servicio > Inteligencia Artificial',
		);

		$paginas_db_raw = $wpdb->get_col(
			"SELECT DISTINCT meta_value FROM {$wpdb->postmeta} WHERE meta_key = 'pagina' AND meta_value != '' ORDER BY meta_value ASC"
		);

		// Normalizar URLs de base de datos a paths relativos para unificar la lista
		$paginas_db = array();
		foreach ( $paginas_db_raw as $url ) {
			$path = wp_parse_url( $url, PHP_URL_PATH );
			if ( $path ) {
				$paginas_db[$path] = $path;
			}
		}

		$current_page = isset( $_GET['filter_pagina'] ) ? sanitize_text_field( $_GET['filter_pagina'] ) : '';
		?>
		<select name="filter_pagina" style="max-width: 250px;">
			<option value=""><?php esc_html_e( 'Todas las páginas', 'alie-core' ); ?></option>
			
			<!-- Páginas Principales -->
			<optgroup label="Rutas principales">
				<?php foreach ( $paginas_estaticas as $path => $label ) : ?>
					<option value="<?php echo esc_attr( $path ); ?>" <?php selected( $current_page, $path ); ?>><?php echo esc_html( $label ); ?></option>
				<?php endforeach; ?>
			</optgroup>

			<!-- Otras páginas capturadas en BD -->
			<?php 
			// Quitar las que ya están en el listado estático
			$paginas_db_restantes = array_diff_key( $paginas_db, $paginas_estaticas );
			if ( ! empty( $paginas_db_restantes ) ) :
			?>
				<optgroup label="Otras rutas registradas">
					<?php foreach ( $paginas_db_restantes as $path ) : ?>
						<option value="<?php echo esc_attr( $path ); ?>" <?php selected( $current_page, $path ); ?>><?php echo esc_html( $path ); ?></option>
					<?php endforeach; ?>
				</optgroup>
			<?php endif; ?>
		</select>
		<?php

		// 3. Filtro por rango de fechas
		$current_date_from = isset( $_GET['filter_date_from'] ) ? sanitize_text_field( $_GET['filter_date_from'] ) : '';
		$current_date_to = isset( $_GET['filter_date_to'] ) ? sanitize_text_field( $_GET['filter_date_to'] ) : '';
		?>
		<span style="margin-left: 5px; vertical-align: middle; background: #fff; padding: 4px 10px; border: 1px solid #8c8f94; border-radius: 4px; display: inline-block;">
			Desde: <input type="date" name="filter_date_from" value="<?php echo esc_attr( $current_date_from ); ?>" style="border: 0; padding: 0; vertical-align: middle; background: transparent; cursor: pointer;" />
			Hasta: <input type="date" name="filter_date_to" value="<?php echo esc_attr( $current_date_to ); ?>" style="border: 0; padding: 0; vertical-align: middle; background: transparent; cursor: pointer; margin-left: 5px;" />
		</span>
		<?php

		// 4. Botón para exportar a CSV respetando filtros activos
		$export_args = array( 'alie_export' => 'lead' );
		if ( ! empty( $_GET['filter_formulario'] ) ) $export_args['filter_formulario'] = $_GET['filter_formulario'];
		if ( ! empty( $_GET['filter_pagina'] ) ) $export_args['filter_pagina'] = $_GET['filter_pagina'];
		if ( ! empty( $_GET['filter_date_from'] ) ) $export_args['filter_date_from'] = $_GET['filter_date_from'];
		if ( ! empty( $_GET['filter_date_to'] ) ) $export_args['filter_date_to'] = $_GET['filter_date_to'];
		if ( ! empty( $_GET['s'] ) ) $export_args['s'] = $_GET['s'];

		$export_url = add_query_arg( $export_args, admin_url( 'edit.php' ) );
		echo '<a href="' . esc_url( $export_url ) . '" class="button button-secondary" style="margin-left: 5px; vertical-align: top;">Exportar selección a CSV</a>';
	}

	/**
	 * Aplicar los filtros de formulario, página, rango de fechas y búsqueda por metadatos al listado de Leads.
	 */
	public static function filter_lead_query( $query ) {
		global $pagenow;
		if ( ! is_admin() || ! $query->is_main_query() || 'edit.php' !== $pagenow || 'lead' !== $query->get( 'post_type' ) ) {
			return;
		}

		$meta_query = array();

		// Filtrar por Formulario (Búsqueda exacta)
		if ( ! empty( $_GET['filter_formulario'] ) ) {
			$meta_query[] = array(
				'key'     => 'formulario',
				'value'   => sanitize_text_field( $_GET['filter_formulario'] ),
				'compare' => '=',
			);
		}

		// Filtrar por Página (Búsqueda por coincidencia parcial LIKE para omitir dominio y UTMs)
		if ( ! empty( $_GET['filter_pagina'] ) ) {
			$meta_query[] = array(
				'key'     => 'pagina',
				'value'   => sanitize_text_field( $_GET['filter_pagina'] ),
				'compare' => 'LIKE',
			);
		}

		if ( ! empty( $meta_query ) ) {
			$query->set( 'meta_query', $meta_query );
		}

		// Filtrar por rango de fechas (post_date)
		$date_query = array();
		if ( ! empty( $_GET['filter_date_from'] ) ) {
			$date_query['after'] = sanitize_text_field( $_GET['filter_date_from'] ) . ' 00:00:00';
			$date_query['inclusive'] = true;
		}
		if ( ! empty( $_GET['filter_date_to'] ) ) {
			$date_query['before'] = sanitize_text_field( $_GET['filter_date_to'] ) . ' 23:59:59';
			$date_query['inclusive'] = true;
		}
		if ( ! empty( $date_query ) ) {
			$query->set( 'date_query', array( $date_query ) );
		}

		// Buscar también en metadatos al usar el buscador nativo
		if ( ! empty( $_GET['s'] ) ) {
			add_filter( 'posts_join', array( __CLASS__, 'search_join' ) );
			add_filter( 'posts_where', array( __CLASS__, 'search_where' ) );
			add_filter( 'posts_distinct', array( __CLASS__, 'search_distinct' ) );
		}
	}

	public static function search_join( $join ) {
		global $wpdb;
		if ( is_admin() && isset( $_GET['s'] ) && isset( $_GET['post_type'] ) && 'lead' === $_GET['post_type'] ) {
			$join .= " LEFT JOIN {$wpdb->postmeta} AS aliemeta ON {$wpdb->posts}.ID = aliemeta.post_id ";
		}
		return $join;
	}

	public static function search_where( $where ) {
		global $wpdb;
		if ( is_admin() && isset( $_GET['s'] ) && isset( $_GET['post_type'] ) && 'lead' === $_GET['post_type'] ) {
			$search_term = esc_sql( sanitize_text_field( $_GET['s'] ) );
			$where = preg_replace(
				"/\(\s*{$wpdb->posts}\.post_title\s+LIKE\s+('[^']+')\s*\)/",
				"({$wpdb->posts}.post_title LIKE '%{$search_term}%' OR (aliemeta.meta_key IN ('nombre', 'whatsapp', 'servicio', 'mensaje') AND aliemeta.meta_value LIKE '%{$search_term}%'))",
				$where
			);
		}
		return $where;
	}

	public static function search_distinct( $distinct ) {
		if ( is_admin() && isset( $_GET['s'] ) && isset( $_GET['post_type'] ) && 'lead' === $_GET['post_type'] ) {
			return 'DISTINCT';
		}
		return $distinct;
	}

	/**
	 * Procesar la exportación de leads a CSV respetando filtros aplicados.
	 */
	public static function handle_csv_export() {
		if ( is_admin() && isset( $_GET['alie_export'] ) && 'lead' === $_GET['alie_export'] ) {
			if ( ! current_user_can( 'export' ) ) {
				wp_die( 'No tienes permisos suficientes para exportar leads.' );
			}

			// Construir query de exportación respetando los filtros actuales
			$args = array(
				'post_type'      => 'lead',
				'post_status'    => 'publish',
				'posts_per_page' => -1,
				'orderby'        => 'date',
				'order'          => 'DESC',
			);

			$meta_query = array();
			if ( ! empty( $_GET['filter_formulario'] ) ) {
				$meta_query[] = array(
					'key'     => 'formulario',
					'value'   => sanitize_text_field( $_GET['filter_formulario'] ),
					'compare' => '=',
				);
			}
			if ( ! empty( $_GET['filter_pagina'] ) ) {
				$meta_query[] = array(
					'key'     => 'pagina',
					'value'   => sanitize_text_field( $_GET['filter_pagina'] ),
					'compare' => 'LIKE',
				);
			}
			if ( ! empty( $meta_query ) ) {
				$args['meta_query'] = $meta_query;
			}

			$date_query = array();
			if ( ! empty( $_GET['filter_date_from'] ) ) {
				$date_query['after'] = sanitize_text_field( $_GET['filter_date_from'] ) . ' 00:00:00';
				$date_query['inclusive'] = true;
			}
			if ( ! empty( $_GET['filter_date_to'] ) ) {
				$date_query['before'] = sanitize_text_field( $_GET['filter_date_to'] ) . ' 23:59:59';
				$date_query['inclusive'] = true;
			}
			if ( ! empty( $date_query ) ) {
				$args['date_query'] = array( $date_query );
			}

			// Buscar si hay término de búsqueda activo
			if ( ! empty( $_GET['s'] ) ) {
				$args['s'] = sanitize_text_field( $_GET['s'] );
				
				// Aplicar los filtros de JOIN para que get_posts también busque en meta
				add_filter( 'posts_join', array( __CLASS__, 'search_join' ) );
				add_filter( 'posts_where', array( __CLASS__, 'search_where' ) );
				add_filter( 'posts_distinct', array( __CLASS__, 'search_distinct' ) );
			}

			// Obtener leads filtrados
			$leads = get_posts( $args );

			// Forzar la descarga del CSV
			header( 'Content-Type: text/csv; charset=utf-8' );
			header( 'Content-Disposition: attachment; filename=leads-alie-digital-filtrado-' . date( 'Y-m-d' ) . '.csv' );

			$output = fopen( 'php://output', 'w' );
			fprintf( $output, chr(0xEF).chr(0xBB).chr(0xBF) ); // BOM UTF-8

			fputcsv( $output, array( 'Nombre', 'WhatsApp / Teléfono', 'Servicio', 'Formulario', 'Página de Origen', 'Canal', 'Mensaje / Datos Adicionales', 'Fecha de Envío' ) );

			foreach ( $leads as $lead ) {
				$nombre     = get_post_meta( $lead->ID, 'nombre', true );
				$whatsapp   = get_post_meta( $lead->ID, 'whatsapp', true );
				$servicio   = get_post_meta( $lead->ID, 'servicio', true );
				$formulario = get_post_meta( $lead->ID, 'formulario', true );
				$pagina     = get_post_meta( $lead->ID, 'pagina', true );
				$canal      = get_post_meta( $lead->ID, 'canal', true );
				$mensaje    = get_post_meta( $lead->ID, 'mensaje', true );
				$fecha      = get_the_date( 'Y-m-d H:i:s', $lead->ID );

				fputcsv(
					$output,
					array(
						$nombre,
						$whatsapp,
						$servicio,
						$formulario,
						$pagina,
						ucfirst( $canal ),
						$mensaje,
						$fecha,
					)
				);
			}

			fclose( $output );
			exit;
		}
	}
}
