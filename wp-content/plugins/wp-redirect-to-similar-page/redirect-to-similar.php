<?php
/**
 * Plugin Name: WP Redirect to similar page.
 * Plugin URI: www.librafire.com
 * Description: Redirects a user to a page the is most similar to the url given page.
 * Version: 1.0.0
 * Author: librafire.com
 * Author URI: www.librafire.com
 * Text Domain: librafire_redirect
 * License: GPL2
 */

// Modified by Mispy to redirect to search

function curPageURL() {
    $pageURL = 'http';
    if ($_SERVER["HTTPS"] == "on") {
		$pageURL .= "s";
	}
	$pageURL .= "://";
    if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . $_SERVER["REQUEST_URI"];
  	} 
    else {
		$pageURL .= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
	}
	return $pageURL;
}
function find_a_similar_page() {
	if (is_404()) {
		$uri = $_SERVER["REQUEST_URI"];
		if (!preg_match("/\.\w+($|[?])/", $uri)) {
			$lastUriSegment = array_pop(explode("/", trim($uri, "/")));
			wp_redirect("/grapher/" . $lastUriSegment);
		}
	}

}
add_action( 'template_redirect', 'find_a_similar_page' );
?>