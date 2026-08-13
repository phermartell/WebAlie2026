<?php
/**
 * Ajustes de Alié Digital: correo de notificación de leads.
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

	public static function render() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$email = get_option( 'alie_notification_email', 'pher@aliedigital.com' );
		?>
		<div class="wrap">
			<h1>Alié Digital — Configuración</h1>
			<p>Configura a dónde se envían las notificaciones de nuevos leads captados por la landing.</p>
			<form method="post" action="options.php">
				<?php settings_fields( 'alie_core_settings' ); ?>
				<table class="form-table">
					<tr>
						<th scope="row"><label for="alie_notification_email">Correo de notificación</label></th>
						<td>
							<input type="email" id="alie_notification_email" name="alie_notification_email" value="<?php echo esc_attr( $email ); ?>" class="regular-text" />
							<p class="description">Los nuevos leads se enviarán a esta dirección.</p>
						</td>
					</tr>
				</table>
				<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}

	public static function get_notification_email() {
		return get_option( 'alie_notification_email', 'pher@aliedigital.com' );
	}
}
