<?php
/*
Plugin Name: ChartBoot for Wordpress
Plugin URI: http://wordpress.org/extend/plugins/chartboot-for-wordpress
Author URI: http://www.chartboot.com
Description: ChartBoot for WordPress Plugin allows to create, edit and embed Google Charts in WordPress Posts and/or Pages.
Version: 3.0
Author: Luca Paggetti
License: GPLv2
*/

add_action('admin_enqueue_scripts', 'LPCFW_EquequeScripts');
add_action('media_buttons_context', 'LPCFW_AddMediaButton');
add_shortcode( 'chartboot', 'LPCFW_GenerateShortcode' );


function LPCFW_EquequeScripts() {

	wp_register_script( 'custom-script', plugins_url( '/js/custom.js', __FILE__ ) );
	wp_enqueue_script( 'custom-script', array('jquery-ui'));
        wp_enqueue_script( 'jquery-ui-dialog' );
	wp_enqueue_style (  'wp-jquery-ui-dialog');

}

function LPCFW_AddMediaButton($context) {

	$img = plugins_url( 'chartboot.png' , __FILE__ );
	$imgtitle = 'Add Google Chart with ChartBoot';
	$pageurl = plugins_url( 'cbwp.php' , __FILE__ );
	
	
	$context .= "<a href='{$pageurl}' id='poppe' title='Chart Boot for Wordpress'><img src='{$img}' title='{$imgtitle}' /></a>";
	
	return $context;	
	
}


function LPCFW_GenerateShortcode($attr) {
	
	$rt = "";
	
	$rt .= "<script type='text/javascript' src='https://www.google.com/jsapi'></script>"."\n";
	$rt .= "<script type='text/javascript'>"."\n";
	$rt .= "// <![CDATA["."\n";
	$rt .= "google.load('visualization', '1.0', {'packages':['corechart']});"."\n";
	$rt .= "google.setOnLoadCallback(drawChart);"."\n";
	$rt .= "function drawChart() {"."\n";
	$rt .= "var wrapper = new google.visualization.ChartWrapper("."\n";
	$jsondesc = str_replace("^","[",$attr['jsondesc']);
	$jsondesc = str_replace("|","]",$jsondesc);
	$jsondesc = str_replace("<00>","[",$jsondesc);
	$jsondesc = str_replace("<01>","]",$jsondesc);
	$jsondesc = str_replace("<02>","'",$jsondesc);
	$jsondesc = str_replace("<03>","&",$jsondesc);
	$jsondesc = str_replace("xxx00xxx","[",$jsondesc);
	$jsondesc = str_replace("xxx01xxx","]",$jsondesc);
	$jsondesc = str_replace("xxx02xxx","'",$jsondesc);
	$jsondesc = str_replace("xxx03xxx","&",$jsondesc);
	$jsondesc = str_replace('\"','"',$jsondesc);
	$rt .= $jsondesc."\n";
	$rt .= ");"."\n";
	$rt .= "wrapper.draw();"."\n";
	$rt .= "};"."\n";
	$rt .= "// ]]>"."\n";
	$rt .= "</script>"."\n";
	$rt .= "<div style='border: ".$attr['border']."px darkgray solid; width: ".$attr['width']."px;'>"."\n";
	$rt .= "<div id='visualization".$attr['code']."' style='width: ".$attr['width']."px; height: ".$attr['height']."px;'></div>"."\n";
	if ($attr['attribution'] == '1') {
		$rt .= "<p style='text-align: right; margin: 3px;'><span style='font-size: 11px; font-family: arial,helvetica,sans-serif;'>made with <a href='http://www.chartboot.com' target='_blank'>ChartBoot</a></span></p>"."\n";
	};
	$rt .= "</div>"."\n";
	
	return $rt;
}



?>