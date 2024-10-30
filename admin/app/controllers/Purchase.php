<?php

namespace MarkerContent\admin\app\controllers;
/**
 * The Purchase class is responsible for managing the interactions between the plugin and the Article endpoints of the API.
 * He is responsible for receiving paid articles. And for importing articles into Wordpress.
 */

use MarkerContent\admin\app\ArticleImport;
use MarkerContent\admin\app\SendRequest;
use MarkerContent\includes\markerContent_Default_Settings;

class Purchase
{
    protected $plugin_name;

    protected $version;

    private $request;


    private $import;

    private $setings;


    public function __construct($version, $plugin_name)
    {
        $this->version = $version;

        $this->plugin_name = $plugin_name;

        $this->request = new SendRequest();
        $this->import = new ArticleImport();
        $this->setings = new markerContent_Default_Settings();
    }


    public function markercontent_getPurchase()
    {
        $response = $this->request->bearerRequest($this->setings->Articles['get_purchase_articles'], "GET");
        if ($response->success) {
            $ids = $this->import->importedArticlesIds();
            $updatePurchaseArticles = $this->updatePurchaseObject($ids, $response->data);

            $newData['marker_response'] = $updatePurchaseArticles;
            $newData['message'] = $response->message;
            wp_send_json($newData, 200);
        }
    }

    public function markercontent_importArticle()
    {
        $id = sanitize_text_field($_POST["userInfo"]["purchaseData"]);

        $response = $this->request->bearerRequest($this->setings->Articles['get_article_by_id'] . $id, "GET");
        $this->import->importArticle($response->data);

        $purchase = $this->request->bearerRequest($this->setings->Articles['get_purchase_articles'], "GET");
        $ids = $this->import->importedArticlesIds();
        $updatePurchaseArticles = $this->updatePurchaseObject($ids, $purchase->data);

        $newData['marker_response'] = $updatePurchaseArticles;
        wp_send_json($newData, 200);
    }


    private function updatePurchaseObject($importedMarketIds, $marketPurchase)
    {
        $newArray = json_decode(json_encode($marketPurchase), true);
        $markerIds = array_map(fn($post) => $post["id"], $newArray);
        if (!$importedMarketIds) {
            $importedMarketIds = [];
        }
        $result = array_intersect($importedMarketIds, $markerIds);
        unset($newArray['total']);
        foreach ($newArray as $key => $value) {
            if (in_array($value['id'], $result)) {
                $newArray[$key]['imported'] = true;
            } else {
                $newArray[$key]['imported'] = false;
            }
        }

        return $newArray;
    }

}