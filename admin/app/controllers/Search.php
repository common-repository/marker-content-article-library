<?php


namespace MarkerContent\admin\app\controllers;
/**
 * The Search class is responsible for managing the interactions between the plugin and the Search endpoints of the API.
 * It is responsible for sending the data of received articles in the preliminary search results . And also in general search results  and search by id .
 */

use MarkerContent\admin\app\FormValidation;
use MarkerContent\admin\app\SendRequest;
use  MarkerContent\admin\app\article\CreateImage;
use MarkerContent\includes\markerContent_Default_Settings;

class Search
{
    protected $plugin_name;

    protected $version;

    private $request;

    private $formValidation;

    private $createImage;

    private $setings;

    public function __construct($version, $plugin_name)
    {
        $this->version = $version;

        $this->plugin_name = $plugin_name;

        $this->request = new SendRequest();
        $this->formValidation = new FormValidation();
        $this->createImage=new CreateImage();
        $this->setings=new markerContent_Default_Settings();

    }

    public function markercontent_search_results(){
        $statusResponse=false;
        $response=[];
        $validation = $this->formValidation->isFormDataValid($_POST);
        if ($validation['valid']) {
            $url=$this->prepareSearchUrl($validation['validFormData']);
            $response = $this->request->bearerRequest($url, "GET");
            $statusResponse = $response->success;
        }
        if ($statusResponse) {
            $newData['data'] = $response->data;
            $newData['message']=$response->message;


            $newData['paginate']['current_page'] = $response->current_page;
            $newData['paginate']['last_page'] = $response->last_page;
            $newData['paginate']['total'] = $response->total;
            $newData['paginate']['per_page'] = $response->per_page;

            wp_send_json($newData, 200);
        }
    }

    public function markercontent_get_search_pre(){
        $validation = $this->formValidation->isFormDataValid($_POST);
        $response = false;
        $statusResponse=false;
        $searchString=false;

        if ($validation['valid']) {
            $searchString=$validation['validFormData']['search'];
            $response = $this->request->bearerRequest($this->setings->Articles['search_article'].$searchString, "GET");
            $statusResponse = $response->success;
        }
        if ($statusResponse) {

            $newData['data'] = $this->sortSearchResultForPreloader($response->data,$searchString);
            $newData['message']=$response->message;

            wp_send_json($newData, 200);
        }
    }

    public function markercontent_get_search_by_id(){
        $statusResponse=false;
        $validation = $this->formValidation->isFormDataValid($_POST);
        if ($validation['valid']) {
            $response = $this->request->bearerRequest($this->setings->Articles['get_article_by_id'].$validation['validFormData']['search'], "GET");
            $statusResponse = $response->success;
        }
        if ($statusResponse) {
            $newData['data'] = $this->prepareData($response->data);
            $newData['message']=$response->message;
            wp_send_json($newData, 200);
        }
    }

    private function sortSearchResultForPreloader($apiResponseData,$searchTile){
        $new_data=[];
        $i = 0;
        foreach ($apiResponseData as $item){
            if(strpos(strtolower($item->title), strtolower($searchTile)) !== false){
                $new_data[$item->id]=$item->title;
                if (++$i == 10) break;
            }
        }
        return $new_data;
    }

    private function prepareData($data){
        $data->sanitized_rich_text=$this->createImage->createImage($data->sanitized_rich_text);
        return $data;
    }
    private function prepareSearchUrl($validFormData){
        $urlpams=array_key_exists( "page",  $validFormData)?$validFormData['search'].'&page='.$validFormData['page']:$validFormData['search'];
        return $this->setings->Articles['search_article'].$urlpams;
    }
}