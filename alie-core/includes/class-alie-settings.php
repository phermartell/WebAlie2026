<?php
/**
 * Ajustes de Alié Digital: correo de notificación de leads e integración con HubSpot.
 *
 * @package AlieCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class AlieCore_Settings {

	public static function register() {
		add_action( 'admin_menu', array( __CLASS__, 'add_menu' ) );
		add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
		add_action( 'admin_init', array( __CLASS__, 'handle_actions' ) );
	}

	public static function add_menu() {
		add_options_page(
			'Alié Digital',
			'Alié Digital',
			'manage_options',
			'alie-core',
			array( __CLASS__, 'render' )
		);
	}

	public static function register_settings() {
		register_setting(
			'alie_core_settings',
			'alie_notification_email',
			array(
				'type'              => 'string',
				'default'           => 'pher@aliedigital.com',
				'sanitize_callback' => 'sanitize_email',
			)
		);
	}

	public static function handle_actions() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		if ( isset( $_POST['alie_hubspot_action'] ) && check_admin_referer( 'alie_hubspot_sync_toggle', 'alie_hubspot_sync_nonce' ) ) {
			$action = sanitize_text_field( $_POST['alie_hubspot_action'] );
			if ( 'resume_sync' === $action ) {
				update_option( 'alie_hubspot_sync_active', '1' );
				wp_safe_redirect( add_query_arg( array( 'page' => 'alie-core', 'alie_msg' => 'sync_resumed' ), admin_url( 'options-general.php' ) ) );
				exit;
			} elseif ( 'pause_sync' === $action ) {
				update_option( 'alie_hubspot_sync_active', '0' );
				wp_safe_redirect( add_query_arg( array( 'page' => 'alie-core', 'alie_msg' => 'sync_paused' ), admin_url( 'options-general.php' ) ) );
				exit;
			}
		}
	}

	public static function render() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$email = get_option( 'alie_notification_email', 'pher@aliedigital.com' );

		// Procesar prueba de conexión si fue solicitada
		$test_result = null;
		if ( isset( $_POST['alie_hubspot_test_connection'] ) && check_admin_referer( 'alie_hubspot_test', 'alie_hubspot_test_nonce' ) ) {
			$test_result = AlieCore_HubSpot::test_connection_read_only();
		}

		// Notificaciones de acciones
		if ( isset( $_GET['alie_msg'] ) ) {
			if ( 'sync_resumed' === $_GET['alie_msg'] ) {
				echo '<div class="notice notice-success is-dismissible"><p><strong>Sincronización reanudada:</strong> La tarea programada procesará la cola automáticamente.</p></div>';
			} elseif ( 'sync_paused' === $_GET['alie_msg'] ) {
				echo '<div class="notice notice-warning is-dismissible"><p><strong>Sincronización pausada:</strong> La entrega automática hacia HubSpot ha sido detenida.</p></div>';
			}
		}

		$token_present = ! empty( AlieCore_HubSpot::get_access_token() );
		$is_paused     = AlieCore_HubSpot::is_sync_paused();
		$forced_paused = defined( 'HUBSPOT_SYNC_PAUSED' ) && HUBSPOT_SYNC_PAUSED;
		?>
		<div class="wrap">
			<h1>Alié Digital — Configuración</h1>
			<p>Ajustes de captación de leads, notificaciones por correo e integración con HubSpot CRM.</p>

			<!-- 1. NOTIFICACIÓN POR CORREO -->
			<div class="card" style="max-width: 800px; margin-top: 20px; padding: 15px 25px;">
				<h2>Notificación de Leads por Correo</h2>
				<p class="description">Configura a dónde se envían los correos con el bloque de diagnóstico y contexto completo de cada lead captado.</p>
				<form method="post" action="options.php">
					<?php settings_fields( 'alie_core_settings' ); ?>
					<table class="form-table" role="presentation">
						<tr>
							<th scope="row"><label for="alie_notification_email">Correo de notificación</label></th>
							<td>
								<input type="email" id="alie_notification_email" name="alie_notification_email" value="<?php echo esc_attr( $email ); ?>" class="regular-text" />
								<p class="description">Los nuevos leads se enviarán a esta dirección con todos sus metadatos y contexto.</p>
							</td>
						</tr>
					</table>
					<?php submit_button( 'Guardar Correo' ); ?>
				</form>
			</div>

			<!-- 2. INTEGRACIÓN HUBSPOT CRM -->
			<div class="card" style="max-width: 800px; margin-top: 25px; padding: 15px 25px;">
				<h2>Integración con HubSpot CRM</h2>
				<p class="description">Control de entrega de solicitudes hacia HubSpot CRM. La clave se administra de forma segura en <code>wp-config.php</code>.</p>

				<table class="form-table" role="presentation">
					<tr>
						<th scope="row">Credencial (Private App Token)</th>
						<td>
							<?php if ( $token_present ) : ?>
								<span class="dashicons dashicons-yes-alt" style="color: #46b450; font-size: 20px; vertical-align: middle;"></span>
								<strong style="color: #46b450;">Configurada en wp-config.php</strong>
								<span style="display: inline-block; margin-left: 10px; background: #f0f0f1; padding: 3px 8px; border-radius: 4px; font-family: monospace; color: #666;">••••••••••••••••</span>
								<p class="description">Por seguridad y directivas de acceso, la clave permanece exclusivamente en el servidor y nunca se expone en pantalla.</p>
							<?php else : ?>
								<span class="dashicons dashicons-warning" style="color: #ffb900; font-size: 20px; vertical-align: middle;"></span>
								<strong style="color: #d63638;">No configurada</strong>
								<p class="description">Añade <code>define( 'HUBSPOT_ACCESS_TOKEN', 'pat-...' );</code> en el <code>wp-config.php</code> del servidor para activar la comunicación.</p>
							<?php endif; ?>
						</td>
					</tr>
					<tr>
						<th scope="row">Sincronización Automática</th>
						<td>
							<?php if ( $is_paused ) : ?>
								<span style="display: inline-block; background: #fff8e5; border: 1px solid #ffb900; color: #b26b00; padding: 4px 10px; border-radius: 4px; font-weight: 600;">
									<span class="dashicons dashicons-controls-pause" style="font-size: 16px; vertical-align: text-bottom;"></span> PAUSADA
								</span>
								<p class="description">La tarea programada (cron) NO está realizando envíos automáticos a HubSpot.</p>
								<?php if ( $forced_paused ) : ?>
									<p class="description" style="color: #b26b00;"><em>Pausa forzada activa mediante constante HUBSPOT_SYNC_PAUSED en wp-config.php.</em></p>
								<?php endif; ?>
							<?php else : ?>
								<span style="display: inline-block; background: #edfaef; border: 1px solid #46b450; color: #1e6b24; padding: 4px 10px; border-radius: 4px; font-weight: 600;">
									<span class="dashicons dashicons-controls-play" style="font-size: 16px; vertical-align: text-bottom;"></span> ACTIVA (Cada 5 minutos)
								</span>
								<p class="description">La tarea programada procesa automáticamente los leads pendientes de la cola.</p>
							<?php endif; ?>

							<form method="post" style="margin-top: 10px;">
								<?php wp_nonce_field( 'alie_hubspot_sync_toggle', 'alie_hubspot_sync_nonce' ); ?>
								<?php if ( $is_paused ) : ?>
									<button type="submit" name="alie_hubspot_action" value="resume_sync" class="button button-primary" <?php disabled( ! $token_present || $forced_paused ); ?>>
										Reanudar sincronización
									</button>
								<?php else : ?>
									<button type="submit" name="alie_hubspot_action" value="pause_sync" class="button button-secondary">
										Pausar sincronización
									</button>
								<?php endif; ?>
							</form>
						</td>
					</tr>
					<tr>
						<th scope="row">Prueba de Conexión</th>
						<td>
							<form method="post">
								<?php wp_nonce_field( 'alie_hubspot_test', 'alie_hubspot_test_nonce' ); ?>
								<button type="submit" name="alie_hubspot_test_connection" value="1" class="button button-secondary" <?php disabled( ! $token_present ); ?>>
									<span class="dashicons dashicons-cloud" style="font-size: 16px; vertical-align: text-bottom;"></span> Probar conexión (Solo lectura)
								</button>
								<p class="description">Consulta únicamente metadatos de propiedades y pipelines sin crear registros ni alterar la cola.</p>
							</form>
						</td>
					</tr>
				</table>

				<!-- RESULTADOS DE LA PRUEBA DE CONEXIÓN -->
				<?php if ( null !== $test_result ) : ?>
					<div style="margin-top: 20px; padding: 15px; border-left: 4px solid <?php echo $test_result['success'] ? '#46b450' : '#dc3232'; ?>; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
						<h3>Diagnóstico de Conexión con HubSpot (Solo Lectura)</h3>
						<?php if ( ! empty( $test_result['message'] ) ) : ?>
							<p style="color: #dc3232;"><strong><?php echo esc_html( $test_result['message'] ); ?></strong></p>
						<?php else : ?>
							<table class="widefat striped" style="margin-top: 10px;">
								<thead>
									<tr>
										<th>Elemento / Objeto</th>
										<th>Propiedad o ID</th>
										<th>Estado</th>
										<th>Detalle</th>
									</tr>
								</thead>
								<tbody>
									<!-- Contacto -->
									<tr>
										<td><strong>Contacto</strong></td>
										<td><code>whatsapp_e164</code></td>
										<td>
											<?php if ( $test_result['contact_property']['exists'] && $test_result['contact_property']['unique'] ) : ?>
												<span style="color: #46b450; font-weight: bold;">✓ Válida y Única</span>
											<?php elseif ( $test_result['contact_property']['exists'] ) : ?>
												<span style="color: #ffb900; font-weight: bold;">⚠ Existe pero NO es única</span>
											<?php else : ?>
												<span style="color: #dc3232; font-weight: bold;">✗ No existe</span>
											<?php endif; ?>
										</td>
										<td>
											<?php
											if ( ! empty( $test_result['contact_property']['error'] ) ) {
												echo esc_html( $test_result['contact_property']['error'] );
											} else {
												echo 'Tipo: ' . esc_html( $test_result['contact_property']['type'] ) . ' (' . esc_html( $test_result['contact_property']['label'] ) . ')';
											}
											?>
										</td>
									</tr>
									<!-- Ticket -->
									<tr>
										<td><strong>Ticket</strong></td>
										<td><code>submission_id</code></td>
										<td>
											<?php if ( $test_result['ticket_property']['exists'] && $test_result['ticket_property']['unique'] ) : ?>
												<span style="color: #46b450; font-weight: bold;">✓ Válida y Única</span>
											<?php elseif ( $test_result['ticket_property']['exists'] ) : ?>
												<span style="color: #ffb900; font-weight: bold;">⚠ Existe pero NO es única</span>
											<?php else : ?>
												<span style="color: #dc3232; font-weight: bold;">✗ No existe</span>
											<?php endif; ?>
										</td>
										<td>
											<?php
											if ( ! empty( $test_result['ticket_property']['error'] ) ) {
												echo esc_html( $test_result['ticket_property']['error'] );
											} else {
												echo 'Tipo: ' . esc_html( $test_result['ticket_property']['type'] ) . ' (' . esc_html( $test_result['ticket_property']['label'] ) . ')';
											}
											?>
										</td>
									</tr>
									<!-- Pipeline -->
									<tr>
										<td><strong>Pipeline de Tickets</strong></td>
										<td>ID: <code><?php echo esc_html( $test_result['pipeline']['pipeline_id'] ); ?></code></td>
										<td>
											<?php if ( $test_result['pipeline']['found'] ) : ?>
												<span style="color: #46b450; font-weight: bold;">✓ Detectado</span>
											<?php else : ?>
												<span style="color: #dc3232; font-weight: bold;">✗ No encontrado</span>
											<?php endif; ?>
										</td>
										<td>
											<?php
											if ( ! empty( $test_result['pipeline']['error'] ) ) {
												echo esc_html( $test_result['pipeline']['error'] );
											} else {
												echo 'Pipeline: <em>' . esc_html( $test_result['pipeline']['label'] ) . '</em> | Etapa inicial: <code>' . esc_html( $test_result['pipeline']['stage_id'] ) . '</code> (' . esc_html( $test_result['pipeline']['stage_label'] ) . ')';
											}
											?>
										</td>
									</tr>
								</tbody>
							</table>

							<?php if ( ! $test_result['success'] ) : ?>
								<div style="margin-top: 15px; padding: 10px; background: #fff8e5; border-left: 4px solid #ffb900;">
									<h4 style="margin: 0 0 5px 0;">Acciones necesarias en el portal de HubSpot:</h4>
									<ol style="margin: 0 0 0 20px; padding: 0;">
										<?php if ( ! $test_result['contact_property']['exists'] || ! $test_result['contact_property']['unique'] ) : ?>
											<li>En <strong>Ajustes → Propiedades → Contactos</strong>: crear la propiedad <code>whatsapp_e164</code> (tipo texto de una sola línea) y marcar la casilla <strong>"Requerir valores únicos para esta propiedad"</strong>.</li>
										<?php endif; ?>
										<?php if ( ! $test_result['ticket_property']['exists'] || ! $test_result['ticket_property']['unique'] ) : ?>
											<li>En <strong>Ajustes → Propiedades → Tickets</strong>: crear la propiedad <code>submission_id</code> (tipo texto de una sola línea) y marcar la casilla <strong>"Requerir valores únicos para esta propiedad"</strong>.</li>
										<?php endif; ?>
									</ol>
								</div>
							<?php endif; ?>
						<?php endif; ?>
					</div>
				<?php endif; ?>
			</div>
		</div>
		<?php
	}

	public static function get_notification_email() {
		return get_option( 'alie_notification_email', 'pher@aliedigital.com' );
	}
}
