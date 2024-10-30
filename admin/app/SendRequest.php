<?php
namespace MarkerContent\admin\app;
/**
 * SendRequest class handles HTTP requests to a server and returns the response
 * It contains methods for sending a request, sending a request with a bearer token,
 * sending multiple requests, and handling request errors.
 */

class SendRequest
{
    public function __construct()
    {

    }

    public function request($UserInfo, $optionUrl)
    {
        $response = $this->markerContentRequest('POST', $optionUrl, $UserInfo);
        if ($response->success) {
            return $response;
        } else {
            $this->requestError($response);
            return false;
        }
    }

    public function bearerRequest($optionUrl, $respType, $body = null)
    {

        $response = $this->markerContentRequestBearer($respType, $optionUrl,  get_option('token'),$body);

        if ($response->success) {
            return $response;
        } else {
            $this->requestError($response);
            return false;
        }
    }

    private function markerContentRequest($method, $url, $body = null)
    {
        $resp = wp_remote_request($url, array(
            'method' => $method,
            'timeout' => '30',
            'body' => $body,
            'headers' => [
                'Accept' => 'application/json',
            ]
        ));

        return json_decode($resp['body']);
    }


    private function markerContentRequestBearer($method, $url, $token, $body = null)
    {

        $params = [
            'method' => $method,
            'timeout' => '30',
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token,
            ]
        ];
        if ($body) $params['body'] = $body;
        $resp = wp_remote_request($url, $params);


        return json_decode($resp['body']);
    }


    /**
     * Sends multiple HTTP requests concurrently using cURL.
     *
     * @param array $urls List of URLs to send the requests to.
     *
     * @return array Result of the cURL requests, with the same order as the input URLs.
     */
    public function getMultipleRequest($urls)
    {
        $token = get_option('token');
        $multiCurl = array();

        $result = array();

        $mh = curl_multi_init();

        // Loop through each URL and set up the cURL options
        foreach ($urls as $i => $fetchURL) {
            // URL from which data will be fetched
            $multiCurl[$i] = curl_init();
            curl_setopt($multiCurl[$i], CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $token
            ));
            curl_setopt($multiCurl[$i], CURLOPT_URL,$fetchURL);
            curl_setopt($multiCurl[$i], CURLOPT_HEADER,0);
            curl_setopt($multiCurl[$i], CURLOPT_RETURNTRANSFER,1);
            curl_multi_add_handle($mh, $multiCurl[$i]);
        }

        // Execute the cURL requests concurrently
        $index=null;
        do {
            curl_multi_exec($mh,$index);
        } while($index > 0);

        // Retrieve the results of the cURL requests and remove the handles
        foreach($multiCurl as $k => $ch) {
            $result[$k] = json_decode(curl_multi_getcontent($ch));
            curl_multi_remove_handle($mh, $ch);
        }
        curl_multi_close($mh);// Close the cURL multi handle
        return $result;
    }


    public function requestError($body)
    {
        wp_send_json($body, 400);
    }


}