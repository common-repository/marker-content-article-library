<?php ?>
    <div class="register-form-wrapper form-wrapper move-right">
        <?php require(esc_attr(__DIR__ . "/../popUp.php")); ?>
        <?php require(esc_attr(__DIR__ . "/../icons/markercontent.php")); ?>
        <h2><?php esc_html_e('Registration', $this->plugin_name); ?></h2>
        <div class="markercontent_add_user_meta_form">
            <form action="<?php echo esc_url(admin_url('admin-ajax.php')); ?>" method="post"
                  id="markercontent_add_user_meta_form" class="register-form" name="register-form">

                <input type="hidden" name="action" value="markercontent_user_registration">
                <div>
                    <br>
                    <label for="<?php echo esc_attr($this->plugin_name); ?>-first-name"><?php esc_html_e('Enter first name ', $this->plugin_name); ?></label><br>
                    <input required id="<?php echo esc_attr($this->plugin_name); ?>-first-name" type="text"
                           name="<?php echo esc_attr("userInfo"); ?>[first_name]" value=""
                           placeholder="<?php esc_html_e('First name', $this->plugin_name); ?>"/><br>
                </div>
                <div>
                    <label for="<?php echo esc_attr($this->plugin_name); ?>-last-name"><?php esc_html_e('Enter last name', $this->plugin_name); ?></label><br>
                    <input required id="<?php echo esc_attr($this->plugin_name); ?>-last-name" type="text"
                           name="<?php echo esc_attr("userInfo"); ?>[last_name]" value=""
                           placeholder="<?php esc_html_e('Last name', $this->plugin_name); ?> "/><br>
                </div>
                <div>
                    <label for="<?php echo esc_attr($this->plugin_name); ?>-email"><?php esc_html_e('Enter your Email ', $this->plugin_name); ?></label><br>
                    <input required id="<?php echo esc_attr($this->plugin_name); ?>-email" type="email"
                           name="<?php echo esc_attr("userInfo"); ?>[email]" value=""
                           placeholder="<?php esc_html_e('Email', $this->plugin_name); ?>"/><br>
                </div>
                <div>
                    <label for="<?php echo esc_attr($this->plugin_name); ?>-user-register-password"><?php esc_html_e('Enter your password ', $this->plugin_name); ?></label><br>
                    <input required id="<?php echo esc_attr($this->plugin_name); ?>-user-register-password" type="password"
                           name="<?php echo esc_attr("userInfo"); ?>[password]" value=""
                           placeholder="<?php esc_html_e('password', $this->plugin_name); ?>" minlength="6"/><br>
                </div>
                <div>
                    <label for="<?php echo esc_attr($this->plugin_name); ?>-user-register-confirm-password"><?php esc_html_e('Confirm Password', $this->plugin_name); ?></label><br>
                    <input required id="<?php echo esc_attr($this->plugin_name); ?>-user-register-confirm-password"
                           type="password"
                           name="<?php echo esc_attr("userInfo"); ?>[password_confirmation]" value=""
                           placeholder="<?php esc_html_e('Confirm Password', $this->plugin_name); ?>" minlength="6"/><br>
                </div>
                <br/><br/>
                <label class="flex">
                        <span class="block text-sm ml-2"><?php esc_html_e('By registering your email, you agree to our', $this->plugin_name); ?>
                            <a class="text-green-400" href="https://www.markercontent.com/terms-of-use"
                               target="_blank"><?php esc_html_e('Terms of Use', $this->plugin_name); ?></a>
                            <?php _e(', and', $this->plugin_name); ?>
                            <a class="text-green-400" href="https://www.markercontent.com/privacy-policy"
                               target="_blank"><?php esc_html_e('Privacy Policy', $this->plugin_name); ?></a>
                        </span>
                </label>
                <br/><br/>
                <div>
                </div>
                <input type="hidden" name="<?php echo esc_attr( "userInfo"); ?>[app_type]" value="wordpress">

                <?php submit_button('Submit','button-primary registerSubmit'); ?>

                <div class="markercontent_form_feedback">
                    <span class="answer"></span>
                </div>
                <!--                    --><?php //settings_fields('marketDefaultOptionsApi-settings-group') ?>
            </form>
            <div class="form-switch-right">
                <span class="form-switch-text"> <?php esc_html_e("Already registered?", $this->plugin_name) ?></span>
                <span><?php esc_html_e("Log in", $this->plugin_name) ?></span>
            </div>
        </div>
    </div>
<?php
