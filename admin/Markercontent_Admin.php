<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https:///
 * @since      1.0.0
 *
 * @package    Markercontent
 * @subpackage Markercontent/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Markercontent
 * @subpackage Markercontent/admin
 * @author     / <dev@123.com>
 */
namespace MarkerContent\admin;

use MarkerContent\admin\app\SendRequest;
use MarkerContent\admin\app\FormValidation;
use MarkerContent\includes\markerContent_Default_Settings;


class Markercontent_Admin
{


    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $plugin_name The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @param string $plugin_name The name of this plugin.
     * @param string $version The version of this plugin.
     * @since    1.0.0
     */

    private $request;

    private $FormValidation;

//    private $imageUrl;

    private $setings;


    public function __construct($plugin_name, $version)
    {

        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->request = new SendRequest();
        $this->FormValidation = new FormValidation();
        $this->setings=new markerContent_Default_Settings();
//        $this->imageUrl= plugin_dir_url(__FILE__) . 'images/';
        if (session_id() != ''){
            session_start();
        }

        add_filter("script_loader_tag",  array( $this, 'add_module_to_my_script' ), 10, 3);

    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Markercontent_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Markercontent_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */


        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/markercontent-admin.css', array(), $this->version, 'all');
        wp_enqueue_style($this->plugin_name.'React', plugin_dir_url(__FILE__) . 'build/index.css', array(), $this->version, 'all');
    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Markercontent_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Markercontent_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */
        $params = array('ajaxurl' => admin_url('admin-ajax.php'));
        wp_enqueue_script( $this->plugin_name.'React', plugin_dir_url( __FILE__ ) . 'build/index.js', array( 'wp-element' ), $this->version, false );
        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/markercontent-admin.js', array('jquery'), $this->version, false);
        wp_localize_script($this->plugin_name, 'params', $params);
        wp_localize_script($this->plugin_name.'React', 'params', $params);
//        var_dump(plugin_dir_url(__FILE__) . 'build/index.js');
//        die();
    }

    public function add_module_to_my_script($tag, $handle,$src){
        if ($this->plugin_name === $handle) {
            $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
            return $tag;
        }
        return $tag;
    }

    public function init_settings()
    {
        $defSettigs=$this->setings;

//        foreach ($defSettigs->marketApiAuth() as $key => $defVal) {
//            register_setting('marketDefaultOptionsApi-settings-group', $key);
//        }
        foreach ($defSettigs::$markeTtoken as $key => $defVal) {
            register_setting('marketDefaultOptionsApi-settings-group', $key);
        }
        foreach ($defSettigs::$previusArticleAtachId as $key => $defVal) {
            register_setting('marketDefaultOptionsApi-settings-group', $key);
        }
//        foreach ($defSettigs->markerApiUser() as $key => $defVal) {
//            register_setting('marketDefaultOptionsApi-settings-group', $key);
//        }
    }

    /**
     * Restrict the Wordpress admin pages to administrator role
     */
    public function restrict_admin_pages()
    {
        global $current_user;

        if ((!current_user_can('administrator') || !is_admin())
            && '/wp-admin/admin-ajax.php' != $_SERVER['PHP_SELF']) {
            exit(wp_redirect('/'));
        }
    }

    public function add_admin_menu()
    {
        add_menu_page('markerContent', 'markerContent', 'administrator', $this->plugin_name, array(&$this, 'render_admin_page'));
    }


    public function render_admin_page()
    {
        if(get_option('token')==''){
            require_once plugin_dir_path(dirname(__FILE__)) . 'admin/partials/markercontent-admin-registr-form.php';
        }else{
            require_once plugin_dir_path(dirname(__FILE__)) . 'admin/partials/markercontent-admin-articles.php';
        }
    }

