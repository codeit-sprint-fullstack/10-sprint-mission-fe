import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import "./Authentication.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const next = { email: "", password: "" };

    if (!email.trim()) {
      next.email = "이메일을 입력해주세요.";
    }
    if (!password.trim()) {
      next.password = "비밀번호를 입력해주세요.";
    }

    setErrors(next);
    return !next.email && !next.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert(
      "로그인 폼 제출! (아직 요구사항에 없어서 last_sprint_mission에 있던 authentication.js 모달은 다음에 반영하겠습니다 ㅠㅠ"
    );
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const isValid = email.trim() !== "" && password.trim() !== "";

  return (
    <main className="login">
      <div className="inner">
        <div className="login-box">
          <section className="login-panda-market-logo authentication-panda-market-logo">
            <Link to="/" className="login-panda-logo authentication-panda-logo">
              <img src="/image/panda-logo.svg" alt="판다마켓 로고" />
            </Link>
          </section>

          <form
            className="login-form authentication-form"
            onSubmit={handleSubmit}
          >
            <div className="login-email authentication-email">
              <label htmlFor="login-email">이메일</label>
              <input
                id="login-email"
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

            <div className="login-password authentication-password">
              <label htmlFor="login-password">비밀번호</label>
              <div className="input-wrap">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="visibility-icon"
                  type="button"
                  onClick={togglePassword}
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

            <button
              className="login-btn authentication-btn"
              type="submit"
              disabled={!isValid}
            >
              로그인
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
            <div className="login-signup-question">
              판다마켓이 처음이신가요?
            </div>
            <Link to="/signup" className="login-signup-link">
              회원가입
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Login;
