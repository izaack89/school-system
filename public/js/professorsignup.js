(function ($) {
  "use strict";


  /*==================================================================
  [ Validate ]*/
  var input = $('.validate-input .input100');

  $('.validate-form').on('submit', function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });


  $('.validate-form .input100').each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
      if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        return false;
      }
    }
    else {
      if ($(input).val().trim() == '') {
        return false;
      }
    }

    if ($(input).attr('type') == 'password' || $(input).attr('name') == 'pass') {
      if ($(input).val().length < 8) {
        return false;
      }
    }
    else {
      if ($(input).val().trim() == '') {
        return false;
      }
    }


    if ($(input).attr('type') == 'text' || $(input).attr('name') == 'name') {
      if ($(input).val().length == 0) {
        return false;
      }
    }
    else {
      if ($(input).val().trim() == '') {
        return false;
      }
    }


    if ($(input).attr('type') == 'text' || $(input).attr('name') == 'last-name') {
      if ($(input).val().length == 0) {
        return false;
      }
    }
    else {
      if ($(input).val().trim() == '') {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
  }



})(jQuery);

$('.js-tilt').tilt({
  scale: 1.1
});

const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector('#name-signup').value.trim();
  const last_name = document.querySelector('#lastname-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (first_name && last_name && email && password) {
    const response = await fetch('/api/professors', {
      method: 'POST',
      body: JSON.stringify({ first_name, last_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/professorsubject');
    } else {
      alert(response.statusText);
    }
  }
};



document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);