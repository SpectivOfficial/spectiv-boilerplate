var errorMsg = document.getElementById('error-msg');
var submitBtn = document.getElementById('submit-btn');

function resetPassword(e) {
  e.preventDefault();
  hideErrorMsg();
  displayLoading();

  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  const resetToken = window.location.pathname.split('/')[2];

  if (password !== confirm) {
    removeLoading();
    return displayErrorMsg('Password does not match please try again.');
  }

  if (password.length < 8) {
    removeLoading();
    return displayErrorMsg('Password must be 8 characters or more');
  }

  axios({
    method: 'POST',
    url: `/api/reset/${resetToken}`,
    data: {
      password,
    },
  }).then((res) => {
    window.location = '/login?reset=true';
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
