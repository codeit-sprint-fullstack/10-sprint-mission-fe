import React from 'react';
import ItemCard from '../molecules/ItemCard';
import styles from './ItemCardRow.module.css';

const ItemCardRow = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return <div className={styles.empty}>상품이 없습니다.</div>;
  }

  return (
    <div className={styles.row}>
      {items.map((item) => (
        <div key={item.id || item._id} className={styles.card}>
          <ItemCard item={item}/>
        </div>
      ))}
    </div>
  );
};

export default ItemCardRow;


