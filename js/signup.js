document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");
  const email = document.getElementById("email");
  const pw = document.getElementById("password");
  const pw2 = document.getElementById("passwordConfirm");
  const signupBtn = document.getElementById("signup-btn");

  /* ---------------------------
   * 비밀번호 눈 아이콘 (미션2)
   * --------------------------- */
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
    const p1 = pw.value || "";
    const p2 = pw2.value || "";
    return e.length === 0 && p1.length === 0 && p2.length === 0;
  }

  /* ---------------------------
   * ① 판단용(silent) - 버튼 활성화 전용
   * --------------------------- */
  function isEmailValid_silent() {
    return Val.isEmail((email.value || "").trim());
  }
  function isPwValid_silent() {
    return Val.isMinLength(pw.value || "", 8);
  }
  function isPw2Valid_silent() {
    const v1 = pw.value || "";
    const v2 = pw2.value || "";
    return v2.length > 0 && v1 === v2;
  }
  function refreshButton() {
    const ok =
      isEmailValid_silent() && isPwValid_silent() && isPw2Valid_silent();
    signupBtn.disabled = !ok;
    signupBtn.classList.toggle("btn-disabled", !ok);
  }

  /* ---------------------------
   * ② 표시용(show) - blur/submit용
   * --------------------------- */
  function validateEmail_show() {
    const v = (email.value || "").trim();
    if (!Val.isNonEmpty(v)) {
      Val.showError(email, "이메일을 입력해주세요.");
      return false;
    }
    if (!Val.isEmail(v)) {
      Val.showError(email, "잘못된 이메일 형식입니다.");
      return false;
    }
    Val.clearError(email);
    return true;
  }

  function validatePassword_show() {
    const v = (pw.value || "").trim();
    if (!Val.isNonEmpty(v)) {
      Val.showError(pw, "비밀번호를 입력해주세요.");
      return false;
    }
    if (!Val.isMinLength(v, 8)) {
      Val.showError(pw, "비밀번호를 8자 이상 입력해주세요.");
      return false;
    }
    Val.clearError(pw);
    return true;
  }

  function validatePasswordConfirm_show() {
    const v1 = (pw.value || "").trim();
    const v2 = (pw2.value || "").trim();
    if (!Val.isNonEmpty(v2)) {
      Val.showError(pw2, "비밀번호를 다시 입력해주세요.");
      return false;
    }
    if (v1 !== v2) {
      Val.showError(pw2, "비밀번호가 일치하지 않습니다.");
      return false;
    }
    Val.clearError(pw2);
    return true;
  }

  // ✅ blur: 폼이 모두 비었으면 에러 전부 지우고 종료
  email.addEventListener("blur", () => {
    if (isFormPristine()) {
      Val.clearError(email);
      Val.clearError(pw);
      Val.clearError(pw2);
      return;
    }
    validateEmail_show();
  });
  pw.addEventListener("blur", () => {
    if (isFormPristine()) {
      Val.clearError(email);
      Val.clearError(pw);
      Val.clearError(pw2);
      return;
    }
    validatePassword_show();
  });
  pw2.addEventListener("blur", () => {
    if (isFormPristine()) {
      Val.clearError(email);
      Val.clearError(pw);
      Val.clearError(pw2);
      return;
    }
    validatePasswordConfirm_show();
  });

  // input: 비거나 유효해지면 에러 제거 + 버튼 갱신
  email.addEventListener("input", () => {
    const v = (email.value || "").trim();
    if (!v || Val.isEmail(v)) Val.clearError(email);
    refreshButton();
  });

  pw.addEventListener("input", () => {
    const v = pw.value || "";
    if (!v || Val.isMinLength(v, 8)) Val.clearError(pw);

    // pw 바뀌면 pw2의 일치 상태도 갱신
    const v2 = pw2.value || "";
    if (!v2 || v === v2) Val.clearError(pw2);

    refreshButton();
  });

  pw2.addEventListener("input", () => {
    const v1 = pw.value || "";
    const v2 = pw2.value || "";
    if (!v2 || v1 === v2) Val.clearError(pw2);
    refreshButton();
  });

  // submit: 최종 표시용 검증 후 이동
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const ok =
      validateEmail_show() &&
      validatePassword_show() &&
      validatePasswordConfirm_show();
    refreshButton();
    if (!ok) return;

    const emailVal = (email.value || "").trim();
    const pwVal = pw.value || "";
    const nickVal = (document.getElementById("username")?.value || "").trim();

    if (DB.findByEmail(emailVal)) {
      alert("사용 중인 이메일입니다");
      return;
    }

    DB.addUser({ email: emailVal, password: pwVal, nickname: nickVal });

    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    location.href = "/pages/login.html";
  });
});
