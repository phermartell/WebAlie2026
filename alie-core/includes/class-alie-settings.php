<?php
/**
 * Ajustes de Alié Digital: toggle de Google Tag Manager + endpoint REST público.
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
		add_action( 'rest_api_init', array( __CLASS__, 'register_rest' ) );
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
			'alie_gtm_enabled',
			array(
				'type'              => 'boolean',
				'default'           => false,
				'sanitize_callback' => 'rest_sanitize_boolean',
			)
		);
		register_setting(
			'alie_core_settings',
			'alie_gtm_id',
			array(
				'type'              => 'string',
				'default'           => 'GTM-N685Q2H',
				'sanitize_callback' => 'sanitize_text_field',
			)
		);
	}

	public static function render() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$enabled = (bool) get_option( 'alie_gtm_enabled', false );
		$gtm_id  = get_option( 'alie_gtm_id', 'GTM-N685Q2H' );
		?>
		<div class="wrap">
			<h1>Alié Digital — Configuración</h1>
			<p>Controla el Google Tag Manager que se inyecta en la landing. Apágalo mientras estás en desarrollo.</p>
			<form method="post" action="options.php">
				<?php settings_fields( 'alie_core_settings' ); ?>
				<table class="form-table">
					<tr>
						<th scope="row"><label for="alie_gtm_enabled">Habilitar Google Tag Manager</label></th>
						<td>
							<input type="checkbox" id="alie_gtm_enabled" name="alie_gtm_enabled" value="1" <?php checked( 1, $enabled ); ?> />
							<p class="description">Actívalo solo en producción para no contaminar analytics durante el desarrollo.</p>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="alie_gtm_id">GTM ID</label></th>
						<td>
							<input type="text" id="alie_gtm_id" name="alie_gtm_id" value="<?php echo esc_attr( $gtm_id ); ?>" class="regular-text" />
						</td>
					</tr>
				</table>
				<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}

	public static function register_rest() {
		register_rest_route(
			'alie/v1',
			'/settings',
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'get_settings' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	public static function get_settings() {
		return rest_ensure_response(
			array(
				'gtmEnabled' => (bool) get_option( 'alie_gtm_enabled', false ),
				'gtmId'      => get_option( 'alie_gtm_id', 'GTM-N685Q2H' ),
			)
		);
	}
}
