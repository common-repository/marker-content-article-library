<?php

namespace MarkerContent\admin\app\controllers;
/**
 * The Cart class is responsible for managing the interactions between the plugin and the Cart endpoints of the API.
 *
 * The class uses several other classes and functions, such as FormValidation, SendRequest, and markerContent_Default_Settings to perform its tasks.
 * The class also uses WP_send_json function to return the responses received from the API calls.
 */

use MarkerContent\admin\app\FormValidation;
use MarkerContent\admin\app\SendRequest;
use MarkerContent\includes\markerContent_Default_Settings;

class Cart
{
    protected $plugin_name;

    protected $version;

    private $formValidation;

    private $setings;

    private $request;

    public function __construct($version, $plugin_name)
    {
        $this->version = $version;

        $this->plugin_name = $plugin_name;

        $this->request = new SendRequest();
        $this->formValidation = new FormValidation();
        $this->setings=new markerContent_Default_Settings();

    }

    public function markercontent_getCart()
    {
        $response = $this->request->bearerRequest($this->setings->Cart['get_cart'], "GET");
        if ($response->success) {
            $newData['marker_response'] = $response->data;
            $newData['message'] = $response->message;
            wp_send_json($newData, 200);
        }
    }


    public function markercontent_addToCart()
    {
        $validation = $this->formValidation->isFormDataValid($_POST);
        $response = false;
        if ($validation['valid']) {
            $body=['article_id'=>sanitize_text_field($_POST["userInfo"]['articles_ids'])];
            $response = $this->request->bearerRequest($this->setings->Cart['add_article_to_cart'], "POST",$body);
        }
        if ($response->success) {
            $newData['message'] = $response;
            wp_send_json($newData, 200);
        }
    }

    public function markercontent_getCartArticles()
    {
        $validation = $this->formValidation->isFormDataValid($_POST);
        if ($validation['valid']) {
            $urls = $this->prepareUrls(array_map('sanitize_text_field',$_POST["userInfo"]));
            $response = $this->request->getMultipleRequest($urls);
            wp_send_json($response, 200);
        }

    }

    private function prepareUrls($ids)
    {
        $url=$this->setings->Articles['get_article_by_id'];
        $arrayIds=explode(',',sanitize_text_field($ids['articles_ids']));
        return array_map(fn($id)=>$url.$id, $arrayIds);
    }


    public function markercontent_removeArticle(){
        $validation = $this->formValidation->isFormDataValid($_POST);
        $response = false;
        if ($validation['valid']) {
            $body=['article_id'=>sanitize_text_field($_POST["userInfo"]['articles_ids'])];
            $response = $this->request->bearerRequest($this->setings->Cart['remove_article_from_cart'], "PATCH", $body);
        }
        if ($response->success) {
            wp_send_json($response, 200);
        }

    }

    public function markercontent_checkoutArticles(){
        $body['redirect_url']=sanitize_url($_POST['redirect_url']);
        $body['page']=sanitize_url($_POST['page']);
        $body['cancel_url']=sanitize_url($_POST['cancel_url']);

        $response = $this->request->bearerRequest($this->setings->Cart['checkout_cart'], "POST",$body);

        wp_send_json($response, 200);
    }

    //this method passes the stripe id from $_POST
    public function markercontent_paymentComplete(){
        $validation = $this->formValidation->isFormDataValid($_POST);
        $response = false;
        if ($validation['valid']) {
            $response = $this->request->bearerRequest($this->setings->Cart['cart_payment'].sanitize_text_field($_POST["userInfo"]['articles_ids']), "GET");
        }
        if ($response->success) {
            wp_send_json($response, 200);
        }
    }
}