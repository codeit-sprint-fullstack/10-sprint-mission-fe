// src/components/Header.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../CSS/Header.css';
import logo from '../img/logo.png'; // 이미 import 방식으로 사용 중

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="Header">
      <div className="Header__content">
        <div className="Header__logo-nav">
          <div
            className="Header__logo"
            onClick={() => navigate('/')}
            role="button"
          >
            <img src={logo} alt="판다마켓 로고" className="Header__logo-img" />
            <span className="Header__title">판다마켓</span>
          </div>

          <nav className="Header__nav">
            <NavLink to="/board" className="Header__link">
              자유게시판
            </NavLink>
            <NavLink to="/market" className="Header__link">
              중고마켓
            </NavLink>
          </nav>
        </div>

        <button
          className="Header__login-btn"
          onClick={() => (window.location.href = './login.html')}
        >
          로그인
        </button>
      </div>
    </header>
  );
}
