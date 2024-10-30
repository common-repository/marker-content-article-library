<?php

namespace MarkerContent\admin\app\controllers;
/**
 * The Subscriptions class is responsible for managing the interactions between the plugin and the subscriptions endpoints of the API.
 * It has several public methods such as markercontent_getSubscriptions, markercontent_authUserSubscriptions, markercontent_subscriptionComplete,
 * markercontent_billingInfo, markercontent_redeemArticle, and markercontent_checkout_subscription
 * that are used to retrieve information and perform actions related to subscriptions.
 * The class also has two private methods requestGetHandler and requestPostHandler which are used to handle GET and POST requests respectively.
 * It also uses two other classes SendRequest and markerContent_Default_Settings which are instantiated in the constructor and
 * are used to make API requests and access default settings respectively.
 */

use MarkerContent\admin\app\SendRequest;
use MarkerContent\includes\markerContent_Default_Settings;


class Subscriptions
{
    protected $plugin_name;

    protected $version;

    private $request;


    private $setings;


    public function __construct($version, $plugin_name)
    {
        $this->version = $version;

        $this->plugin_name = $plugin_name;

        $this->request = new SendRequest();
        $this->setings = new markerContent_Default_Settings();
    }

    public function markercontent_getSubscriptions()
    {
        $this->requestGetHandler($this->setings->Subscriptions['get_subscriptions_list']);
    }

    public function markercontent_authUserSubscriptions()
    {
        $this->requestGetHandler($this->setings->markerApiUser['authUserSubscriptions']);
    }

    //this method passes the stripe id from $_POST
    public function markercontent_subscriptionComplete()
    {
        $this->requestGetHandler($this->setings->Subscriptions['handle_subscription_payment'] . sanitize_text_field($_POST["userInfo"]['articles_ids']));
    }

    public function markercontent_billingInfo()
    {
        $body['cancel_url'] = sanitize_url($_POST['cancel_url']);
        $body['app_type'] = 'wordpress';
        $this->requestPostHandler($this->setings->Subscriptions['get_billing_info'], $body);
    }


    public function markercontent_redeemArticle()
    {

        $body['article'] = sanitize_text_field($_POST['article']);
        $this->requestPostHandler($this->setings->Articles['redeem_article'], $body);
    }



    public function markercontent_checkout_subscription()
    {
        $body['price_id'] = sanitize_text_field( $_POST['price_id']);
        $body['redirect_url'] = sanitize_url($_POST['redirect_url']);
        $body['page'] = sanitize_url($_POST['page']);
        $body['cancel_url'] = sanitize_url($_POST['cancel_url']);
        $this->requestPostHandler($this->setings->Subscriptions['checkout_subscription'], $body);
    }

    private function requestGetHandler($url)
    {

        $response = $this->request->bearerRequest($url, "GET");
        if ($response->success) {
            $newData['marker_response'] = $response->data;
            $newData['message'] = $response->message;
            wp_send_json($newData, 200);
        }
    }

    private function requestPostHandler($url, $body)
    {

        $response = $this->request->bearerRequest($url, "POST", $body);
        if ($response->success) {
            $newData['marker_response'] = $response->data;
            $newData['message'] = $response->message;
            wp_send_json($newData, 200);
        }
    }

}