import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import "./Authentication.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const validate = () => {
    const next = {
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
    };

    if (!email.trim()) next.email = "이메일을 입력해주세요.";
    if (!nickname.trim()) next.nickname = "닉네임을 입력해주세요.";
    if (!password.trim()) next.password = "비밀번호를 입력해주세요.";
    if (!passwordConfirm.trim()) {
      next.passwordConfirm = "비밀번호 확인을 입력해주세요.";
    } else if (password !== passwordConfirm) {
      next.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(next);
    return (
      !next.email && !next.nickname && !next.password && !next.passwordConfirm
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert("회원가입 폼 제출 (실제 회원가입 로직 미구현)");
  };

  const isValid =
    email.trim() &&
    nickname.trim() &&
    password.trim() &&
    passwordConfirm.trim() &&
    password === passwordConfirm;

  return (
    <main className="signup">
      <div className="inner">
        <div className="signup-box">
          <section className="signup-panda-market-logo authentication-panda-market-logo">
            <Link
              to="/"
              className="signup-panda-logo authentication-panda-logo"
            >
              <img src="/image/panda-logo.svg" alt="판다마켓 로고" />
            </Link>
          </section>

          <form
            className="signup-form authentication-form"
            onSubmit={handleSubmit}
          >
            <div className="signup-email authentication-email">
              <label htmlFor="signup-email">이메일</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="error-message" role="alert" aria-live="polite">
                {errors.email}
              </p>
            </div>

            <div className="signup-nickname authentication-nickname">
              <label htmlFor="signup-nickname">닉네임</label>
              <input
                id="signup-nickname"
                name="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <p className="error-message" role="alert" aria-live="polite">
                {errors.nickname}
              </p>
            </div>

            <div className="signup-password authentication-password">
              <label htmlFor="signup-password">비밀번호</label>
              <div className="input-wrap">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="visibility-icon"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <img
                    src="/image/visibility.svg"
                    alt={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                  />
                </button>
              </div>
              <p className="error-message" role="alert" aria-live="polite">
                {errors.password}
              </p>
            </div>

            <div className="signup-password authentication-password">
              <label htmlFor="signup-password-confirm">비밀번호 확인</label>
              <div className="input-wrap">
                <input
                  id="signup-password-confirm"
                  name="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button
                  className="visibility-icon"
                  type="button"
                  onClick={() => setShowPasswordConfirm((prev) => !prev)}
                >
                  <img
                    src="/image/visibility.svg"
                    alt={
                      showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"
                    }
                  />
                </button>
              </div>
              <p className="error-message" role="alert" aria-live="polite">
                {errors.passwordConfirm}
              </p>
            </div>

            <button
              className="signup-btn authentication-btn"
              type="submit"
              disabled={!isValid}
            >
              회원가입
            </button>
          </form>

          <section className="social-login">
            <div className="start-social-login">간편 로그인하기</div>
            <div className="social-login-links">
              <a
                href="https://www.google.com/"
                className="link social-login-link-logo"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/image/google-logo.svg" alt="구글 로고" />
              </a>
              <a
                href="https://www.kakaocorp.com/page/"
                className="link social-login-link-logo"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/image/kakao-logo.svg" alt="카카오 로고" />
              </a>
            </div>
          </section>

          <section className="login-signup">
            <div className="login-signup-question">이미 회원이신가요?</div>
            <Link to="/login" className="login-signup-link">
              로그인
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Signup;
