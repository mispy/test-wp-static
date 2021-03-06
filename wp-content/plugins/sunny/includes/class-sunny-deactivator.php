<?php

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @package    Sunny
 * @subpackage Sunny/includes
 * @author     Tang Rufus <rufus@wphuman.com>
 * @since      1.4.0
 */
class Sunny_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.4.0
	 */
	public static function deactivate() {

		wp_clear_scheduled_hook( 'sunny_cron_send_notification' );
		wp_clear_scheduled_hook( 'sunny_cron_check_ithemes_security_lockouts' );

		if ( false !== get_option( 'sunny_enqueued_notices' ) ) {
			delete_option( 'sunny_enqueued_notices' );
		}

	}

}
