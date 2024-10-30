<?php

/**
 * Fired during plugin activation
 *
 * @link       https:///
 * @since      1.0.0
 *
 * @package    Markercontent
 * @subpackage Markercontent/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Markercontent
 * @subpackage Markercontent/includes
 * @author     / <dev@123.com>
 */
use MarkerContent\includes\markerContent_Default_Settings;
class Markercontent_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
        self::set_default_settings();
        self::create_pages();
	}

    private static function set_default_settings()
    {
//        $marketDefSettings= new markerContent_Default_Settings();

//        foreach ($marketDefSettings->marketApiAuth() as $optionKey => $defaultValue) {
//            if(empty(get_option($optionKey))) update_option($optionKey, $defaultValue);
//        }

        foreach (markerContent_Default_Settings::$markeTtoken as $optionKey => $defaultValue) {
            if(empty(get_option($optionKey))) update_option($optionKey, $defaultValue);
        }
        foreach (markerContent_Default_Settings::$previusArticleAtachId as $optionKey => $defaultValue) {
            if(empty(get_option($optionKey))) update_option($optionKey, $defaultValue);
        }

//        foreach ($marketDefSettings->markerApiUser() as $optionKey => $defaultValue) {
//             update_option($optionKey, $defaultValue);
//        }

//        foreach ($marketDefSettings->marketApiArticles() as $optionKey => $defaultValue) {
//            update_option($optionKey, $defaultValue);
//        }

//        foreach ($marketDefSettings->marketApiCart() as $optionKey => $defaultValue) {
//            update_option($optionKey, $defaultValue);
//        }

//        foreach ($marketDefSettings->marketApiSubscriptions() as $optionKey => $defaultValue) {
//            update_option($optionKey, $defaultValue);
//        }
    }
    private static function create_pages()
    {
        foreach (markerContent_Default_Settings::$marketDefaultPages as $pageKey => $pageData) {
            if(empty(get_option($pageKey)) || empty(get_post(get_option($pageKey)))) {
                $page_id = wp_insert_post(
                    array(
                        'comment_status' => 'close',
                        'ping_status'    => 'close',
                        'post_author'    => 1,
                        'post_title'     => $pageData['title'],
                        'post_name'      => strtolower(str_replace(' ', '-', $pageData['title'])),
                        'post_status'    => 'publish',
                        'post_content'   => $pageData['content'],
                        'post_type'      => 'page',
                    )
                );


                update_option($pageKey, $page_id);

                if(empty(get_option('markerContent_after_login_page_location')) && $pageKey === 'markerContent_profile_page_location'){
                    update_option('markerContent_after_login_page_location', $page_id);
                }
            }
        }
    }
}