    public function markercontent_post_type()
    {
        $labels = array(
            'name' => __('All Content', 'markercontent', 'wp-markercontent'),
            'singular_name' => __('Content', 'wm_videos', 'wp-markercontent'),
            'menu_name' => __('Content', 'wp-markercontent'),
            'parent_item_colon' => __('Parent Content', 'wp-markercontent'),
            'all_items' => __('All Contens', 'wp-markercontent'),
            'view_item' => __('View Content', 'wp-markercontent'),
            'add_new_item' => __('Add New Content', 'wp-markercontent'),
            'add_new' => __('Add New', 'wp-markercontent'),
            'edit_item' => __('Edit Content', 'wp-markercontent'),
            'update_item' => __('Update Content', 'wp-markercontent'),
            'search_items' => __('Search Contents', 'wp-markercontent'),
            'not_found' => __('Not Found', 'wp-markercontent'),
            'not_found_in_trash' => __('Not found in Trash', 'wp-markercontent'),
        );

        // Registering your Custom Post Type
//        register_post_type('markercontent', $args);
    }

    public function markercontent_category_taxonomies()
    {
        // Add new "Locations" taxonomy to Posts
//        register_taxonomy('markercontent_category', 'markercontent', array(
//            // Hierarchical taxonomy (like categories)
//            'hierarchical' => true,
//            // This array of options controls the labels displayed in the WordPress Admin UI
//            'labels' => array(
//                'name' => _x('Category', 'Category'),
//                'singular_name' => _x('Category', 'Category'),
//                'search_items' => __('Search Categories'),
//                'all_items' => __('All Categories'),
//                'parent_item' => __('Parent Categories'),
//                'parent_item_colon' => __('Parent Category'),
//                'edit_item' => __('Edit Category'),
//                'update_item' => __('Update Category'),
//                'add_new_item' => __('Add New Category'),
//                'new_item_name' => __('New Category Name'),
//                'menu_name' => __('Categories'),
//            ),
//            // Control the slugs used for this taxonomy
//            'rewrite' => array(
//                'slug' => 'content_category', // This controls the base slug that will display before each term
//                'with_front' => false, // Don't display the category base before "/locations/"
//                'hierarchical' => true // This will allow URL's like "/locations/boston/cambridge/"
//            ),
//        ));
    }

    public function markercontent_user_logIn()
    {
        $validation = $this->FormValidation->isFormDataValid($_POST);

        $response = false;
        if($validation['valid']) {
            $response = $this->request->request($validation['validFormData'],$this->setings->marketApiauth['logIn']);
        }
        if ($response){
            $this->updateToken($response->data->token);
        }
    }


    public function markercontent_user_registration()
    {
        $validation = $this->FormValidation->isFormDataValid($_POST);
        $response = false;
        if($validation['valid']) {
            $response = $this->request->request($validation['validFormData'],$this->setings->marketApiauth['register']);
        }
        if ($response){
            $this->updateToken($response->data->token);
        }
    }

    public function markercontent_password_restore(){
        $validation = $this->FormValidation->isFormDataValid($_POST);
        $response = false;
        if($validation['valid']) {
            $response = $this->request->request($validation['validFormData'],$this->setings->marketApiauth['sendResetToken']);
        }
        if ($response){
            $response->message=__('Check your email to update your password ',$this->plugin_name);
            wp_send_json($response, 200 );
            die();
        }
    }

    public function markercontent_user_logout(){
        $response = $this->request->bearerRequest($this->setings->marketApiauth['logout'],"POST");
        if ($response){
            $this->updateToken('');
            wp_send_json($response, 200 );
        }
    }


    public function refreshToken(){
        $response = $this->request->bearerRequest($this->setings->marketApiauth['refreshToken'],"POST");
        if ($response){
            $this->updateToken($response->data->token);
            wp_send_json($response->message, 200 );
        }
    }



    private function updateToken ($token){
        update_option("token", $token);
    }

//    public function imageUrl($imageName){
//        return $this->imageUrl . $imageName;
//    }

    public function loadPreloader()
    {
        require_once plugin_dir_path(dirname(__FILE__)) . 'admin/partials/loader.php';

    }

    static function getsvg(string $name)
    {
        return include plugin_dir_path(dirname(__FILE__)) . 'admin/partials/icons/'.$name;
    }

    public function sendTemplate($template){
        $response=[
            'type'=>'template',
            'message'=>$template
        ];

        wp_send_json($response,200);
    }

}