const emailInput = document.querySelector(".email-input");
const emailBox = document.querySelector(".email-label");
const passwordInput = document.querySelector(".password-input");
const passwordBox = document.querySelector(".password-label");

const loginButton = document.querySelector("#loginButton");

// 이메일 input에서 focus out 할 때, 값이 없을 경우 input에 빨강색 테두리와 아래에 “이메일을 입력해주세요.” 빨강색 에러 메세지를 보입니다.
// 이메일 input에서 focus out 할 때, 이메일 형식에 맞지 않는 경우 input에 빨강색 테두리와 아래에 “잘못된 이메일 형식입니다” 빨강색 에러 메세지를 보입니다.
function checkEmail(e) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorMessage = document.createElement("p");
  const oldMessage = document.querySelector(".errorMessage");

  if (oldMessage) {
    oldMessage.remove();
  }
  if (e.target.value == "") {
    errorMessage.textContent = "이메일을 입력해주세요.";
    emailBox.append(errorMessage);
    errorMessage.classList.add("errorMessage");
  } else if (!emailPattern.test(e.target.value)) {
    errorMessage.textContent = "잘못된 이메일 형식입니다.";
    emailBox.append(errorMessage);
    errorMessage.classList.add("errorMessage");
  }
}

// 비밀번호 input에서 focus out 할 때, 값이 없을 경우 아래에 “비밀번호를 입력해주세요.” 에러 메세지를 보입니다
// 비밀번호 input에서 focus out 할 때, 값이 8자 미만일 경우 아래에 “비밀번호를 8자 이상 입력해주세요.” 에러 메세지를 보입니다.

function checkpassword(e) {
  const errorMessage = document.createElement("p");
  const oldMessage = document.querySelector(".errorMessage");
  const inputValue = e.target.value.trim();
  console.log("hi pasword");
  if (oldMessage) {
    oldMessage.remove();
  }

  if (inputValue == "") {
    errorMessage.textContent = "비밀번호를 입력해주세요.";
    passwordBox.append(errorMessage);
    errorMessage.classList.add("errorMessage");
  } else if (inputValue.length < 8) {
    errorMessage.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordBox.append(errorMessage);
    errorMessage.classList.add("errorMessage");
  }
}

//  input 에 빈 값이 있거나 에러 메세지가 있으면  ‘로그인’ 버튼은 비활성화 됩니다.
// Input 에 유효한 값을 입력하면  ‘로그인' 버튼이 활성화 됩니다. 활성화된 ‘로그인’ 버튼을 누르면  “/items” 로 이동합니다
function login() {
  if (!(emailInput.value && passwordInput.value)) {
    console.log("로그인 실패");
    loginButton.disabled = true;
  } else {
    console.log("로그인 성공");
    window.location.replace("items.html");
  }
}
// 노드에 이벤트 리스너 연결 이메일 input에서 focus out 할 때,
emailInput.addEventListener("focusout", checkEmail);
passwordInput.addEventListener("focusout", checkpassword);
loginButton.addEventListener("click", login);
