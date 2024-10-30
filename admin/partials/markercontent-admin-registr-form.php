<?php

/**
 * The form to be loaded on the plugin's admin page
 */

// Build the Form
?>
    <div class="plugin-content-wrapper">
        <?php require(__DIR__ ."/forms/passwordUpdate.php")?>
        <?php require(__DIR__ ."/forms/logIn.php")?>
        <?php require(__DIR__ ."/forms/register.php")?>
    </div>

<?php