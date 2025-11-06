import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/signup.css'
import '../styles/modal.css'
import loginpanda from "../assets/img/loginpanda.svg";
import kakao from "../assets/img/loginkakao.svg"
import google from "../assets/img/logingoogle.svg"

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

function Modal({ open, message, onClose }) {
  if (!open) return null;
  return (
    <div
      id="errorModal"
      className="modal"
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-backdrop" data-close="true" onClick={onClose}></div>
      <div className="modal-panel" role="document">
        <p id="errorModalMessage" className="modal-message">
        {message}
        </p>
        <button
          id="errorModalCloseBtn"
          className="modal-close"
          onClick={onClose}
          >
            확인
          </button>
      </div>
    </div>
  );
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordconfirm: "",
  });

  const [modalOpen, setModalOPen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const clearError = (key) =>
    setErrors((prev) => ({ ...prev, [key]: "" }));
  const setError = (key, msg) =>
    setErrors((prev) => ({ ...prev, [key]: msg }));

  const validateEmail = () => {
    const v = email.trim();
    if (v === "") {
      setError("email", "이메일을 입력해주세요.");
      return false;
    }

    const simpleEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!simpleEmailPattern.test(v)) {
      setError("email", "잘못된 이메일 형식입니다.");
      return false;
    }
    clearError("email");
    return true;
  };

  const validateNickname = () => {
    const v = nickname.trim();
    if (v === "") {
      setError("nickname", "닉네임을 입력해주세요.");
      return false;
    }
    clearError("nickname");
    return true;
  };

  const validatePassword = () => {
    const v = password.trim();
    if (v === "") {
      setError("password", "비밀번호를 입력해주세요.");
      return false;
    }
    if (v.length < 8){
      setError("password", "비밀번호 8자 이상을 입력해주세요.");
      return false;
    }
    clearError("password");
    return true;
  };

  const validatePasswordConfirm = () => {
    const v = passwordConfirm.trim();
    if (v === "") {
      setError("passwordConfirm", "비밀번호를 입력해주세요.");
      return false;
    }
    if (v !== password.trim()) {
      setError("passwordConfirm", "비밀번호가 일치하지 않습니다.");
      return false;
    }
    clearError("passwordConfirm");
    return true;
  };

  const isFromValid = useMemo(() => {
    const okEamil = 
      email.trim() !== ""&& /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const okNick = nickname.trim() !== "";
    const okPw = password.trim() !== "" && password.trim().length >= 8;
    const okPwc = passwordConfirm.trim() !== "" && passwordConfirm === password;
    return okEamil && okNick && okPw && okPwc;
  }, [email, nickname, password, passwordConfirm]);

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setDisabled(!isFromValid);
  }, [isFromValid]);

  const onSubmit = (e) => {
    e.preventDefault();

    const ok = 
    validateEmail() &&
    validateNickname() &&
    validatePassword() &&
    validatePasswordConfirm();

    if (!ok) return;

    const user = USER_DATA.find(
      (u) => e.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (user) {
      setModalMsg("사용중인 이메일입니다.");
      setModalOPen(true);
      return;
    }
    window.location.assign()
  };

  return (
    <>
    <div className="signup-container">
      <div className="header">
        <Link to="/Main.js"><img src={loginpanda} alt="로그인 판다" /></Link>
      </div>
      <span>판다 마켓</span>
    </div>

    <from onSubmit={onSubmit} noValidate>
      <div className="username">
        <label htmlFor="email" className="inputname">
          이메일
        </label>
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          className={`input ${errors.email ? "error-border" : ""}`}
          />
          {errors.email && (
            <p className="error-message">{errors.email}</p>
          )}
      </div>
          <div className="nickname">
            <label htmlFor="nickname" className="inputname">
              닉네임
            </label>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onBlur={validateNickname}
              className={`input ${errors.nickname ? "error-border" : ""}`}
              />
            {errors.nickname && (
              <p className="error-message">{errors.nickname}</p>
              )}
          </div>

          <div className="password">
            <label htmlFor="password" className="inputname">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              className={`input ${errors.password ? "error-border" : ""}`}
              minLength={8}
              required
              />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
            <label htmlFor="passwordConfirm" className="inputname">
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onBlur={validatePasswordConfirm}
              className={`input ${errors.passwordConfirm ? "error-border" : ""}`}
              minLength={8}
              required
              />
            {errors.passwordConfirm && (
              <p className="error-message">{errors.passwordConfirm}</p>
            )}
          </div>
          <button id="signupBtn" type="submit" disabled={disabled}>
            회원가입
          </button>
    </from>
    <div className="easy">
      <span className="easy-login">간편 로그인하기</span>
      <div className="sns">
        <Link to="https://www/google.com">
            <img src= {google} alt="google"/>
        </Link>
        <Link to="https://www.kakaocorp.com/page">
            <img src={kakao} alt="kakao" />
        </Link>
      </div>
    </div>

    <div className="login">
      <span>이미 회원아신가요?</span>
      <Link to="/Login.js">로그인</Link>
    </div>

    <Modal
      open={modalOpen}
      message={modalMsg}
      onClose={() => setModalOPen(false)}
      />
    </>
  )
}