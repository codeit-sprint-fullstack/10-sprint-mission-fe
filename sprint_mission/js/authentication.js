// ================== 네임스페이스에서 필요한 함수만 꺼내 쓰기(나중에 잘 모르겠으면 '구조분해' 복습) ==================//

document.addEventListener("DOMContentLoaded", () => {
  const {
    cleanInput,
    formHasError,
    changeButtonLooking,
    checkEmailInput,
    checkPasswordInput,
    checkNicknameInput,
    checkConfirmPasswordInput,
  } = window.Validation || {};

  const { openModal } = (window.Modal || {});

  // 방어 코드: 로드 실패 시 콘솔에서 바로 확인
  if (!cleanInput || !openModal) {
    console.error("[auth] Validation/Modal 스크립트가 아직 준비되지 않았습니다.");
    return;
  }
});

//============================== DB==============================//
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];


//============================== 페이지 초기화 ==============================//

function setupAuthenticationForm(rootEl) {
  const form = rootEl.querySelector(".authentication-form");
  if (!form) return;  // 폼 찾기

  const emailField = form.querySelector(".authentication-email");
  const passwordField =  form.querySelector(".authentication-password");
  const submitButton = form.querySelector(".authentication-btn");  // 이메일, 비번, 버튼 필드 찾기

  const signupField = rootEl.classList.contains("signup");
  const nicknameField = signupField ? form.querySelector(".authentication-nickname") : null;  // 회원가입에 있는 필드 찾기

  const passwordGroups = form.querySelectorAll(".authentication-password");
  const passwordConfirmField = signupField && passwordGroups.length > 1 ? passwordGroups[1] : null;  // 비밀번호 확인 필드 찾기

  emailField?.querySelector("input")?.setAttribute("required", "true");
  passwordField?.querySelector('input[type="password"]')?.setAttribute("required", "true");
  nicknameField?.querySelector("input")?.setAttribute("required", "true");
  passwordConfirmField?.querySelector('input[type="password"]')?.setAttribute("required", "true");  // 각 필드의 input에 required 속성 추가 (required="true")

  emailField?.querySelector("input")?.addEventListener("blur", () => {
    checkEmailInput(emailField);
    changeButtonLooking(submitButton, formHasError(form));
  });

   passwordField?.querySelector('input[type="password"]')?.addEventListener("blur", () => {
    checkPasswordInput(passwordField);
    changeButtonLooking(submitButton, formHasError(form));
  });

  nicknameField?.querySelector("input")?.addEventListener("blur", () => {
    checkNicknameInput(nicknameField);
    changeButtonLooking(submitButton, formHasError(form));
  });

  passwordConfirmField?.querySelector('input[type="password"]')?.addEventListener("blur", () => {
    checkConfirmPasswordInput(passwordConfirmField, passwordField);
    changeButtonLooking(submitButton, formHasError(form));
  });  // 사용자 입력 > blur > check함수 실행 > 버튼 활성⦁비활성

  form.addEventListener("input", () => {
    changeButtonLooking(submitButton, formHasError(form));
  });  // 에러 있는 상태 > 사용자가 타이핑 > 에러확인 함수 > 버튼 활성화

  changeButtonLooking(submitButton, true);  // 초기 버튼 비활성화

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validEmail = emailField ? checkEmailInput(emailField) : true;
    const validPw = passwordField ? checkPasswordInput(passwordField) : true;
    const validNickname = nicknameField ? checkNicknameInput(nicknameField) : true;
    const validPwConfirm = passwordConfirmField
      ? checkConfirmPasswordInput(passwordConfirmField, passwordField)
      : true;

    const isFormValid = validEmail && validPw && validNickname && validPwConfirm;

    changeButtonLooking(submitButton, !isFormValid);
    if (!isFormValid) return;

    const typeEmail = cleanInput(emailField.querySelector("input")?.value || "");
    const typePassword = cleanInput(passwordField.querySelector('input[type="password"], input[type="text"]')?.value || "");

    if (rootEl.classList.contains("login")) {
      let foundUser = null;
      for (let i = 0; i < USER_DATA.length; i++) {
        if (USER_DATA[i].email === typeEmail) {
          foundUser = USER_DATA[i];
          break;
        }
      }

      if (foundUser === null) {
        openModal("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (foundUser.password !== typePassword) {
        openModal("비밀번호가 일치하지 않습니다.");
        return;  
      }

      window.location.assign("/items");
     } else if (rootEl.classList.contains("signup")) {
      let overlapping = false;
      for (let i = 0; i < USER_DATA.length; i++) {
        if (USER_DATA[i].email === typeEmail) {
          overlapping = true;
          break;
        }
      }

      if (overlapping) {
        openModal("사용 중인 이메일입니다.");
        return;
      }

      window.location.assign("/login");
     }
  });  // submit 이벤트

  form.querySelectorAll(".authentication-password .visibility-icon").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const container = btn.closest(".authentication-password");
      const input = container?.querySelector('input[type="password"], input[type="text"]');
      if (!input) return;
      const isPw = input.type === "password";
      input.type = isPw ? "text" : "password";
      const img = btn.querySelector("img");
      if (img) img.alt = isPw ? "비밀번호 숨기기" : "비밀번호 표시";
    });
  });  // 눈 이미지 눌러서 비밀번호 토글
}


//============================== DOM 요소들 로드 후 JS 실행 ==============================//

document.addEventListener("DOMContentLoaded", () => {
  const loginPage = document.querySelector("main.login");
  const signupPage = document.querySelector("main.signup");
  if (loginPage) setupAuthenticationForm(loginPage);
  if (signupPage) setupAuthenticationForm(signupPage);
});