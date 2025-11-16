import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="with-fixed-header">
      <section className="home-top-ad ad">
        <div className="inner">
          <p className="home-top-ad-announcement ad-announcement">
            일상의 모든 물건을
            <br />
            거래해 보세요
          </p>
          <Link to="/items" className="shopping">
            구경하러 가기
          </Link>
          <img
            className="panda-top-ad"
            src="/image/home-top-ad.svg"
            alt="홈 광고 판다 이미지"
          />
        </div>
      </section>

      <section className="hot-product">
        <div className="inner">
          <div className="hot-product-content">
            <img
              className="panda-hot"
              src="/image/panda-hot.svg"
              alt="홈 인기 상품 판다 이미지"
            />
            <div className="hot-product-description">
              <p className="hot-badge badge">Hot item</p>
              <p className="hot-product-check check">
                인기 상품을
                <br />
                확인해 보세요
              </p>
              <p className="hot-product-announcement announcement">
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="search">
        <div className="inner">
          <div className="search-content">
            <div className="search-description">
              <p className="search-badge badge">Search</p>
              <p className="search-check check">
                구매를 원하는
                <br />
                상품을 검색하세요
              </p>
              <p className="search-announcement announcement">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
            <img
              className="search-img"
              src="/image/search.svg"
              alt="돋보기 이미지"
            />
          </div>
        </div>
      </section>

      <section className="register-product">
        <div className="inner">
          <div className="register-product-content">
            <img
              className="register-img"
              src="/image/register.svg"
              alt="판매 상품 등록 이미지"
            />
            <div className="register-product-description">
              <p className="register-badge badge">Register</p>
              <p className="register-product-check check">
                판매를 원하는
                <br />
                상품을 등록하세요
              </p>
              <p className="register-product-announcement announcement">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-bottom-ad ad">
        <div className="inner">
          <p className="home-bottom-ad-announcement ad-announcement">
            믿을 수 있는 <br />
            판다마켓 중고 거래
          </p>
          <img
            className="panda-bottom-ad"
            src="/image/home-bottom-ad.svg"
            alt="홈 광고 판다 이미지"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
