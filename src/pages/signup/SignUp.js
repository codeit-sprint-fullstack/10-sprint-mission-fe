import React, { useCallback, useMemo, useState } from "react";
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
  emailInvalid: "잘못된 이메일 형식입니다",
  nicknameEmpty: "닉네임을 입력해 주세요",
  passwordEmpty: "비밀번호를 입력해 주세요",
  passwordShort: `비밀번호를 ${PASSWORD_MIN_LENGTH}자 이상 입력해 주세요`,
  passwordInit: "먼저 조건에 맞는 비밀번호를 입력해 주세요",
  passwordMismatch: "비밀번호가 일치하지 않습니다",
  emailExists: "이미 가입된 이메일입니다.",
  signupSuccess: "회원가입이 완료되었습니다.",
};

const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalConfirmHref, setModalConfirmHref] = useState("");

  const navigate = useNavigate();

  const validateEmail = useCallback(
    (value = email) => {
      const trimmed = value.trim();
      if (!emailRegex.test(trimmed)) {
        setEmailError(messages.emailInvalid);
        return false;
      }
      setEmailError("");
      return true;
    },
    [email]
  );

  const validateNickname = useCallback(
    (value = nickname) => {
      const trimmed = value.trim();
      if (!trimmed) {
        setNicknameError(messages.nicknameEmpty);
        return false;
      }
      setNicknameError("");
      return true;
    },
    [nickname]
  );

  const validatePassword = useCallback(
    (value = password) => {
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
    },
    [password]
  );

  const validatePasswordConfirmation = useCallback(
    (value = passwordConfirmation) => {
      const trimmed = value.trim();
      if (!password.trim()) {
        setPasswordConfirmationError(messages.passwordInit);
        return false;
      }
      if (!trimmed || trimmed !== password.trim()) {
        setPasswordConfirmationError(messages.passwordMismatch);
        return false;
      }
      setPasswordConfirmationError("");
      return true;
    },
    [password, passwordConfirmation]
  );

  const isFormValid = useMemo(() => {
    return (
      !emailError &&
      !nicknameError &&
      !passwordError &&
      !passwordConfirmationError &&
      email.trim() &&
      nickname.trim() &&
      password.trim() &&
      passwordConfirmation.trim()
    );
  }, [
    email,
    emailError,
    nickname,
    nicknameError,
    password,
    passwordConfirmation,
    passwordConfirmationError,
    passwordError,
  ]);

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

    const results = [
      validateEmail(),
      validateNickname(),
      validatePassword(),
      validatePasswordConfirmation(),
    ];

    if (results.includes(false)) return;

    const exists = USER_DATA.some((user) => user.email === email.trim());
    if (exists) {
      openModal(messages.emailExists, "/login");
      return;
    }

    USER_DATA.push({ email: email.trim(), password: password.trim() });
    openModal(messages.signupSuccess, "/login");
  };

  return (
    <>
      <main className="auth-container">
        <Link to="/" className="logo-home-link" aria-label="홈으로 이동">
          <img src={logo} alt="판다마켓 로고" />
        </Link>

        <form id="signupForm" onSubmit={onSubmit}>
          <div className="input-item">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
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
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              onBlur={() => validateNickname()}
              aria-invalid={Boolean(nicknameError)}
            />
            {nicknameError && (
              <span id="nicknameError" className="error-message">
                {nicknameError}
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

          <div className="input-item">
            <label htmlFor="passwordConfirmation">비밀번호 확인</label>
            <div className="input-wrapper">
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type={showPasswordConfirmation ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                onBlur={() => validatePasswordConfirmation()}
                aria-invalid={Boolean(passwordConfirmationError)}
              />
              <button
                type="button"
                className="password-toggle-button"
                aria-label={
                  showPasswordConfirmation
                    ? "비밀번호 숨기기"
                    : "비밀번호 보기"
                }
                onClick={() =>
                  setShowPasswordConfirmation((prev) => !prev)
                }
              >
                <img
                  className="password-toggle-icon"
                  src={showPasswordConfirmation ? eyeVisible : eyeInvisible}
                  alt={
                    showPasswordConfirmation
                      ? "비밀번호 표시 상태 아이콘"
                      : "비밀번호 숨김 상태 아이콘"
                  }
                />
              </button>
            </div>
            {passwordConfirmationError && (
              <span
                id="passwordConfirmationError"
                className="error-message"
              >
                {passwordConfirmationError}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="button pill-button full-width"
            disabled={!isFormValid}
          >
            회원가입
          </button>
        </form>

        <div className="social-login-container">
          <h3>간편 로그인하기</h3>
          <div className="social-login-links-container">
            <a
              href="https://www.google.com/"
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
          이미 회원이신가요? <Link to="/login">로그인</Link>
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
