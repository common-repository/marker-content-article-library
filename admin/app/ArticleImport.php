<?php

namespace MarkerContent\admin\app;
/**
 * The ArticleImport class is  responsible for importing articles into your blog posts .
 */

class ArticleImport
{
    public function __construct()
    {

    }

    //the article comes from api the data is valid
    public function importArticle($article)
    {

        $wordpress_post = array(
            'post_title' => $article->title,
            'post_content' => $article->sanitized_rich_text,
            'post_status' => 'publish',
            'post_author' => 1,
            'post_type' => 'post',
            'meta_input' => ['market_id' => $article->id]
        );
        wp_insert_post($wordpress_post);
    }

    public function importedArticlesIds()
    {
        $query_args = array(
            'post_type' => 'post',
            'posts_per_page' => -1,
            'meta_key' => 'market_id',
        );
        $my_posts = get_posts($query_args);
        if ($my_posts) {
            $ids = array_map(fn($post) => get_post_meta($post->ID)["market_id"][0], $my_posts);
            wp_reset_postdata();
            return array_unique($ids);
        } else {
            wp_reset_postdata();
            return false;
        }
    }

}