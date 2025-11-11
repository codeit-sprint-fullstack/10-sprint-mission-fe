import React, { useEffect, useMemo, useState } from "react";
import "../styles/auth.css";
import "../styles/modal.css";
import USER_DATA from "../../components/Constants"
import { Link } from "react-router-dom";
//이미지
import logo from "../assets/logo/logo.svg";
import googleLogo from "../assets/social/google-logo.png";
import kakaoLogo from "../assets/social/kakao-logo.png";
import eyeInvisible from "../assets/icons/eye-invisible.svg";
import eyeVisible from "../assets/icons/eye-visible.svg";

const errors = {
  emailExists: "이미 가입된 이메일입니다.",
  passwordMisMatch: "이메일 또는 비밀번호가 일치하지 않습니다."
};

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [showPwd, setShowPwd] = useState(false);
  const [showPwdConfirm, setShowPwdConfirm] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNickNameValid, setIsNickNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordConfirmationValid, setIsPasswordConfirmationValid] = useState(false);

  const [showEmailInvalid, setShowEmailInvalid] = useState(false);
  const [showNicknameEmpty, setShowNicknameEmpty] = useState(false);
  const [showPasswordEmpty, setShowPasswordEmpty] = useState(false);
  const [showPasswordShort, setShowPasswordShort] = useState(false);
  const [showPwConfirmInit, setShowPwConfirmInit] = useState(false);
  const [showPwConfirmMismatch, setShowPwConfirmMismatch] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalConfirmHref, setModalConfirmHref] = useState("");

  const isFormValid = useMemo(
    () => 
      isEmailValid && isNickNameValid && isPasswordValid && isPasswordConfirmationValid,
    [isEmailValid, isNickNameValid, isPasswordValid, isPasswordConfirmationValid]
  );

  const validateEmailString = (v) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(v);
  };

  const checkEmailValidity = () => {
    const v = email.trim();
    setIsEmailValid(false);
    setShowEmailInvalid(false);

    if (!v || !validateEmailString(v)) {
      setShowEmailInvalid(true);
    } else {
      setIsEmailValid(true);
    }
  };

  const checkNicknameValidity = () => {
    const v = nickname.trim();
    setIsNickNameValid(false);
    setShowNicknameEmpty(false);

    if (!v) {
      setShowNicknameEmpty(true);
    } else {
      setIsNickNameValid(true);
    }
  };

  const checkPasswordValidity = () => {
    const v = password.trim();
    setIsPasswordValid(false);
    setShowPasswordEmpty(false);
    setShowPasswordShort(false);

    if (!v) {
      setShowPasswordEmpty(true);
    } else if (v.length < 8) {
      setShowPasswordShort(true);
    } else {
      setIsPasswordValid(true);
    }

    checkPasswordConfirmationValidity();

    const checkPasswordConfirmationValidity = () => {
      const v = passwordConfirmation.trim();
      setIsPasswordConfirmationValid(false);
      setShowPwConfirmInit(false);
      setShowPwConfirmMismatch(false);

      if (!isPasswordValid) {
        setShowPwConfirmInit(true);
      } else if (!v || v !== password.trim()) {
        setShowPwConfirmMismatch(true);
      } else {
        setIsPasswordConfirmationValid(true);
      }
    };

    useEffect(() => {
      checkEmailValidity();
      checkNicknameValidity();
      checkPasswordValidity();
      checkPasswordConfirmationValidity();
    }, []);

    const showModal = (message, confirmHref = "") => {
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
        window.location.href = modalConfirmHref;
      } else {
        closeModal();
      }
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
      checkEmailValidity();
      checkNicknameValidity();
      checkPasswordValidity();
      checkPasswordConfirmationValidity();
      if (!isFormValid) return;

      const exists = USER_DATA.some((u) => u.email === email.trim());
      if (exists) {
        showModal(errors.emailExists, "/Login");
      };
      USER_DATA.push({ email: email.trim(), password:password.trim() });
      window.location.href = "/Login"
    };

    return (
    <>
      <main className="auth-container">
        <a href="/" className="logo-home-link" aria-label="홈으로 이동">
          <img src={logo} alt="판다마켓 로고" />
        </a>

        <form id="signupForm" onSubmit={onSubmit}>
          <div className="input-item">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={checkEmailValidity}
              aria-invalid={showEmailInvalid}
            />
            {showEmailInvalid && (
              <span id="emailInvalidError" className="error-message">
                잘못된 이메일 형식입니다
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
              onChange={(e) => setNickname(e.target.value)}
              onBlur={checkNicknameValidity}
              aria-invalid={showNicknameEmpty}
            />
            {showNicknameEmpty && (
              <span id="nicknameEmptyError" className="error-message">
                닉네임을 입력해 주세요
              </span>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="password">비밀번호</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={checkPasswordValidity}
                aria-invalid={showPasswordEmpty || showPasswordShort}
              />
              <button
                type="button"
                className="password-toggle-button"
                aria-label={showPwd ? "비밀번호 숨기기" : "비밀번호 보기"}
                onClick={() => setShowPwd((p) => !p)}
              >
                <img
                  className="password-toggle-icon"
                  src={showPwd ? eyeVisible : eyeInvisible}
                  alt={showPwd ? "비밀번호 표시 상태 아이콘" : "비밀번호 숨김 상태 아이콘"}
                />
              </button>
            </div>
            {showPasswordEmpty && (
              <span id="passwordEmptyError" className="error-message">
                비밀번호를 입력해 주세요
              </span>
            )}
            {showPasswordShort && (
              <span id="passwordInvalidError" className="error-message">
                비밀번호를 8자 이상 입력해 주세요
              </span>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="passwordConfirmation">비밀번호 확인</label>
            <div className="input-wrapper">
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type={showPwdConfirm ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                onInput={checkPasswordConfirmationValidity}
                aria-invalid={showPwConfirmInit || showPwConfirmMismatch}
              />
              <button
                type="button"
                className="password-toggle-button"
                aria-label={showPwdConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
                onClick={() => setShowPwdConfirm((p) => !p)}
              >
                <img
                  className="password-toggle-icon"
                  src={showPwdConfirm ? eyeVisible : eyeInvisible}
                  alt={showPwdConfirm ? "비밀번호 표시 상태 아이콘" : "비밀번호 숨김 상태 아이콘"}
                />
              </button>
            </div>
            {showPwConfirmInit && (
              <span id="passwordConfirmationInitError" className="error-message">
                먼저 조건에 맞는 비밀번호를 입력해 주세요
              </span>
            )}
            {showPwConfirmMismatch && (
              <span id="passwordConfirmationError" className="error-message">
                비밀번호가 일치하지 않습니다
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
          이미 회원이신가요? <a href="/login">로그인</a>
        </div>
      </main>

      {modalOpen && (
        <div id="error-modal" className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <p id="modal-message">{modalMessage}</p>
            <button id="confirm-button" className="confirm-button" onClick={handleModalConfirm}>
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}












































}

