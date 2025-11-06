import React from "react";
import "../styles/main.css"
import { Link } from "react-router-dom"

import logo from "../assets/img/logo.svg";
import main1 from "../assets/img/main1.svg";
import item1 from "../assets/img/1.svg";
import item2 from "../assets/img/2.svg";
import item3 from "../assets/img/3.svg";
import bottom from "../assets/img/bottom.svg";
import facebook from "../assets/img/facebook.svg";
import twitter from "../assets/img/twitter.svg";
import youtube from "../assets/img/youtude.svg";
import insta from "../assets/img/insta.svg";

function Main () {
  return (
    <>
    {/* Header */}
    <header>
      <div className="header">
        <div className="main-logo">
          <img src={logo} alt="판다로고" /> <span>판다마켓</span>
        </div>
        <Link to="/Login.js">로그인</Link>
      </div>
    </header>
    {/* Body */}
    <div className="section1">
      <div className="section1-word">
        <div className="word1">
          <div className="paragraph">
            일상의 모든 물건을<br /> 거래해 보세요
          </div>
          <a href="/items">구경하러 가기</a>
        </div>
        <img src={main1} alt="판다 하이" className="panda" />
      </div>
    </div>

    <div className="section2">
      <div className="section2-main">
        <img src={item1} alt="옷 하트" />
        <div className="section2-word">
          <div className="blue">Hot item</div>
          <div className="paragraph">
            인기 상품을<br />확인해 보세요
          </div>
          <div className="small-paragraph">
            가장 HOT한 중고거래 플랫폼<br />
            판다 마켓에서 확인해 보세요
          </div>
        </div>
      </div>
    </div>

    <div className="section3">
      <div className="section-main">
        <div className="section3-word">
          <div className="blue">Search</div>
          <div className="paragraph">
            구매를 원하는<br />상품을 검색하세요
          </div>
          <div className="small-paragraph">
            구매하고 싶은 물품은 검색해서<br />
            쉽게 찾아보세요
          </div>
        </div>
        <img src={item2} alt="돋보기"/>
      </div>
    </div>

    <div className="section4">
      <img src={item3} alt="상품 등록"/>
      <div className="section4-main">
        <div className="blue">Register</div>
        <div className="section4-word">
          <div className="paragraph">
            판매를 원하는<br />상품을 등록하세요
          </div>
          <div className="small-paragraph">
            어떤 물건이든 판매하고 싶은 <br />
            상품을 쉽게 등록하세요
          </div>
        </div>
      </div>
    </div>

    <div className="section5">
      <div className="paragraph">
        믿을 수 있는 <br />
        판다마켓 중고 거래
      </div>
      <img src={bottom} alt="판다하이"/>
    </div>

    {/* FOOTER */}
    <footer>
      <div className="footer-content">@codeit - 2024</div>

      <div className="footer-mid">
        <a href="/privacy">Privacy Polocy</a>
        <a href="/faq">FAQ</a>
      </div>

      <div className="img">
        <a href="https://www.facebook.com/?locale=ko_KR" target="_blank" rel="noreferrer">
        <img src={facebook} alt="facebook"/>
        </a>
        <a href="https://x.com/" target="_blank" rel="noreferrer">
        <img src={twitter}/>
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
        <img src={youtube}/>
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
        <img src={insta}/>
        </a>
      </div>
    </footer>
    </>
  );
}
export default Main