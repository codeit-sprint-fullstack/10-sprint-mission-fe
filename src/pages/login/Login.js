import React, { useMemo, useState } from "react";
import "../../styles/auth.css";
import "../../components/modal/modal.css";
import USER_DATA from "../../components/Constants";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import googleLogo from "../../assets/social/google-logo.png";
import kakaoLogo from "../../assets/social/kakao-logo.png";
import eyeInvisible from "../../assets/icons/eye-invisible.svg";
import eyeVisible from "../../assets/icons/eye-visible.svg";

const PASSWORD_MIN_LENGTH = 8;

const messages = {
  emailEmpty: "이메일을 입력해주세요",
  emailInvalid: "잘못된 이메일 형식입니다",
  passwordEmpty: "비밀번호를 입력해 주세요",
  passwordShort: `비밀번호를 ${PASSWORD_MIN_LENGTH}자 이상 입력해 주세요`,
  passwordMismatch: "이메일 또는 비밀번호가 일치하지 않습니다.",
};

const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalConfirmHref, setModalConfirmHref] = useState("");

  const navigate = useNavigate();

  const isFormValid = useMemo(() => {
    return (
      email.trim() &&
      password.trim() &&
      !emailError &&
      !passwordError
    );
  }, [email, emailError, password, passwordError]);

  const validateEmail = (value = email) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setEmailError(messages.emailEmpty);
      return false;
    }
    if (!emailRegex.test(trimmed)) {
      setEmailError(messages.emailInvalid);
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value = password) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setPasswordError(messages.passwordEmpty);
      return false;
    }
    if (trimmed.length < PASSWORD_MIN_LENGTH) {
      setPasswordError(messages.passwordShort);
      return false;
    }
    setPasswordError("");
    return true;
  };

  const openModal = (message, confirmHref = "") => {
    setModalMessage(message);
    setModalConfirmHref(confirmHref);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMessage("");
    setModalConfirmHref("");
  };

  const handleModalConfirm = () => {
    if (modalConfirmHref) {
      navigate(modalConfirmHref);
    }
    closeModal();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    if (!validEmail || !validPassword) return;

    const user = USER_DATA.find((u) => u.email === email.trim());
    if (!user || user.password !== password.trim()) {
      openModal(messages.passwordMismatch, "/signup");
      return;
    }

    navigate("/items");
  };

  return (
    <>
      <main className="auth-container">
        <Link to="/" className="logo-home-link" aria-label="홈으로 이동">
          <img src={logo} alt="판다마켓 로고" />
        </Link>

        <form id="loginForm" onSubmit={onSubmit}>
          <div className="input-item">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => validateEmail()}
              aria-invalid={Boolean(emailError)}
            />
            {emailError && (
              <span id="emailError" className="error-message">
                {emailError}
              </span>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="password">비밀번호</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() => validatePassword()}
                aria-invalid={Boolean(passwordError)}
              />
              <button
                type="button"
                className="password-toggle-button"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img
                  className="password-toggle-icon"
                  src={showPassword ? eyeVisible : eyeInvisible}
                  alt={
                    showPassword
                      ? "비밀번호 표시 상태 아이콘"
                      : "비밀번호 숨김 상태 아이콘"
                  }
                />
              </button>
            </div>
            {passwordError && (
              <span id="passwordError" className="error-message">
                {passwordError}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="button pill-button full-width"
            disabled={!isFormValid}
          >
            로그인
          </button>
        </form>

        <div className="social-login-container">
          <h3>간편 로그인하기</h3>
          <div className="social-login-links-container">
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="구글 로그인"
            >
              <img src={googleLogo} alt="구글 로그인" width="42" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="카카오톡 로그인"
            >
              <img src={kakaoLogo} alt="카카오톡 로그인" width="42" />
            </a>
          </div>
        </div>

        <div className="auth-switch">
          판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
        </div>
      </main>

      {modalOpen && (
        <div id="error-modal" className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <p id="modal-message">{modalMessage}</p>
            <button
              id="confirm-button"
              className="confirm-button"
              onClick={handleModalConfirm}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
