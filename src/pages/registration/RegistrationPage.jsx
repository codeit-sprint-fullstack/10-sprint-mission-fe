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
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !formData.tags.includes(tag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tag],
        }));
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "상품명을 입력해 주세요";
    }

    if (!formData.price.trim()) {
      newErrors.price = "가격을 입력해 주세요";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "올바른 가격을 입력해 주세요";
    }

    if (!formData.description.trim()) {
      newErrors.description = "상품 설명을 입력해 주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = {
        name: formData.name.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
        tags: formData.tags,
      };

      const response = await createProduct(productData);
      
      if (response.id) {
        navigate(`/product/${response.id}`);
      } else {
        navigate("/product/1");
      }
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "등록 중..." : "등록"}
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
                  value={formData.name}
                  onChange={handleChange}
                  className={`formInput ${errors.name ? "error" : ""}`}
                  placeholder="상품명을 입력해주세요"
                />
                {errors.name && (
                  <span className="errorMessage">{errors.name}</span>
                )}
              </div>

              <div className="formGroup">
                <label htmlFor="description" className="formLabel">
                  상품 소개
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`formTextarea ${errors.description ? "error" : ""}`}
                  placeholder="상품 소개를 입력해주세요"
                  rows="10"
                />
                {errors.description && (
                  <span className="errorMessage">{errors.description}</span>
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
                  value={formData.price}
                  onChange={handleChange}
                  className={`formInput ${errors.price ? "error" : ""}`}
                  placeholder="판매 가격을 입력해주세요"
                  min="0"
                />
                {errors.price && (
                  <span className="errorMessage">{errors.price}</span>
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
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  className="formInput"
                  placeholder="태그를 입력해주세요"
                />
                {formData.tags.length > 0 && (
                  <div className="tagsContainer">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="tagRemoveButton"
                        >
                          ×
                        </button>
                      </span>
                    ))}
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

