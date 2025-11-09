import React from 'react';
import styles from "./ItemCardList.module.css";
import ItemCard from "../molecules/ItemCard";

const items = [{
    key: 1,
    src: "/",
    alt: "example",
    item : {
        name: "아이패드 미니 팝니다",
        money: 1000000,
        hit: 240
    }
}]

const ItemCardList = () => {
    return (
        <ul className={styles.ul}>
            { items.map((item) => {<li className={styles.li}><ItemCard key={item.key} imageSrc={item.src} alt={item.alt} item={item}></ItemCard></li>})}
        </ul>
    );
};

export default ItemCardList;