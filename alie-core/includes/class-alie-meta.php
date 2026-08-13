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
	}
}
