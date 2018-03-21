var errorMsg = document.getElementById('error-msg');
var submitBtn = document.getElementById('submit-btn');

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function signUpUser(e) {
  e.preventDefault();
  hideErrorMsg();
  displayLoading();

  var email = document.getElementById('email').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    removeLoading();
    return displayErrorMsg('Passwords do not match');
  }

  if (!username) {
    removeLoading();
    return displayErrorMsg('Username is required');
  }

  if (!validateEmail(email)) {
    removeLoading();
    return displayErrorMsg('Not a valid email');
  };

  if (password.length < 8) {
    removeLoading();
    return displayErrorMsg('Password must be 8 characters or more');
  }

  axios({
    url: '/api/sign-up',
    method: 'POST',
    data: {
      email: email,
      username: username,
      password: password,
    }
  }).then(function(res) {
    var prevAuthRoute = sessionStorage.getItem('prevAuthRoute');
    window.location = prevAuthRoute || '/';
  }).catch(function(err) {
    if (typeof err.response.data.err === 'string') {
      removeLoading();
      displayErrorMsg(err.response.data.err);
    } else {
      removeLoading();
      displayErrorMsg(err.response.data.err.errors[0].message);
    }
  });
}

function displayErrorMsg(text) {
  errorMsg.innerHTML = text;
  errorMsg.style.opacity = 1;
  errorMsg.style.transform = 'translateX(0px)';
}

function hideErrorMsg() {
  errorMsg.innerHTML = '';
  errorMsg.style.opacity = 0;
  errorMsg.style.transform = 'translateX(40px)';
}

function displayLoading() {
  submitBtn.innerHTML = '<img src="/static/images/oval.svg" width="30" />';
  submitBtn.disabled = true;
}

function removeLoading() {
  submitBtn.innerHTML = 'Sign Up';
  submitBtn.disabled = false;
}
