import React from "react";
import styles from "./ProductCard.module.css";
import HeartIcon from "./../../assets/img/heart.svg";
import productImg from "./../../assets/img/product-img.png";

const ProductCard = () => {
  return (
    <div>
      <div className={styles.imgBox}>
        <img src={productImg} />
      </div>
      <p className={styles.productName}>아이패드 미니팝니다</p>
      <p className={styles.productPrice}>
        <span>500,000</span>원
      </p>
      <div className={styles.likes}>
        <img src={HeartIcon} alt="" />
        <span> 240</span>
      </div>
    </div>
  );
};

export default ProductCard;
