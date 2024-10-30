<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https:///
 * @since      1.0.0
 *
 * @package    Marketrontent
 * @subpackage Markercontent/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Markercontent
 * @subpackage Markercontent/includes
 * @author     / <dev@123.com>
 */
use \MarkerContent\admin\app\UserAccount;
use \MarkerContent\admin\Markercontent_Admin;
use \MarkerContent\admin\app\controllers\UserDetails;
use \MarkerContent\admin\app\controllers\Search;
use \MarkerContent\admin\app\controllers\Cart;
use \MarkerContent\admin\app\controllers\Purchase;
use \MarkerContent\admin\app\controllers\Subscriptions;

class MarkerContent
{

    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      Markerontent_Loader $loader Maintains and registers all hooks for the plugin.
     */
    protected $loader;

    /**
     * The unique identifier of this plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string $plugin_name The string used to uniquely identify this plugin.
     */
    protected $plugin_name;

    /**
     * The current version of the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string $version The current version of the plugin.
     */
    protected $version;

    /**
     * Define the core functionality of the plugin.
     *
     * Set the plugin name and the plugin version that can be used throughout the plugin.
     * Load the dependencies, define the locale, and set the hooks for the admin area and
     * the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function __construct()
    {
        if (defined('MARKERCONTENT_VERSION')) {
            $this->version = MARKERCONTENT_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = 'markercontent';

        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();

    }

    /**
     * Load the required dependencies for this plugin.
     *
     * Include the following files that make up the plugin:
     *
     * - Markercontent_Loader. Orchestrates the hooks of the plugin.
     * - Markercontent_i18n. Defines internationalization functionality.
     * - Markercontent_Admin. Defines all hooks for the admin area.
     * - Markercontent_Public. Defines all hooks for the public side of the site.
     *
     * Create an instance of the loader which will be used to register the hooks
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function load_dependencies()
    {
        /**
         * The class responsible for orchestrating the actions and filters of the
         * core plugin.
         */

        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-markercontent-loader.php';

        /**
         * The class responsible for defining internationalization functionality
         * of the plugin.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-markercontent-i18n.php';

        /**
         * this class stores the plugin's default variables
         */

//        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-markerContent_Default_Settings.php';

        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
//        require_once plugin_dir_path(dirname(__FILE__)) . 'admin/Markercontent_Admin.php';




        $this->loader = new Markercontent_Loader();

    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * Uses the Markercontent_i18n class in order to set the domain and to register the hook
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private
    function set_locale()
    {

        $plugin_i18n = new Markercontent_i18n();

        $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');

    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private
    function define_admin_hooks()
    {

        $plugin_admin = new Markercontent_Admin($this->get_plugin_name(), $this->get_version());
        $user_details = new UserDetails($this->get_plugin_name(), $this->get_version());
        $search = new Search($this->get_plugin_name(), $this->get_version());
        $cart= new Cart($this->get_plugin_name(), $this->get_version());
        $purcashe = new Purchase($this->get_plugin_name(), $this->get_version());
        $subscription= new Subscriptions($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');

        $this->loader->add_action('admin_init', $plugin_admin, 'init_settings');
        $this->loader->add_action('admin_init', $plugin_admin, 'restrict_admin_pages');
        $this->loader->add_action('admin_menu', $plugin_admin, 'add_admin_menu');

        $this->loader->add_action('init', $plugin_admin, 'markercontent_post_type');
        $this->loader->add_action('init', $plugin_admin, 'markercontent_category_taxonomies', 0);

        $this->loader->add_action('admin_footer', $plugin_admin, 'loadPreloader');

        $this->loader->add_action('wp_ajax_markercontent_user_logIn', $plugin_admin, 'markercontent_user_logIn');
        $this->loader->add_action('wp_ajax_markercontent_user_registration', $plugin_admin, 'markercontent_user_registration');
        $this->loader->add_action('wp_ajax_markercontent_user_logout', $plugin_admin, 'markercontent_user_logout');
        $this->loader->add_action('wp_ajax_markercontent_password_restore', $plugin_admin, 'markercontent_password_restore');

        //all user info ajax
        $this->loader->add_action('wp_ajax_markercontent_get_user_info', $user_details, 'markercontent_get_user_info');
        $this->loader->add_action('wp_ajax_markercontent_update_profile', $user_details, 'markercontent_update_profile');
        $this->loader->add_action('wp_ajax_markercontent_update_profile_password', $user_details, 'markercontent_update_profile_password');

        //all search
        $this->loader->add_action('wp_ajax_markercontent_search_results', $search, 'markercontent_search_results');
        $this->loader->add_action('wp_ajax_markercontent_get_search_pre', $search, 'markercontent_get_search_pre');
        $this->loader->add_action('wp_ajax_markercontent_get_search_by_id', $search, 'markercontent_get_search_by_id');


        //all Purchase and import
        $this->loader->add_action('wp_ajax_markercontent_getPurchase', $purcashe, 'markercontent_getPurchase');
        $this->loader->add_action('wp_ajax_markercontent_importArticle', $purcashe, 'markercontent_importArticle');


        //all cart
        $this->loader->add_action('wp_ajax_markercontent_getCart', $cart, 'markercontent_getCart');
        $this->loader->add_action('wp_ajax_markercontent_addToCart', $cart, 'markercontent_addToCart');
        $this->loader->add_action('wp_ajax_markercontent_getCartArticles', $cart, 'markercontent_getCartArticles');
        $this->loader->add_action('wp_ajax_markercontent_removeArticle', $cart, 'markercontent_removeArticle');
        $this->loader->add_action('wp_ajax_markercontent_checkoutArticles', $cart, 'markercontent_checkoutArticles');
        $this->loader->add_action('wp_ajax_markercontent_paymentComplete', $cart, 'markercontent_paymentComplete');

        //all subscription
        $this->loader->add_action('wp_ajax_markercontent_getSubscriptions', $subscription, 'markercontent_getSubscriptions');
        $this->loader->add_action('wp_ajax_markercontent_authUserSubscriptions', $subscription, 'markercontent_authUserSubscriptions');
        $this->loader->add_action('wp_ajax_markercontent_checkout_subscription', $subscription, 'markercontent_checkout_subscription');
        $this->loader->add_action('wp_ajax_markercontent_subscriptionComplete', $subscription, 'markercontent_subscriptionComplete');
        $this->loader->add_action('wp_ajax_markercontent_redeemArticle', $subscription, 'markercontent_redeemArticle');
        $this->loader->add_action('wp_ajax_markercontent_billingInfo', $subscription, 'markercontent_billingInfo');
    }



    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     * @since    1.0.0
     */
    public
    function run()
    {
        $this->loader->run();
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @return    string    The name of the plugin.
     * @since     1.0.0
     */
    public
    function get_plugin_name()
    {
        return $this->plugin_name;
    }

    /**
     * The reference to the class that orchestrates the hooks with the plugin.
     *
     * @return    Markercontent_Loader    Orchestrates the hooks of the plugin.
     * @since     1.0.0
     */
    public
    function get_loader()
    {
        return $this->loader;
    }

    /**
     * Retrieve the version number of the plugin.
     *
     * @return    string    The version number of the plugin.
     * @since     1.0.0
     */
    public
    function get_version()
    {
        return $this->version;
    }
}
