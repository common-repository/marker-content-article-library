(function ($) {
    'use strict';

    /**
     * When the window is loaded:
     * $( window ).load(function() {
     * });
     **/

    $(function () {
        const body = document.querySelector('body')
        const logInForm = document.querySelector('.login-form')
        const registerForm = document.querySelector('.register-form')
        const registerSubmitButton= document.querySelector('.registerSubmit')
        const restoreForm = document.querySelector('.passwordRestore-form')
        const formSwitchesRight = document.querySelectorAll('.form-switch-right')
        const formSwitchesLeft = document.querySelectorAll('.form-switch-left')
        const loginFormWrapper = document.querySelector('.login-form-wrapper')
        const registerFormWrapper = document.querySelector('.register-form-wrapper')
        const forgotPass= document.querySelector('.passwordRestore-form-wrapper')
        const subscribePopUp = document.querySelector('.subscribePopup')
        const popUpWrapper=$(".popUpWrapper");
        const modalCloaseButton=document.querySelector('.modalClose')
        const newsSubscription=document.querySelector('.newsSubscription')


        if (logInForm) {
            logInForm.addEventListener('submit', (e) => {
                sendform(e)
            })


            restoreForm.addEventListener('submit', (e) => {
                sendform(e)
            })

            registerSubmitButton.addEventListener('click',(e)=>{
                e.preventDefault()
                showModal()
            },{ once: true })

            registerForm.addEventListener('submit', (e) => {
                sendform(e,newsSubscription.checked)
            })

            modalCloaseButton.addEventListener('click',hideModal)

            newsSubscription.addEventListener('change',hideModal)


            formSwitchesRight.forEach(formSwitch => {
                formSwitch.addEventListener('click', (e) => {
                    switchLogInRegisterForm(e)
                });
            })
            formSwitchesLeft.forEach(formSwitch => {
                formSwitch.addEventListener('click', (e) => {
                    switchLogInPasswordReset(e)
                });
            })
        }

        function showModal(){
            subscribePopUp.classList.add('open')
            document.addEventListener('mouseup',outsideClick);
        }

        function hideModal(){
            subscribePopUp.classList.remove('open')
            document.removeEventListener('mouseup',outsideClick);
            document.forms["register-form"].elements['submit'].click()
        }

        function outsideClick (e)
        {
            // if the target of the click isn't the container nor a descendant of the container
            if (!popUpWrapper.is(e.target) && popUpWrapper.has(e.target).length === 0)
            {
                hideModal()
            }
        }



        function throwResponse(CurrentFormAnswer, errorMessage, success=false) {
            let span= CurrentFormAnswer.querySelector('.answer')
            if (span.classList.contains('success') ) span.classList.toggle('success')
            if(success) span.classList.toggle('success')
             span.textContent=errorMessage;
        }

        function switchLogInRegisterForm(e) {
            let curentFormWrapper = e.currentTarget.closest('.form-wrapper');

            if (curentFormWrapper.classList.contains('login-form-wrapper')) {
                curentFormWrapper.classList.toggle('move-left')
                registerFormWrapper.classList.toggle('move-right')
            } else {
                curentFormWrapper.classList.toggle('move-right')
                loginFormWrapper.classList.toggle('move-left')
            }

        }

        function switchLogInPasswordReset(e){
            let curentFormWrapper = e.currentTarget.closest('.form-wrapper');

            if (curentFormWrapper.classList.contains('passwordRestore-form-wrapper')) {
                curentFormWrapper.classList.toggle('move-left')
                loginFormWrapper.classList.toggle('move-right')
            } else {
                curentFormWrapper.classList.toggle('move-right')
                forgotPass.classList.toggle('move-left')
            }
        }

        function sendform(e,isSubscribe=false) {
            e.preventDefault()
            let targetForm=e.currentTarget;

            body.classList.toggle('loader');
            let ajax_form_data = new FormData(e.currentTarget)
            if (ajax_form_data.get('userInfo[password_confirmation]')) {
                if (ajax_form_data.get('userInfo[password_confirmation]') !== ajax_form_data.get('userInfo[password]')) {
                    body.classList.toggle('loader');
                    throwResponse(targetForm,'The passwords don\'t match ');
                    return
                }

                if(isSubscribe){
                    ajax_form_data.append('userInfo[newsletter_subscription]','true')
                }else {
                    ajax_form_data.append('userInfo[newsletter_subscription]','false')
                }
            }


            $.ajax({
                url: params.ajaxurl, // domain/wp-admin/admin-ajax.php
                type: 'post',
                data: ajax_form_data,
                processData: false,
                contentType: false,
            }).done(function (response) {
                body.classList.toggle('loader');
                if(response.hasOwnProperty('message')){
                    throwResponse(targetForm,response.message,true);
                }
                location.reload()
            }).fail(function (error) {
                body.classList.toggle('loader');
                throwResponse(targetForm,error.responseJSON.message);
            })

        }

    });

})(jQuery);
