import React, {Fragment} from 'react';
import Image from "../atoms/Image";
import heartIcon from "../assets/ic_heart.svg";
import styles from "./ItemCard.module.css";

const ItemCard = ({ imageSrc, alt, title, money, hit }) => {

    const layoutStyle = {};
    const imageStyle = {};
    const heartStyle = {};

    return (
        <div className={styles.layoutStyle}>
            <Image src={imageSrc} alt={alt} style={styles.imageStyle}></Image>
            <p className={styles.title}>{title}</p>
            <p className={styles.money}>{money}원</p>
            <Image src={heartIcon} alt={"좋아요"} style={styles.heartStyle}></Image><p>{hit}</p>
        </div>
    );
};

export default ItemCard;