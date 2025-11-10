const Header = () => {
  return (
    <header>
        <div className="header-left">
            <a href="/" className="logo-link">
              <img src="/src/assets/logos/panda_logo.svg" width="153" alt="panda logo" />
            </a>
            <nav className="main-nav" aria-label="main navigation">
              <a href="#" className="nav-link">자유게시판</a>
              <a href="#" className="nav-link">중고마켓</a>
            </nav>
        </div>
        <a href="#" id="loginLinkButton" className="button">로그인</a>
    </header>
  );
}


export default Header;