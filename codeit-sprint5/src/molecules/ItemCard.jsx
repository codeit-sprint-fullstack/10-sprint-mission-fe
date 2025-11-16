import React from 'react';
import Image from "../atoms/Image";
import heartIcon from "../assets/ic_heart.svg";
import defaultProductImage from "../assets/Img_home_01.png";
import styles from "./ItemCard.module.css";

const ItemCard = ({ item, type = 'all' }) => {
    if (!item) return null;

    const {
        imageUrl,
        image,
        images,
        title,
        name,
        price,
        money,
        favoriteCount,
        favorites,
        hit
    } = item;

    const imageSrc = (images && images.length > 0 ? images[0] : '') || imageUrl || image || defaultProductImage;
    const itemTitle = title || name || '';
    const itemPrice = price || money || 0;
    const likeCount = favoriteCount || favorites || hit || 0;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    const imageStyleClass = type === 'best' ? styles.imageStyleBest : styles.imageStyle;

    return (
        <div className={styles.layoutStyle}>
            <Image
                src={imageSrc}
                alt={itemTitle}
                style={imageStyleClass}
                onError={(e) => { e.currentTarget.src = defaultProductImage; }}
            />
            <div className={styles.contentContainer}>
                <div className={styles.textContainer}>
                    <p className={styles.title}>{itemTitle}</p>
                    <p className={styles.money}>{formatPrice(itemPrice)}원</p>
                </div>
                <div className={styles.likeContainer}>
                    <Image src={heartIcon} alt={"좋아요"} style={styles.heartStyle} />
                    <p className={styles.likeCount}>{likeCount}</p>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;