<?php

namespace MarkerContent\admin\app\article;
/**
 * The CreateImage class is  responsible for creating and deleting images of the viewed articles . Images are placed in the uploads directory
 */

class CreateImage
{
    public function __construct()
    {
    }

    public function createImage(string $text,$colour = array(0,0,0), $background = array(255,255,255))
    {
        $this->removePreviusArticle();

        $font = __DIR__ . '/Roboto-Regular.ttf';
        $line_height = 15;
        $padding = 5;
        $lines=$this->prepareText($text);
        $img = imagecreate(560, ((count($lines) * ($line_height+$padding))) + ($padding * 2));
        $background = imagecolorallocate($img, $background[0], $background[1], $background[2]);
        $colour = imagecolorallocate($img,$colour[0],$colour[1],$colour[2]);
        imagefill($img, 0, 0, $background);
        $i = 20;
        foreach($lines as $line){
            imagettftext($img, 14, 0, 10, $i, $colour, $font, $line);
            $i += $line_height+$padding;
        }
        $fileName='Article'.time().'.png';
        $atachPath = $this->saveImage($img,$fileName);

        header( "Content-type: text/html" );


        [$ArticleId,$atachUrl]=$this->saveImageforWp($atachPath,$fileName);
        update_option("ArticleId", $ArticleId);

        imagedestroy($img);
        return $atachUrl;
    }
     public function saveImage($img,$filename){
         $uploads = wp_upload_dir();
         $fullPath=$uploads['path'].'/'.$filename;
//         $pattern=$uploads['path'].'/Article*.png';
//         $matches = glob( $pattern, $flags = 0);
         header( "Content-type: image/png" );
         imagepng($img, $fullPath);
         return $fullPath;
    }


    public function saveImageforWp($imagePath,$filename){
        $wp_filetype = wp_check_filetype( $filename, null );
        $attachment = array(
            'post_mime_type' => $wp_filetype['type'],
            'post_title' => sanitize_file_name( $filename ),
            'post_content' => '',
            'post_status' => 'inherit'
        );
        $attach_id=wp_insert_attachment( $attachment, $imagePath );
        require_once( ABSPATH . 'wp-admin/includes/image.php' );
        $attach_data = wp_generate_attachment_metadata( $attach_id, $imagePath );
        wp_update_attachment_metadata( $attach_id, $attach_data );
        return [$attach_id,wp_get_attachment_url($attach_id)];
    }

    public function prepareText($text){
        $stripString = strip_tags($text, '<br />');
        $newText = wordwrap($stripString, 60, "\n");
        $strArray=explode( "\n", str_replace( ["<br />","<br\n/>"],"\n",$newText));
        return array_map(fn($str)=> trim(preg_replace('/\s+/',' ', $str)), $strArray);
    }
    private function removePreviusArticle(){
        if (get_option("ArticleId")){
            $PrevAtachId=intval(get_option("ArticleId"));
            wp_delete_attachment($PrevAtachId, true );
        }
    }


}