import React from 'react';
import { Link } from 'react-router';
import Image from '../atoms/Image';
import styles from './LandingBanner.module.css';

const LandingBanner = ({ sentence, goHref = '/items', bannerImageSrc }) => {
  return (
    <section className={styles.banner}>
      <div className={styles.goSiteContainer}>
        <p className={styles.sentense}>{sentence}</p>
        <Link to={goHref} className={styles.goMarketButton}>구경하러 가기</Link>
      </div>
      <Image src={bannerImageSrc} alt="랜딩 상단 일러스트" style={styles.bannerImage}/>
    </section>
  );
};

export default LandingBanner;


