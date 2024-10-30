<?php
namespace MarkerContent\admin\app\controllers;
/**
 * The UserDetails class is responsible for managing the interactions between the plugin and the User endpoints of the API.
 * It is responsible for receiving and updating user data .
 */
use MarkerContent\admin\app\FormValidation;
use MarkerContent\admin\app\SendRequest;
use MarkerContent\includes\markerContent_Default_Settings;

class UserDetails
{
    protected $plugin_name;

    protected $version;

    private $request;

    private $formValidation;

    private $setings;


    public function __construct($version, $plugin_name)
    {
        $this->version = $version;

        $this->plugin_name = $plugin_name;

        $this->request = new SendRequest();
        $this->formValidation = new FormValidation();
        $this->setings=new markerContent_Default_Settings();
        session_start();
    }


    public function markercontent_update_profile()
    {
        $validation = $this->formValidation->isFormDataValid($_POST);
        $response = false;
        if ($validation['valid']) {
            $response = $this->request->bearerRequest($this->setings->markerApiUser['user_info'], "PATCH", $validation['validFormData']);
        }
        if ($response) {
            $this->updateUser($response->data);
            wp_send_json($response, 200);
        }
        die();
    }

    public function markercontent_get_user_info()
    {
        $info = $this->request->bearerRequest($this->setings->markerApiUser['user_info'], "GET");
        $this->updateUser($info->data);
        wp_send_json($info, 200);

    }
    //user data  from api  is valid
    private function updateUser($user)
    {
        $_SESSION['user'] = $user;
    }


    public function markercontent_update_profile_password()
    {
        $response = false;
        $validation = $this->formValidation->isFormDataValid($_POST);
        $formData = $validation['validFormData'];
        if ($validation['valid']) {
            $checkFormdata = [
                'email' => sanitize_email($_SESSION['user']->email),
                'password' => $formData['password'],
                'app_type' => 'wordpress'
            ];
            $response = $this->request->request($checkFormdata, $this->setings->marketApiauth['logIn']);
        }
        if ($response) {
            $this->updateToken($response->data->token);
            $validFormdata = [
                'email' => sanitize_email($_SESSION['user']->email),
                'first_name' => sanitize_text_field($_SESSION['user']->first_name),
                'last_name' => sanitize_text_field($_SESSION['user']->last_name),
                'password' => $formData['NewPass'],
                'password_confirmation' => $formData['NewPass']
            ];
            $passwordUpdate = $this->request->bearerRequest($this->setings->markerApiUser['user_info'], "PATCH", $validFormdata);
            if ($passwordUpdate) {
                $this->updateUser($response->data);
                wp_send_json("Password successfully updated", 200);
            }
        }
    }

    private function updateToken($token)
    {
        update_option("token", $token);
    }



}