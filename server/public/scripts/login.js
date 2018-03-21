var errorMsg = document.getElementById('error-msg');
var submitBtn = document.getElementById('submit-btn');
var resetMsg = document.querySelector('.reset-msg');

function loginUser(e) {
  e.preventDefault();
  hideErrorMsg();
  displayLoading();

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (!username || !password) {
    removeLoading();
    return displayErrorMsg('Username and Password is required.');
  }

  axios({
    method: 'POST',
    url: '/authenticate',
    data: {
      username: username,
      password: password,
    }
  }).then(function(res) {
    var prevAuthRoute = sessionStorage.getItem('prevAuthRoute');
    window.location = prevAuthRoute || '/';
  }).catch(function(err) {
    removeLoading();
    displayErrorMsg(err.response.data.message);
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
  submitBtn.innerHTML = 'Login';
  submitBtn.disabled = false;
}