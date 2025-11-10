import React from 'react';
import styles from "./ItemCardList.module.css";
import ItemCard from "../molecules/ItemCard";

const ItemCardList = ({ items = [], type = 'all' }) => {
    if (!items || items.length === 0) {
        return <div className={styles.empty}>상품이 없습니다.</div>;
    }

    return (
        <ul className={`${styles.ul} ${styles[type]}`}>
            {items.map((item) => (
                <li key={item.id || item._id} className={styles.li}>
                    <ItemCard item={item} type={type} />
                </li>
            ))}
        </ul>
    );
};

export default ItemCardList;