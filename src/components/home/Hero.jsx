import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/img/hero-img.png";

const Hero = () => {
  return (
    <div>
      {" "}
      <section className="section-hero">
        <div className="container-hero">
          <div className="heroWrap">
            <h1 className="title">일상의 모든 물건을 거래해 보세요</h1>
            <Link className="hero-btn" to="/market">
              구경하러 가기
            </Link>
          </div>
          <div>
            <img src={heroImg} alt="panda and the world" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
