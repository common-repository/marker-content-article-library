<?php


namespace MarkerContent\admin\app;
/**
 * The FormValidation class is  responsible for the validation of the data that comes to the server.
 */

class FormValidation
{
    public function __construct()
    {

    }

    public function isFormDataValid($post)
    {
        $validation = $this->formValidation($post);

        if ($validation['valid']) {
            return $validation;
        } else {
            wp_send_json($validation, 400);
            die();
        }
    }

    private function formValidation($post)
    {
        $userInfo = $post['userInfo'];
        $validFormData = $this->validateFormStrings($userInfo);
        if (array_key_exists('email', $userInfo) && !filter_var($userInfo['email'], FILTER_VALIDATE_EMAIL)) {
            return [
                "valid" => false,
                "message" => "Unfortunately, this email was not validated"
            ];
        } elseif (!$this->notEmpty($userInfo)) {
            return [
                "valid" => false,
                "message" => "One or more fields are empty"
            ];
        } elseif (!$validFormData) {
            return [
                "valid" => false,
                "message" => "Not all elements in the form are strings"
            ];
        } else {
            return [
                "valid" => true,
                "validFormData" => $validFormData
            ];
        }
    }

    private function notEmpty($userInfo)
    {
        foreach ($userInfo as $data) {
            if (!isset($data)) {
                return false;
            }
        }
        return true;
    }

    private function validateFormStrings($formData)
    {
        $validFormData = [];
        foreach ($formData as $key => $data) {
            $validItem = sanitize_text_field($data);
            if (!$validItem) {
                return false;
            }
            $validFormData[$key] = $validItem;
        }
        return $validFormData;
    }

}
