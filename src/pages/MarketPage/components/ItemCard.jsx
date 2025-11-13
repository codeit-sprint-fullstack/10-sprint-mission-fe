import React from "react";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";
import defaultImg from "../../../assets/Matket/defaultImg.svg";

function ItemCard({ item }) {
  if (!item) {
    return null;
  }

  const {
    images = [],
    name = "상품명 없음",
    price = 0,
    favoriteCount = 0,
  } = item;

  const thumbnail = images?.[0] || defaultImg;

  return (
    <article className="itemCard">
      <img
        src={thumbnail}
        alt={name}
        className="itemCardThumbnail"
        loading="lazy"
      />
      <div className="itemSummary">
        <h2 className="itemName">{name}</h2>
        <p className="itemPrice">{Number(price).toLocaleString()}원</p>
        <div className="favoriteCount" aria-label="좋아요 수">
          <HeartIcon aria-hidden />
          {favoriteCount}
        </div>
      </div>
    </article>
  );
}

export default ItemCard;
