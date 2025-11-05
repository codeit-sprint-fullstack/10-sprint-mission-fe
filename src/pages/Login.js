import React, { useMemo, useState } from "react";
import "../styles/login.css"
import ErrorModal from '../components/ErrorModal'


import panda from "../assets/img/loginpanda.svg";
import googleIcon from "../assets/img/logingoogle.svg";
import kakaoIcon from "../assets/img/loginkakao.svg";

const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ email: "", password: ""});

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const openModal = (msg) => {
    setModalMsg(msg);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const validateEmail = () => {
    const value = email.trim();
    if (value === "") {
      setErrors((e) => ({...e, email: "이메일을 입력해주세요." }));
      return false;
    }
    if (!isValidEmail(value)) {
      setErrors((e) => ({...e, email: "잘못된 이메일 형식입니다. "}));
      return false;
    }
    setErrors((e) => ({ ...e, email: "" }));
    return true;
  };

  const validatePassword = () => {
    const value = password.trim();
    if (value === "") {
      setErrors((e) => ({ ...e, password: "비밀번호를 입력해주세요," }));
      return false;
    }
    if (value.length < 8) {
      setErrors((e) => ({ ...e, password: "비밀번호 8자 이상을 입력해주세요. "}));
      return false;
    }
    setErrors((e) => ({ ...e, password: "" }));
    return true;
  };

  const canSubmit = useMemo(() => {
    const emailOk = email.trim() !== "" && isValidEmail(email.trim());
    const passwordOk = password.trim().length >= 8;
    return emailOk && passwordOk;
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailOk = validateEmail();
    const passwordOk = validatePassword();
    if (!emailOk || !passwordOk) return;

    const emailValue = email.trim();
    const passwordValue = password.trim();

    if (!emailValue || !passwordValue) {
      openModal("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    const user = USER_DATA.find(
      (u) => u.email.toLowerCase() === emailValue.toLowerCase()
    );
    if (!user || user.password !== passwordValue) {
      openModal("비밀번호가 일치하지 않습니다.");
      return;
    }

    window.location.assign("/items");
  };

  return (
    <>
    {/* HEADER */}
    <div className="header">
      <a href="/src/pages/Main.js">
        <img src={panda} alt="panda" />
      </a>
      <span>판다마켓</span>
    </div>

    {/* FORM */}
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <div className="username">
        <label htmlFor="username" className="inputname">
          이메일
        </label>
        <input 
          type="email"
          id="username"
          name="username"
          className={`input ${errors.email ? "error-border" : ""}`}
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) validateEmail();
        }}
        onBlur={validateEmail}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="password">
        <label htmlFor="password" className="inputname">
          비밀번호
        </label>
        <input 
          type="password"
          id="password"
          name="password"
          className={`input ${errors.password ? "error-border" : ""}`}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) validatePassword();
          }}
          onBlur={validatePassword}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      <button id="loginBtn" type="submit" disabled={!canSubmit}>
        로그인
      </button>
    </form>

    {/* 간편 로그인 */}
    <div className="easy">
      <span className="easy-login">간편 로그인하기</span>
      <div className="sns">
        <a href="https://www.google.com" target="_blank" rel="noreferrer">
        <img src={googleIcon} alt="google"/>
        </a>
        <a href="https://www.kakaocorp.com/page" target="_blank" rel="norefrrer">
        <img src={kakaoIcon} alt="kakao"/>
        </a>
      </div>
    </div>

    {/* 회원가입 */}
    <div className="first">
      <span>판다마켓이 처음이신가요?</span>{" "}
      <a href="/src/pages/SiginUp.js">회원가입</a>
    </div>

    {/* 에러 모달 */}
    <ErrorModal open={modalOpen} message={modalMsg} onClose={closeModal} />
    </>
  )
}