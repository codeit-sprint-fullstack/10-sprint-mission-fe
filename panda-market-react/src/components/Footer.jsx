import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="copyright">@Codeit - 2024</div>
        <div className="legal">
          <a href="/privacy" className="link privacy">
            Privacy Policy
          </a>
          <a href="/faq" className="link faq">
            FAQ
          </a>
        </div>
        <div className="links">
          <a
            href="https://www.facebook.com/"
            className="link footer-link-logo"
            target="_blank"
          >
            <img src="/image/facebook-logo.svg" alt="페이스북 로고" />
          </a>
          <a
            href="https://x.com/"
            className="link footer-link-logo"
            target="_blank"
          >
            <img src="/image/x-logo.svg" alt="트위터(X) 로고" />
          </a>
          <a
            href="https://www.youtube.com/"
            className="link footer-link-logo"
            target="_blank"
          >
            <img src="/image/youtube-logo.svg" alt="유튜브 로고" />
          </a>
          <a
            href="https://www.instagram.com/"
            className="link footer-link-logo"
            target="_blank"
          >
            <img src="/image/instagram-logo.svg" alt="인스타그램 로고" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
