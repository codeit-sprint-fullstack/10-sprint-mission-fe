import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Layout/Header";
import { createProduct } from "../../api/itemApi";
import "./RegistrationPage.css";
import "../../styles/global.css";
import facebookIcon from "../../assets/social/facebook-logo.svg";
import twitterIcon from "../../assets/social/twitter-logo.svg";
import youtubeIcon from "../../assets/social/youtube-logo.svg";
import instagramIcon from "../../assets/social/instagram-logo.svg";

function RegistrationPage() {
  const navigate = useNavigate();
  
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productTags, setProductTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e) => {
    setProductName(e.target.value);
    if (nameError !== "") {
      setNameError("");
    }
  };

  const handleDescriptionChange = (e) => {
    setProductDescription(e.target.value);
    if (descriptionError !== "") {
      setDescriptionError("");
    }
  };

  const handlePriceChange = (e) => {
    setProductPrice(e.target.value);
    if (priceError !== "") {
      setPriceError("");
    }
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedTag = tagInputValue.trim();
      if (trimmedTag !== "") {
        let tagExists = false;
        for (let i = 0; i < productTags.length; i++) {
          if (productTags[i] === trimmedTag) {
            tagExists = true;
            break;
          }
        }
        if (tagExists === false) {
          const updatedTags = [];
          for (let i = 0; i < productTags.length; i++) {
            updatedTags.push(productTags[i]);
          }
          updatedTags.push(trimmedTag);
          setProductTags(updatedTags);
          setTagInputValue("");
        }
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = [];
    for (let i = 0; i < productTags.length; i++) {
      if (productTags[i] !== tagToRemove) {
        updatedTags.push(productTags[i]);
      }
    }
    setProductTags(updatedTags);
  };

  const checkFormValid = () => {
    let hasError = false;

    if (productName.trim() === "") {
      setNameError("상품명을 입력해 주세요");
      hasError = true;
    }

    if (productPrice.trim() === "") {
      setPriceError("가격을 입력해 주세요");
      hasError = true;
    } else {
      const priceAsNumber = Number(productPrice);
      if (isNaN(priceAsNumber) === true) {
        setPriceError("올바른 가격을 입력해 주세요");
        hasError = true;
      } else if (priceAsNumber <= 0) {
        setPriceError("올바른 가격을 입력해 주세요");
        hasError = true;
      }
    }

    if (productDescription.trim() === "") {
      setDescriptionError("상품 설명을 입력해 주세요");
      hasError = true;
    }

    if (hasError === true) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = checkFormValid();
    if (isValid === false) {
      return;
    }

    setIsLoading(true);

    try {
      const dataToSend = {
        name: productName.trim(),
        price: Number(productPrice),
        description: productDescription.trim(),
        tags: productTags,
      };

      const result = await createProduct(dataToSend);
      
      if (result.id !== undefined && result.id !== null) {
        navigate("/product/" + result.id);
      } else {
        navigate("/product/1");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해 주세요.");
      setIsLoading(false);
    }
  };

  return (
    <div className="registrationPageRoot">
      <Header />
      <main className="withHeader">
        <div className="wrapper">
          <div className="registrationContainer">
            <div className="registrationHeader">
              <h1 className="registrationTitle">상품 등록하기</h1>
              <button
                type="submit"
                form="registrationForm"
                className="registerButton button"
                disabled={isLoading}
              >
                {isLoading === true ? "등록 중..." : "등록"}
              </button>
            </div>

            <form
              id="registrationForm"
              onSubmit={handleSubmit}
              className="registrationForm"
            >
              <div className="formGroup">
                <label htmlFor="name" className="formLabel">
                  상품명
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productName}
                  onChange={handleNameChange}
                  className={nameError !== "" ? "formInput error" : "formInput"}
                  placeholder="상품명을 입력해주세요"
                />
                {nameError !== "" && (
                  <span className="errorMessage">{nameError}</span>
                )}
              </div>

              <div className="formGroup">
                <label htmlFor="description" className="formLabel">
                  상품 소개
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={productDescription}
                  onChange={handleDescriptionChange}
                  className={descriptionError !== "" ? "formTextarea error" : "formTextarea"}
                  placeholder="상품 소개를 입력해주세요"
                  rows="10"
                />
                {descriptionError !== "" && (
                  <span className="errorMessage">{descriptionError}</span>
                )}
              </div>

              <div className="formGroup">
                <label htmlFor="price" className="formLabel">
                  판매가격
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productPrice}
                  onChange={handlePriceChange}
                  className={priceError !== "" ? "formInput error" : "formInput"}
                  placeholder="판매 가격을 입력해주세요"
                  min="0"
                />
                {priceError !== "" && (
                  <span className="errorMessage">{priceError}</span>
                )}
              </div>

              <div className="formGroup">
                <label htmlFor="tags" className="formLabel">
                  태그
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={tagInputValue}
                  onChange={(e) => setTagInputValue(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  className="formInput"
                  placeholder="태그를 입력해주세요"
                />
                {productTags.length > 0 && (
                  <div className="tagsContainer">
                    {productTags.map(function(tag, index) {
                      return (
                        <span key={index} className="tag">
                          #{tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="tagRemoveButton"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </form>
          </div>
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

export default RegistrationPage;

