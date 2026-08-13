<?php
/**
 * Registra el Custom Post Type "lead".
 *
 * @package AlieCore
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class AlieCore_CPT {

	public static function register() {
		register_post_type(
			'lead',
			array(
				'labels'          => array(
					'name'          => 'Leads',
					'singular_name' => 'Lead',
					'menu_name'     => 'Leads',
					'add_new_item'  => 'Añadir lead',
					'edit_item'     => 'Editar lead',
				),
				'public'          => false,
				'show_ui'         => true,
				'show_in_menu'    => true,
				'show_in_rest'    => true,
				'menu_icon'       => 'dashicons-admin-users',
				'menu_position'   => 26,
				'supports'        => array( 'title' ),
				'capability_type' => 'post',
			)
		);
	}
}
