import "./Header.css";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-inner container">
        <nav className="nav">
          <Link to="/" className="logo">
            <img
              src="/image/panda-logo.svg"
              alt="판다마켓 로고"
              className="logo-desktop"
            />
            <img
              src="/image/mobile-logo.svg"
              alt="판다마켓 모바일 로고"
              className="logo-mobile"
            />
          </Link>

          <NavLink
            to="/items"
            className={({ isActive }) => {
              return isActive ? "nav-link nav-link-active" : "nav-link";
            }}
          >
            중고마켓
          </NavLink>

          <NavLink
            to="/freetalk"
            className={({ isActive }) => {
              return isActive ? "nav-link nav-link-active" : "nav-link";
            }}
          >
            자유게시판
          </NavLink>
        </nav>

        <nav className="header-login">
          <Link to="/login">로그인</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
