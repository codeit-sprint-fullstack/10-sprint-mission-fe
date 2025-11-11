import React from "react";
import "../styles/home.css"
// 이미지
import logo from "../assets/logo/logo.svg"
import feature1 from "../assets/home/feature1-image.png";
import feature2 from "../assets/home/feature2-image.png";
import feature3 from "../assets/home/feature3-image.png";
import facebookIcon from "../assets/social/facebook-logo.svg";
import twitterIcon from "../assets/social/twitter-logo.svg";
import youtubeIcon from "../assets/social/youtube-logo.svg";
import instagramIcon from "../assets/social/instagram-logo.svg";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function Main () {
  return (
    <>
    <header>
      <a href="/" aria-label="홈으로 이동">
      <img src={logo} alt="판다마켓 로고" width="153" />
      </a>
      <Link to={Login} id="loginLink" className="button">로그인</Link>
    </header>

    <main className="with-header">
      <section id="hero" className="banner">
        <div className="wrapper">
          <h1>
            일상의 모든 물건을
            <br />
            거래해 보세요
          </h1>
          <a href="/items" className="button pill-button">
            구경하러가기
          </a>
        </div>
      </section>

      <section id="features" className="wrapper">
        <div className="feature">
          <img src={feature1} alt="인기 상품" />
          <div className="feature-content">
            <h2>Hot item</h2>
            <h1>
              인기 상품을 <span className="break-on-desktop"><br /></span>
              확인해보세요
            </h1>
            <p className="feature-description">
              가장 HOT한 중고거래 물품을
              <br />
              판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        <div className="feature">
          <img src={feature2} alt="검색 가능" />
          <div className="feature-content">
            <h2>Search</h2>
            <h1>
              구매를 원하는 <span className="break-on-desktop"><br /></span>
              상품을 검색하세요
            </h1>
            <p className="feature-description">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>

        <div className="feature">
          <img src={feature3} alt="판매 상품 등록" />
          <div className="feature-content">
            <h2>Register</h2>
            <h1>
              판매를 원하는 <span className="break-on-desktop"><br /></span>
              상품을 등록하세요
            </h1>
            <p className="feature-description">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section id="bottomBanner" className="banner">
        <div className="wrapper">
          <h1>
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </h1>
        </div>
      </section>
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
    </>
  )
}