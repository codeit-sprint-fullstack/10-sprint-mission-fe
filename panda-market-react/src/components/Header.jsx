function Header() {
  return (
    <header className="header">
      <div className="header-inner container">
        <nav className="nav">
          <a href="/" className="logo">
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
          </a>
          <a href="/">중고마켓</a>
          <a href="/freetalk">자유게시판</a>
        </nav>
        <nav className="header-login">
          <a href="/login">로그인</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
