import React from "react";
import Logo from "../../assets/images/logo/logo.svg";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isItemsPage = location.pathname === "/items";

  return (
    <header className="globalHeader">
      <div className="headerLeft">
        <Link to="/" aria-label="홈으로 이동">
          <img
            src={Logo}
            alt="판다마켓 로고"
            width="153"
            className="headerLogo"
          />
        </Link>

        <nav>
          <ul>
            <li>자유게시판</li>

            <li className={isItemsPage ? "active" : ""}>
              <Link to="/items" aria-label="중고마켓 페이지로 이동">
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <button type="button" className="loginLink button">
        <Link to="/Login" aria-label="로그인 페이지로 이동">
          로그인
        </Link>
      </button>
    </header>
  );
}

export default Header;
