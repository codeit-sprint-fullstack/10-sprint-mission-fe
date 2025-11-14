import React from "react";
import "./item.css";
import Header from "../../components/Layout/Header";
import "../../styles/global.css";
import facebookIcon from "../../assets/social/facebook-logo.svg";
import twitterIcon from "../../assets/social/twitter-logo.svg";
import youtubeIcon from "../../assets/social/youtube-logo.svg";
import instagramIcon from "../../assets/social/instagram-logo.svg";

export default function Item() {
  return (
    <div className="itemPageRoot">
      <Header />
      <main className="withHeader">
        <div className="wrapper">
          <section className="section">
            <h1 className="h1">아이템 페이지 준비 중</h1>
            <p className="hint"></p>
          </section>
        </div>
      </main>

      <footer>
        <div id="copyright">©codeit - 2024</div>

        <div id="footerMenu">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>

        <div id="socialMedia">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 페이스북"
          >
            <img src={facebookIcon} alt="페이스북" width="20" />
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 트위터"
          >
            <img src={twitterIcon} alt="트위터" width="20" />
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 유튜브"
          >
            <img src={youtubeIcon} alt="유튜브" width="20" />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 인스타그램"
          >
            <img src={instagramIcon} alt="인스타그램" width="20" />
          </a>
        </div>
      </footer>
    </div>
  );
}
