const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const form = document.querySelector('form');
const loginBtn = document.getElementById('loginBtn');

function showError(inputEl, message) {
  clearError(inputEl);

  inputEl.classList.add('error-border');

  const p = document.createElement('p');
  p.className = 'error-message';
  p.textContent = message;

  
  inputEl.parentElement.appendChild(p);
}

function clearError(inputEl) {
  inputEl.classList.remove('error-border');
  const old = inputEl.parentElement.querySelector('.error-message');
  if (old) old.remove();
}

function validateEmail() {
  const value = emailInput.value.trim();

  if (value === '') {
    showError(emailInput, '이메일을 입력해주세요.');
    return false;
  }

  
  if (emailInput.validity.typeMismatch) {
    showError(emailInput, '잘못된 이메일 형식입니다.');
    return false;
  }

  clearError(emailInput);
  return true;
}

function validatePassword() {
  const value = passwordInput.value.trim();

  if (value === '') {
    showError(passwordInput, '비밀번호를 입력해주세요.');
    return false;
  }

  if (value.length < 8) {
    showError(passwordInput, '비밀번호 8자 이상을 입력해주세요.');
    return false;
  }

  clearError(passwordInput);
  return true;
}

function setButtonState() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  const emailOk = emailValue !== '' && emailInput.validity.valid;
  const passwordOk = passwordValue.length >= 8;

  loginBtn.disabled = !(emailOk && passwordOk);
}

import { showErrorModal } from './utils/madal.js';

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

emailInput.addEventListener('input', setButtonState);
passwordInput.addEventListener('input', setButtonState);
emailInput.addEventListener('focusout', validateEmail);
passwordInput.addEventListener('focusout', validatePassword);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showErrorModal('이메일과 비밀번호를 입력해주세요.');
    return;
  }

  const user = USER_DATA.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    showErrorModal('비밀번호가 일치하지 않습니다.');
    return;
  }

  window.location.assign('/items');
});

setButtonState();
