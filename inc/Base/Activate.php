<?php
/**
 * @package  
 */
namespace Inc\Base;

class Activate
{
	//code on activation of plugin
	public static function activate() {
		flush_rewrite_rules();

	}
}