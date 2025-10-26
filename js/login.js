document.addEventListener("DOMContentLoaded", function () {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const loginBtn = document.getElementById("login-btn");
  const form = document.getElementById("login-form");

  // 눈 아이콘
  document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", () => {
      const targetId = icon.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (input.type === "password") {
        input.type = "text";
        icon.src = "../image/ic_eye_on.svg";
      } else {
        input.type = "password";
        icon.src = "../image/ic_eye_off.svg";
      }
    });
  });

  // 폼이 '완전 비어있는' 상태인지
  function isFormPristine() {
    const e = (email.value || "").trim();
    const p = password.value || "";
    return e.length === 0 && p.length === 0;
  }

  /* ---------------------------
   * 판단용(메시지 X) - 버튼 활성화 전용
   * --------------------------- */
  function isEmailValid_silent() {
    return Val.isEmail((email.value || "").trim());
  }
  function isPwValid_silent() {
    return Val.isMinLength(password.value || "", 8);
  }
  function refreshButton() {
    const ok = isEmailValid_silent() && isPwValid_silent();
    loginBtn.disabled = !ok;
    loginBtn.classList.toggle("btn-disabled", !ok);
  }

  /* ---------------------------
   * 표시용(메시지 O) - blur/submit에서 사용
   * --------------------------- */
  function validateEmail_show() {
    const value = (email.value || "").trim();
    if (!Val.isNonEmpty(value)) {
      Val.showError(email, "이메일을 입력해주세요.");
      return false;
    }
    if (!Val.isEmail(value)) {
      Val.showError(email, "잘못된 이메일 형식입니다.");
      return false;
    }
    Val.clearError(email);
    return true;
  }

  function validatePassword_show() {
    const value = (password.value || "").trim();
    if (!Val.isNonEmpty(value)) {
      Val.showError(password, "비밀번호를 입력해주세요.");
      return false;
    }
    if (!Val.isMinLength(value, 8)) {
      Val.showError(password, "비밀번호를 8자 이상 입력해주세요.");
      return false;
    }
    Val.clearError(password);
    return true;
  }

  // ✅ blur: 폼이 비었으면 에러 전부 지우고 끝 (초기 상태 유지)
  email.addEventListener("blur", () => {
    if (isFormPristine()) {
      Val.clearError(email);
      Val.clearError(password);
      return;
    }
    validateEmail_show();
  });
  password.addEventListener("blur", () => {
    if (isFormPristine()) {
      Val.clearError(email);
      Val.clearError(password);
      return;
    }
    validatePassword_show();
  });

  // input: 버튼만 갱신 + 비거나 유효해지면 에러 제거
  email.addEventListener("input", () => {
    const v = (email.value || "").trim();
    if (!v || Val.isEmail(v)) Val.clearError(email); // 비면 초기화, 맞으면 제거
    refreshButton();
  });

  password.addEventListener("input", () => {
    const v = password.value || "";
    if (!v || Val.isMinLength(v, 8)) Val.clearError(password);
    refreshButton();
  });

  // submit: 최종 표시용 검증 후 이동
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const ok = validateEmail_show() && validatePassword_show();
    refreshButton();
    if (ok) {
      location.href = "/items"; // 필요시 경로를 '/pages/items.html'로 변경
    }
  });

  // 초기 상태
  refreshButton();
});
