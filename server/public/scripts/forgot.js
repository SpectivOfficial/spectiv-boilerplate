var errorMsg = document.getElementById('error-msg');
var submitBtn = document.getElementById('submit-btn');
var beforeContent = document.querySelector('.before-reset-content');

function forgotPassword(e) {
  e.preventDefault();
  hideErrorMsg();
  displayLoading();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  if (!username || !email) {
    removeLoading();
    return displayErrorMsg('Username and Email is required.');
  }

  axios({
    method: 'POST',
    url: '/forgot',
    data: {
      username,
      email,
    },
  }).then((res) => {
    removeLoading();
    // displayErrorMsg('Password reset link has been sent to your email.');
    resetSuccessful();
  }).catch((err) => {
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
  submitBtn.innerHTML = 'Reset';
  submitBtn.disabled = false;
}

function resetSuccessful() {
  beforeContent.style.opacity = '0';
  setTimeout(() => {
    beforeContent.innerHTML = '<img alt="Forgot Image" class="forgot-img" src="/static/images/confirmpw.svg" /><h4 class="success-msg">Password reset link has been sent to your email.</h4>';
    beforeContent.style.opacity = '1';
  }, 300);
}
