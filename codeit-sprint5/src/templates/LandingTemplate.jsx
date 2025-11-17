import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Image from '../atoms/Image';
import LandingBanner from '../organisms/LandingBanner';
import FeatureBlock from '../organisms/FeatureBlock';
import imgTop from '../assets/Img_home_top.png';
import imgHot from '../assets/Img_home_01.png';
import imgSearch from '../assets/Img_home_02.png';
import imgRegister from '../assets/Img_home_03.png';
import imgBottom from '../assets/Img_home_bottom.png';
import styles from './LandingTemplate.module.css';

const LandingTemplate = () => {
  return (
    <div className={styles.container}>
      <Header/>

      <main className={styles.main}>
        <LandingBanner sentence="일상의 모든 물건을 거래해보세요" bannerImageSrc={imgTop}/>

        <FeatureBlock
          label="Hot item"
          title="인기 상품을 확인해 보세요"
          subtitle="가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요"
          imageSrc={imgHot}
        />

        <FeatureBlock
          label="Search"
          title="구매를 원하는 상품을 검색하세요"
          subtitle="구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"
          imageSrc={imgSearch}
          reverse
        />

        <FeatureBlock
          label="Register"
          title="판매를 원하는 상품을 등록하세요"
          subtitle="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
          imageSrc={imgRegister}
        />

        <div className={styles.final}>
          <div className={styles.finalContainer}>
            <p>믿을 수 있는 판다마켓 중고 거래</p>
            <Image src={imgBottom} alt="판다 두 마리가 거래를 마치고 헤어지는 사진" style={styles.finalImage}/>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default LandingTemplate;


