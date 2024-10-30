<?php
?>
    <div class="subscribePopup">
        <div class="popUpWrapper">
            <input type="checkbox" class="newsSubscription" id="scales"
                   name="<?php  echo esc_attr("userInfo"); ?>[newsletter_subscription]" >
            <p class="subscribeText"><?php  esc_html_e('Get the content you need, delivered straight to your inbox.
Receive updates on newly published, business-relevant articles and content marketing insights. You won’t regret it, promise.', $this->plugin_name); ?></p>
            <div class="modalClose">
                <?php require(__DIR__ . "/icons/cloase.php") ?>
            </div>
        </div>
    </div>
<?php

