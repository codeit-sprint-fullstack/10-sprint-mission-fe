// 전역 window.Val 객체
window.Val = {
  // 이메일 형식 검사
  isEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((str || "").trim());
  },

  // 빈 값 아님 검사 (앞뒤 공백 제거 후 길이 > 0)
  isNonEmpty(str) {
    return !!((str || "").trim().length > 0);
  },

  // 최소 길이 검사
  isMinLength(str, n) {
    return (str || "").length >= n;
  },

  // 에러 표시
  showError(inputEl, message) {
    if (!inputEl) return;
    inputEl.classList.add("is-invalid");
    const err = document.getElementById(inputEl.id + "-error");
    if (err) {
      err.textContent = message;
      err.style.display = "block";
    }
  },

  // 에러 숨기기
  clearError(inputEl) {
    if (!inputEl) return;
    inputEl.classList.remove("is-invalid");
    const err = document.getElementById(inputEl.id + "-error");
    if (err) {
      err.textContent = "";
      err.style.display = "none";
    }
  },
};
