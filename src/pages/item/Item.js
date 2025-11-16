import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./item.css";
import "../../styles/global.css";
import Header from "../../components/Layout/Header";
import facebookIcon from "../../assets/social/facebook-logo.svg";
import twitterIcon from "../../assets/social/twitter-logo.svg";
import youtubeIcon from "../../assets/social/youtube-logo.svg";
import instagramIcon from "../../assets/social/instagram-logo.svg";
import SellingItems from "./SellingItems";
import { ReactComponent as SearchIcon } from "../../assets/images/icons/ic_search.svg";

export default function Item() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchValue(inputValue);
    }
  };

  return (
    <div className="itemPageRoot">
      <Header />
      <main className="withHeader">
        <div className="wrapper">
          <div className="allItemsSectionHeader">
            <h1 className="sectionTitle">판매 중인 상품</h1>

            <div className="searchBarWrapper">
              <SearchIcon aria-hidden />
              <input
                className="searchBarInput"
                placeholder="검색할 상품을 입력해 주세요"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                aria-label="상품 검색어 입력"
              />
            </div>
            <Link to="/registration" className="createItemButton button">
              상품 등록하기
            </Link>
          </div>

          <section className="section">
            <SellingItems keyword={searchValue} />
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
