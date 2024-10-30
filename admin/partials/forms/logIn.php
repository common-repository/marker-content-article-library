<?php ?>
    <div class="login-form-wrapper form-wrapper">
        <?php require esc_html( __DIR__ . "/../icons/markercontent.php" ); ?>
        <h2><?php esc_html_e( 'Log in', $this->plugin_name ); ?></h2>
        <div class="markercontent_add_user_meta_form">

            <form action="<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>"
                  method="post" id="markercontent_logIn_form" class="login-form">

                <input type="hidden" name="action" value="<?php echo esc_attr( 'markercontent_user_logIn' ); ?>">
                <div>
                    <br>
                    <label for="<?php echo esc_attr( $this->plugin_name ); ?>-email"> <?php esc_html_e( 'Enter your email ', $this->plugin_name ); ?> </label><br>
                    <input required id="<?php echo esc_attr( $this->plugin_name ); ?>-email" type="email"
                           name="<?php echo esc_attr( "userInfo" ); ?>[email]" value=""
                           placeholder="<?php esc_html_e( 'Email', $this->plugin_name ); ?>"/><br>
                </div>
                <div>
                    <label for="<?php echo esc_attr( $this->plugin_name ); ?>-password"> <?php esc_html_e( 'Enter your password ', $this->plugin_name ); ?> </label><br>
                    <input required id="<?php echo esc_attr( $this->plugin_name ); ?>-user-log-in-password" type="password"
                           name="<?php echo esc_attr( "userInfo" ); ?>[password]" value=""
                           placeholder="<?php esc_html_e( 'Password', $this->plugin_name ); ?>"/><br>
                </div>
                <span class="forgotPass form-switch-left"><?php esc_html_e( 'Forgot your password?', $this->plugin_name ); ?></span>
                <input type="hidden" name="<?php echo esc_attr( "userInfo" ); ?>[app_type]" value="wordpress">
                <?php submit_button( esc_html__( 'Submit', $this->plugin_name ) ); ?>

                <div class="markercontent_form_feedback">
                    <span class="answer"></span>
                </div>
            </form>
            <br/><br/>
            <div class="form-switch-right ">
                <span class="form-switch-text"> <?php esc_html_e( "Don't have an account?", $this->plugin_name ); ?></span>
                <span><?php esc_html_e( "Sign up", $this->plugin_name ); ?></span>
            </div>
        </div>
    </div>

<?php
