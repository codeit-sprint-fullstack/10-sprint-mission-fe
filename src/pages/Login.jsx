import React from "react";
import { Link } from "react-router-dom";
import "../styles/common.css";
import "../styles/style.css";

import "../styles/queries/queries.css";
import logo from "../assets/img/logo.svg";
import kakaotalk from "../assets/img/kakaotalk.svg";
import google from "../assets/img/google.png";
import "../styles/common.css";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <section className={styles.sectionLogin}>
      <div className={styles.container}>
        <Link to="/" className="logoWrap">
          <img className="logo" src={logo} alt="panda market logo" />

          <div className="logoName">판다마켓</div>
        </Link>
        {/* <!------------- inputs ----------> */}
        <form action="">
          <label className="email-label" htmlFor="email">
            이메일
            <input
              className="email-input"
              type="text"
              id="email"
              name="email"
              required
              placeholder="이메일을 입력해주세요"
            />
          </label>
          <label className="password-label" htmlFor="password">
            비밀번호
            <div className="input-wrapper">
              <input
                className="password-input"
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                required
              />
              <button className="pswToggle"></button>
            </div>
          </label>
          <button className="btn" id="loginButton" type="submit">
            로그인
          </button>
        </form>
        {/* <!------------- easyLogin----------> */}
        <div className="easyLogin">
          <p>간편 로그인하기</p>
          <div className="social-icons">
            <a
              href="https://www.google.com/"
              className="google"
              target="_blank"
            >
              <img src={google} alt="google" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              className="kakaotalk"
              target="_blank"
            >
              <img src={kakaotalk} alt="kakaotalk" />
            </a>
          </div>
        </div>
        {/* <!-- signin --> */}
        <div className="auth-text">
          <p>판다마켓이 처음이신가요?</p>
          <Link className="link" to="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
