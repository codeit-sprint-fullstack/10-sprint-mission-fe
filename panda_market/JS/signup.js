console.log('✅ signup.js loaded');

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' },
];

const emailInput = document.getElementById('email_input');
const nicknameInput = document.getElementById('nickname_input');
const passwordInput = document.getElementById('password_input');
const passwordCheckInput = document.getElementById('password-check_input');
const signupButton = document.querySelector('.signup-button');

signupButton.disabled = true;

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

function validateNickname() {
  return true;
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

function validatePasswordCheck() {
  return true;
}

function validateForm() {
  const isEmailValid = validateEmail();
  const isNicknameValid = validateNickname();
  const isPasswordValid = validatePassword();
  const isPasswordCheckValid = validatePasswordCheck();

  if (
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordCheckValid
  ) {
    signupButton.disabled = false;
  } else {
    signupButton.disabled = true;
  }
}

function handleSignup(event) {
  event.preventDefault();

  const existingUser = USER_DATA.find(
    (user) => user.email === emailInput.value
  );

  if (existingUser) {
    alert('이미 가입된 이메일입니다.');
  } else {
    alert('회원가입이 완료되었습니다!');
    USER_DATA.push({ email: emailInput.value, password: passwordInput.value });
    window.location.href = './login.html';
  }
}

emailInput.addEventListener('focusout', () => {
  validateEmail();
});

nicknameInput.addEventListener('focusout', () => {
  validateNickname();
});

passwordInput.addEventListener('focusout', () => {
  validatePassword();
});

passwordCheckInput.addEventListener('focusout', () => {
  validatePasswordCheck();
  validateForm();
});

signupButton.addEventListener('click', handleSignup);

// Question: 지금 현재 마지막 칸에만 validateForm() 이라는 함수를 추가하였다. 헌데 이는 마지막 칸에만 포커스를 잃었을 때 실행하게 되는데,
// 만약 사용자가 이메일이나 닉네임, 비밀번호 순서가 아니라 닉네임이나 비밀번호 확인 칸에 먼저 포커스를 잃는다면
// validateForm()이 바로 실행되지 않아 회원가입 버튼이 활성화되지 않는 문제가 발생할 수 있다.
// 그렇다고 모든 칸에 validateForm()을 추가하는 것은 첫 번째 칸의 focusout 이벤트가 발생하자마자 3번째 칸의 값이 false가 되어
// 에러 메세지가 바로 출력이 되어버기에 이 또한 부자연스러워진다. 어떻게 처리하면 좋을까?
