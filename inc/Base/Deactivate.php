<?php
/**
 * @package 
 */
namespace Inc\Base;

class Deactivate
{
	// Things to delete on deactivating the plugin
	public static function deactivate() {
		flush_rewrite_rules();
	}
}