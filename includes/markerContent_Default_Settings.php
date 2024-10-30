<?php
namespace  MarkerContent\includes;
/**
 * The markerContent_Default_Settings class is  responsible for endpoint references and the names of several options . Token and the preceding article
 */
class markerContent_Default_Settings
{

    public $prefix='https://www.markercontent.com';
    public $markerApiUser;
    public $marketApiauth;
    public $Articles;
    public $Subscriptions;
    public $Cart;

    public function  __construct(){

        $this->markerApiUser=$this->markerApiUser();
        $this->marketApiauth= $this->marketApiAuth();
        $this->Articles= $this->marketApiArticles();
        $this->Subscriptions= $this->marketApiSubscriptions();
        $this->Cart= $this->marketApiCart();
    }


    public static $marketDefaultPages = [
        'markerContent_create_account_page' => [
            'title' => 'Create a new account',
            'content' => '<!-- wp:heading {"level":3} --><h3>Not a member? Here are some of the things you can do with a Free account</h3><!-- /wp:heading -->'
        ],
        'markerContent_profile_page_location' => [
            'title' => 'Your Profile',
            'content' => ''
        ],
        'markerContent_articles_page' => [
            'title' => 'Content page',
            'content' => ''
        ],
    ];

    public static  $marketApiAuth = [
        'register'=>'/api/v1/register',
        'logIn'=>'/api/v1/login',
        'logout'=>'/api/v1/logout',
        'refreshToken'=>'/api/v1/refresh-token',
        'sendResetToken'=>'/api/v1/forgot-password',
    ];

    public static $markeTtoken=[
        'token'=>''
    ];

    public static $previusArticleAtachId=[
        'ArticleId'=>''
    ];


    public static  $marketApiUser = [
        'user_info'=> '/api/v1/me',
        'update_Auth_User'=>'/api/v1/me',
        'userInfo'=>'/api/v1/users/1',
        'authUserSubscriptions'=>'/api/v1/me/subscriptions'
    ];

    public static $articles = [
        'search_article'=>'/api/v1/articles?search=',
        'get_article_by_id'=>'/api/v1/articles/',
        'get_purchase_articles'=>'/api/v1/articles/me',
        'redeem_article'=>'/api/v1/articles/redeem'
    ];

    public static $subscriptions = [
        'get_subscriptions_list'=>'/api/v1/subscriptions',
        'get_billing_info'=>'/api/v1/subscriptions/billing',
        'checkout_subscription'=>'/api/v1/subscriptions/checkout',
        'handle_subscription_payment'=>'/api/v1/subscriptions/checkout-success?session_id='
    ];

    public static $cart = [
        'get_cart'=>'/api/v1/cart',
        'add_article_to_cart'=>'/api/v1/cart/add',
        'remove_article_from_cart'=>'/api/v1/cart/remove',
        'checkout_cart'=>'/api/v1/cart/checkout',
        'cart_payment'=>'/api/v1/cart/checkout-success?session_id='
    ];

    public function marketApiAuth () {
        return $this->markerPrefix(markerContent_Default_Settings::$marketApiAuth,$this->prefix);
    }


    public function markerApiUser () {
        return $this->markerPrefix(markerContent_Default_Settings::$marketApiUser,$this->prefix);
    }


    public function marketApiArticles () {
        return $this->markerPrefix(markerContent_Default_Settings::$articles,$this->prefix);
    }

    public function marketApiCart () {
        return $this->markerPrefix(markerContent_Default_Settings::$cart,$this->prefix);
    }

    public function marketApiSubscriptions () {
        return $this->markerPrefix(markerContent_Default_Settings::$subscriptions,$this->prefix);
    }


    public function markerPrefix($data, $prefix ) {
        $newData=$data;
        array_walk($newData, function (&$value, $key) use($prefix) {
            $value="$prefix$value";
        });
        return $newData;
    }

}