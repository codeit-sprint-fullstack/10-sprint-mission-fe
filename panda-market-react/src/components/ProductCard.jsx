import { price } from "../utils/price";
import "./ProductCard.css";

function ProductCard({ item }) {
  return (
    <article className="card">
      <img className="card-image" src={item?.images?.[0]} alt={item.name} />
      <h3 className="card-title">{item.name}</h3>
      <p className="card-price">{price(item.price ?? 0)}</p>
      <p className="card-fav">♡ {item.favoriteCount ?? 0}</p>
    </article>
  );
}

export default ProductCard;
