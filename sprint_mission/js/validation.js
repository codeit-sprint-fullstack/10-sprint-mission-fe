//============================== 범용 상수 & 함수 ==============================//

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;  // 이메일 정규식

const cleanInput = (str) => (str || "").trim();  // null/undefined 에러를 방지하고, 앞뒤 공백도 자동으로 제거

const minimumLetter = (str, min) => cleanInput(str).length >= min;  // 최소 글자수 검사


//============================== error 표시 & 제거 함수 ==============================//

function showErrorMessage(fieldEl, message) {  
  if (!fieldEl) return;
  fieldEl.classList.add("is-error");
  const errMsg = fieldEl.querySelector(".error-message");
  if (errMsg) errMsg.textContent = message || "";
  const input = fieldEl.querySelector("input");
  if (input) input.setAttribute("aria-invalid", "true");
}  // 에러 메시지를 보여주는 함수

function eraseErrorMessage(fieldEl) {
  if (!fieldEl) return;
  fieldEl.classList.remove("is-error");
  const errMsg = fieldEl.querySelector(".error-message");
  if (errMsg) errMsg.textContent = "";
  const input = fieldEl.querySelector("input");
  if (input) input.removeAttribute("aria-invalid");
}  // 에러 메시지를 없애주는 함수


//============================== 버튼 활성⦁비활성을 위한 함수 ==============================//

function formHasError(formEl) {
  const alreadyHasError = formEl.querySelector(".is-error") !== null;
  const hasEmptyInput = Array.from(formEl.querySelectorAll("input[required]")).some((input) => cleanInput(input.value) === "");
  return alreadyHasError || hasEmptyInput;
}  // 폼에 에러가 있거나 input이 비었는지 확인하는 함수

function changeButtonLooking(buttonEl, disabled) {
  if (!buttonEl) return;
  buttonEl.disabled = Boolean(disabled);
  buttonEl.style.backgroundColor = disabled ? "var(--Secondary-400)" : "var(--Primary-100)";
  buttonEl.style.cursor = disabled ? "not-allowed" : "pointer";
  buttonEl.setAttribute("aria-disabled", disabled ? "true" : "false"); 
}  // 비활성일 때 버튼 모습을 바꿔주는 함수


//============================== 이메일 & 비밀번호 필드 검증 ==============================//

function checkEmailInput(fieldEl) {
  const input = fieldEl?.querySelector("input");
  const value = input ? cleanInput(input.value) : "";

  if (!value) {
    showErrorMessage(fieldEl, "이메일을 입력해주세요.");
    return false;
  }
  if (!EMAIL_REGEX.test(value)) {
    showErrorMessage(fieldEl, "잘못된 이메일 형식입니다.");
    return false;
  }
  eraseErrorMessage(fieldEl);
  return true;
}  // 빈칸과 이메일 형식 여부 검증

function checkPasswordInput(fieldEl) {
  const input = fieldEl?.querySelector('input[type="password"], input[type="text"]');
  const value = input ? cleanInput(input.value) : "";

  if (!value) {
    showErrorMessage(fieldEl, "비밀번호를 입력해주세요.");
    return false;
  }
  if (!minimumLetter(value, 8)) {
    showErrorMessage(fieldEl, "비밀번호를 8자 이상 입력해주세요.");
    return false;
  }
  eraseErrorMessage(fieldEl);
  return true;
}  // 빈칸과 8자이상 여부 검증

function checkNicknameInput(fieldEl) {
  const input = fieldEl?.querySelector("input");
  if (!input) return true;
  const value = cleanInput(input.value);
  if (!value) {
    showErrorMessage(fieldEl, "닉네임을 입력해주세요.");
    return false;
  }
  eraseErrorMessage(fieldEl);
  return true;
}  // (요구사항에는 없지만) 닉네임 입력 여부 검증

function checkConfirmPasswordInput(fieldEl, passwordFieldEl) {
  const input = fieldEl?.querySelector('input[type="password"], input[type="text"]');
  const pwInput = passwordFieldEl?.querySelector('input[type="password"], input[type="text"]');

  const value = cleanInput(input.value);
  const pwvalue = cleanInput(pwInput.value);

  if (value !== pwvalue) {
    showErrorMessage(fieldEl, "비밀번호가 일치하지 않습니다.");
    return false;
  }
  eraseErrorMessage(fieldEl);
  return true;
}  // 비번 확인 일치 여부 검증


// 전역 네임스페이스로 내보내기!
window.Validation = {
  EMAIL_REGEX,
  cleanInput,
  minimumLetter,
  showErrorMessage,
  eraseErrorMessage,
  formHasError,
  changeButtonLooking,
  checkEmailInput,
  checkPasswordInput,
  checkNicknameInput,
  checkConfirmPasswordInput,
};