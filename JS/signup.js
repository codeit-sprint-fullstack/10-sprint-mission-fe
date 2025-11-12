//상수 설정
const form = document.querySelector('form[action="signup"]');
const signupBtn = document.getElementById('signupBtn'); 
const emailInput = document.getElementById('email');
const nicknameInput = document.getElementById('nickname');
const passwordInput = document.getElementById('password');
const passwordConfirminput = document.getElementById('passwordconfirm');

//함수 설정
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
  const old = inputEl.parentElement.querySelector('.error-message')
  if (old) old.remove();
}

function validateEmail() {
  const v = emailInput.value.trim();
  if (v === '') {showError(emailInput, '이메일을 입력해주세요.'); return false; }
  if (emailInput.validity.typeMismatch) {showError(emailInput, '잘못된 이메일 형식입니다.'); return false; }
  clearError(emailInput);
  return true;
}

function validateNickname() {
  const v = nicknameInput.value.trim();
  if (v === '') {showError(nicknameInput, '닉네임을 입력해주세요.'); return false; }
  clearError(nicknameInput); return true;
}

function validatePassword () {
  const v = passwordInput.value.trim();
  if (v === '') {showError(passwordInput, '비밀번호를 입력해주세요.'); return false; }
  if (v.length < 8) {showError(passwordInput, '비밀번호 8자 이상을 입력해수제요.'); return false; }
  clearError(passwordInput); return true;
}

function validatePasswordConfirm() {
  const v = passwordConfirminput.value.trim()
  if (v === '') {showError(passwordConfirminput, '비밀번호를 입력해주세요.'); return false; }
  if (v !== passwordInput.value.trim()) {showError(passwordConfirminput, '비밀번호가 일치하지 않습니다.'); return false; }
  clearError(passwordConfirminput); return true;
}

function setButtonState() {
  const ok = validateEmail() && validateNickname() && validatePassword() && validatePasswordConfirm();
  signupBtn.disabled = !ok; 
}

//함수 실행
emailInput.addEventListener('input', setButtonState);
nicknameInput.addEventListener('input', setButtonState)
passwordInput.addEventListener('input',setButtonState);
passwordConfirminput.addEventListener('input', setButtonState);

emailInput.addEventListener('focusout', validateEmail);
nicknameInput.addEventListener('focusout', validateNickname);
passwordInput.addEventListener('focusout', validatePassword);
passwordConfirminput.addEventListener('focusout', validatePasswordConfirm);

form.addEventListener('submit', (e) => {
  const ok = validateEmail() && validateNickname() && validatePassword() && validatePasswordConfirm();
  signupBtn.disabled = !ok;
  if (!ok) e.preventDefault();
});

setButtonState();

//중복 이메일 확인
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();

  const user = USER_DATA.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (user) {
    alert('사용중인 이메일입니다.');
    return;
  }
  window.location.assign('../login/login.html')
});