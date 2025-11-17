import React from "react";
import sectionHowImg from "../../assets/img/section-hot-item-img.png";
import sectionImgSearch from "../../assets/img/section-search-img.png";
import sectionImgRegister from "../../assets/img/section-register-img.png";

const SectionCard = () => {
  return (
    <div>
      {" "}
      <section className="section-best">
        <div className="container-best">
          <div className="img-box">
            <img src={sectionHowImg} alt="Hot item" />
          </div>
          <div className="contentWrap">
            <h2 className="subtitle">Hot item</h2>
            <h1 className="title">
              인기 상품을
              <br />
              확인해 보세요
            </h1>
            <p className="text">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>
      {/* <!-- section Search items --> */}
      <section className="section-search">
        <div className="container-search">
          <div className="img-box">
            <img src={sectionImgSearch} alt="" />
          </div>
          <div className="contentWrap">
            <h2 className="subtitle">Search</h2>
            <h1 className="title">
              구매를 원하는
              <br />
              상품을 검색하세요
            </h1>
            <p className="text">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>
      </section>
      {/* <!-- section Register items --> */}
      <section className="section-register">
        <div className="container-register">
          <div className="img-box">
            <img src={sectionImgRegister} alt="" />
          </div>
          <div className="contentWrap">
            <h2 className="subtitle">Register</h2>
            <h1 className="title">
              판매를 원하는
              <br />
              상품을 등록하세요
            </h1>
            <p className="text">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionCard;
