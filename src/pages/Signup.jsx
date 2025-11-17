import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import kakaotalk from "../assets/img/kakaotalk.svg";
import google from "../assets/img/google.png";
import "../styles/common.css";
import styles from "./Signup.module.css";

const Signup = () => {
  return (
    <section className={styles.sectionSignup}>
      <div className={styles.container}>
        <Link to="/" className="logoWrap">
          <img className="logo" src={logo} alt="panda market logo" />
          <div className="logoName">판다마켓</div>
        </Link>

        {/* <!-- inputs --> */}
        <form action="">
          <label htmlFor="email">
            이메일
            <input
              type="text"
              id="email"
              name="email"
              required
              placeholder="이메일을 입력해주세요"
            />
          </label>
          <label htmlFor="nickname">
            닉네임
            <input
              type="text"
              id="nickname"
              name="nickname"
              required
              placeholder="닉네임을 입력해주세요"
            />
          </label>
          <label htmlFor="password">
            비밀번호
            <div className={styles.inputWrapper}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                required
              />
              <button type="button" className={styles.pswToggle}></button>
            </div>
          </label>
          <label htmlFor="confirm-password">
            비밀번호 확인
            <div className={styles.inputWrapper}>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="비밀번호를 다시 한번 입력해주세요"
                required
              />
              <button type="button" className={styles.pswToggle}></button>
            </div>
          </label>
          <button className="btn" type="submit">
            회원가입
          </button>
        </form>

        {/* <!-- easyLogin --> */}
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

        {/* <!-- login --> */}
        <div className="auth-text">
          <p>이미 회원이신가요?</p>
          <Link className="link" to="/login">
            로그인
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
