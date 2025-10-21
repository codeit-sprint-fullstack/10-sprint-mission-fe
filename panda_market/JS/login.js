const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' },
];

const emailInput = document.getElementById('email_input');
const passwordInput = document.getElementById('password_input');
const loginButton = document.querySelector('.login_button');

loginButton.disabled = true;

function validateEmail() {
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === '') {
    emailInput.style.border = '2px solid red';
    emailInput.nextElementSibling.textContent =
      '이메일은 필수 입력 사항입니다.';
    return false;
  } else if (!emailRegex.test(emailValue)) {
    emailInput.style.border = '2px solid red';
    emailInput.nextElementSibling.textContent = '잘못된 이메일 형식입니다.';
    return false;
  } else {
    emailInput.style.border = '';
    emailInput.nextElementSibling.textContent = '';
    return true;
  }
}

function validatePassword() {
  const passwordValue = passwordInput.value.trim();
  if (passwordValue === '') {
    passwordInput.style.border = '2px solid red';
    passwordInput.nextElementSibling.textContent =
      '비밀번호는 필수 입력 사항입니다.';
    return false;
  } else if (passwordInput.value.length < 8) {
    passwordInput.style.border = '2px solid red';
    passwordInput.nextElementSibling.textContent =
      '비밀번호는 최소 8자 이상이어야 합니다.';
    return false;
  } else {
    passwordInput.style.border = '';
    passwordInput.nextElementSibling.textContent = '';
    return true;
  }
}

function validateForm() {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isEmailValid && isPasswordValid) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

function handleLogin(event) {
  event.preventDefault();

  const user = USER_DATA.find((u) => u.email === emailInput.value);

  if (!user) {
    alert('존재하지 않는 이메일입니다.');
    return;
  }

  if (user.password !== passwordInput.value) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  alert('로그인 성공!');
  window.location.href = './items.html';
}

loginButton.addEventListener('click', handleLogin);

emailInput.addEventListener('focusout', () => {
  validateEmail();
});

passwordInput.addEventListener('focusout', () => {
  validatePassword();
  validateForm();
});

loginButton.addEventListener('click', handleLogin);
