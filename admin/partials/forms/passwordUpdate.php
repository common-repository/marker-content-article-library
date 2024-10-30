<?php ?>
    <div class="passwordRestore-form-wrapper form-wrapper move-left">
        <h2><?php esc_html_e('Password Restore', $this->plugin_name); ?></h2>
        <div class="markercontent_add_user_meta_form">

            <form action="<?php echo esc_url(admin_url('admin-ajax.php')) ?>"
                  method="post" id="markercontent_passwordRestore_form" class="passwordRestore-form">

                <input type="hidden" name="action" value="markercontent_password_restore">
                <div>
                    <br>
                    <label for="<?php echo esc_attr($this->plugin_name); ?>-email"> <?php esc_html_e('Enter your email ', $this->plugin_name); ?> </label><br>
                    <input required id="<?php echo esc_attr($this->plugin_name); ?>-email" type="email"
                           name="<?php echo esc_attr("userInfo"); ?>[email]" value=""
                           placeholder="<?php esc_attr_e('Email', $this->plugin_name); ?>"/><br>
                </div>
                <input type="hidden" name="<?php echo esc_attr("userInfo"); ?>[app_type]" value="wordpress">
                <?php submit_button('Submit'); ?>

                <div class="markercontent_form_feedback">
                    <span class="answer"></span>
                </div>
            </form>
            <br/><br/>
            <div class="form-switch-left">
                <span class="form-switch-text"> <?php esc_html_e("return to", $this->plugin_name) ?></span>
                <span><?php esc_html_e("log in ", $this->plugin_name) ?></span>
            </div>
        </div>
    </div>
<?php
