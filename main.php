<?php

/**
 * @package  
 */
/*
Plugin Name: 
Plugin URI:
Description: 
Version: 0.0.1
Author: 
Author URI: 
License: GPLv2 or later
Text Domain: 
*/

//please do composer -i before you start coding and check if there is vendor folder
// If this file is called firectly, abort!!!
defined( 'ABSPATH' ) or die( 'Hey, what are you doing here? You silly human!' );

// Require once the Composer Autoload
if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {
	require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}
require_once dirname( __FILE__ ) .'/plugin-update-checker/plugin-update-checker.php';

use Symfony\Component\Dotenv\Dotenv;
$dotenv = new Dotenv();
$dotenv->load(__DIR__.'/.env');


$giturl = isset($_ENV['GIT_URL'])?$_ENV['GIT_URL']:'';
$repo_name = isset($_ENV['REPO_NAME'])?$_ENV['REPO_NAME']:'';
$TOKEN = isset($_ENV['TOKEN'])?$_ENV['TOKEN']:'';

$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
	$giturl,
	__FILE__, //Full path to the main plugin file or functions.php.
	$repo_name
);



//Set the branch that contains the stable release.dfds
$myUpdateChecker->setBranch('main');

//Optional: If you're using a private repository, specify the access token like this:
$myUpdateChecker->setAuthentication($TOKEN);

//comment added to check the updater

/**
 * The code that runs during plugin activation
 */
function activate_paper_plugin() {
	Inc\Base\Activate::activate();
}
register_activation_hook( __FILE__, 'activate_paper_plugin' );

/**
 * The code that runs during plugin deactivation
 */
function deactivate_paper_plugin() {
	Inc\Base\Deactivate::deactivate();
}
register_deactivation_hook( __FILE__, 'deactivate_paper_plugin' );

/**
 * Initialize all the core classes of the plugin
 */
if ( class_exists( 'Inc\\Init' ) ) {
	Inc\Init::registerServices();
}