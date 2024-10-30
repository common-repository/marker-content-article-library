<?php

/**
 * Plugin Name:       Marker Content Article Library
 * Plugin URI:        https://www.markercontent.com/
 * Description:      Marker Content is a library of ready-to-use blog, newsletter and opinion written articles for you to download and integrate straight onto your sites posts or media library.
 * Version:           1.0.2
 * Requires at least: 5.2
 * Requires PHP:      7.4
 * Author:            markercontent.com
 * Author URI:        https://www.markercontent.com/about-us
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       markercontent
 * Domain Path:       /languages
 *
 * @since             1.0.0
 * @package           MarkerContent
 *
 */


// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('MARKERCONTENT_VERSION', '1.0.1');
// instantiate the loader


/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-markercontent-activator.php
 */
function activate_markercontent()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-markercontent-activator.php';
    Markercontent_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-markercontent-deactivator.php
 */
function deactivate_markercontent()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-markercontent-deactivator.php';
    Markercontent_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_markercontent');
register_deactivation_hook(__FILE__, 'deactivate_markercontent');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-markerContent.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_markercontent()
{
    require_once plugin_dir_path(__FILE__) . 'includes/Psr4AutoloaderClass.php';
    $loader =  new Psr4AutoloaderClass;
// register the autoloader
    $loader->register();

// register the base directories for the namespace prefix
    $loader->addNamespace('MarkerContent\includes',plugin_dir_path(__FILE__).'includes');

    $loader->addNamespace('MarkerContent\admin',plugin_dir_path(__FILE__).'admin');
    $loader->addNamespace('MarkerContent\admin\app', plugin_dir_path(__FILE__).'admin/app');
    $loader->addNamespace('MarkerContent\admin\app\article',plugin_dir_path(__FILE__).'admin/app/article');
    $loader->addNamespace('MarkerContent\admin\app\controllers',plugin_dir_path(__FILE__).'admin/app/controllers');
    $plugin = new MarkerContent();
    $plugin->run();

}

run_markercontent();
