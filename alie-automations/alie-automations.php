<?php
/**
 * Plugin Name:       Alié Automations
 * Plugin URI:        https://aliedigital.com
 * Description:       Bridge de eventos de WordPress hacia automatizaciones externas de Alié Digital (n8n).
 * Version:           1.0.0
 * Author:            Alié Digital
 * Text Domain:       alie-automations
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ALIE_AUTOMATIONS_PATH', plugin_dir_path( __FILE__ ) );

require_once ALIE_AUTOMATIONS_PATH . 'includes/class-alie-automations-webhook.php';

add_action( 'init', array( 'Alie_Automations_Webhook', 'register' ) );
