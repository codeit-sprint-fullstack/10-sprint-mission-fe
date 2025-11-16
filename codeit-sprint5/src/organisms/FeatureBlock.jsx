import React from 'react';
import Image from '../atoms/Image';
import styles from './FeatureBlock.module.css';

const FeatureBlock = ({ label, title, subtitle, imageSrc, reverse = false }) => {
  return (
    <section className={styles.hotItem}>
      <div className={`${styles.sectionContainer} ${reverse ? styles.reverse : ''}`}>
        <Image src={imageSrc} alt={title} style={styles.featureImage}/>
        <div className={styles.explain}>
          <p className={styles.word}>{label}</p>
          <p className={styles.mainExplain}>{title}</p>
          <p className={styles.subExplain}>{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default FeatureBlock;


