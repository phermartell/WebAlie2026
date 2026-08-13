<?php
/**
 * Plugin Name:       AlieCore
 * Plugin URI:        https://aliedigital.com
 * Description:       Registra el CPT "lead" y el endpoint REST para captar leads desde la landing de Alié Digital.
 * Version:           1.0.0
 * Author:            Alié Digital
 * Text Domain:       alie-core
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ALIE_CORE_VERSION', '1.0.0' );
define( 'ALIE_CORE_PATH', plugin_dir_path( __FILE__ ) );

require_once ALIE_CORE_PATH . 'includes/class-alie-cpt.php';
require_once ALIE_CORE_PATH . 'includes/class-alie-meta.php';
require_once ALIE_CORE_PATH . 'includes/class-alie-rest.php';
require_once ALIE_CORE_PATH . 'includes/class-alie-settings.php';

add_action( 'init', array( 'AlieCore_CPT', 'register' ) );
add_action( 'init', array( 'AlieCore_Meta', 'register' ) );
add_action( 'rest_api_init', array( 'AlieCore_REST', 'register' ) );
add_action( 'init', array( 'AlieCore_Settings', 'register' ) );
