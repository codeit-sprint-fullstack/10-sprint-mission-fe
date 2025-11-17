import React from "react";
import bannerImg from "../../assets/img/banner-img.png";

const Banner = () => {
  return (
    <div>
      {" "}
      <section className="section-bottom">
        <div className="container-bottom">
          <div className="heroWrap">
            <h1 className="title">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h1>
          </div>
          <div>
            <img src={bannerImg} alt="panda and the world" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
