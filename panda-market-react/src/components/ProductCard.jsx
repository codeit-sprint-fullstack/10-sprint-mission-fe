import { price } from "../utils/price";
import "./ProductCard.css";

const DEFAULT_IMAGE = "/image/default-img.svg";

function ProductCard({ item }) {
  const productImage = item?.image?.[0] || DEFAULT_IMAGE;

  return (
    <article className="card">
      <img className="card-image" src={productImage} alt={item.name} />
      <h3 className="card-title">{item.name}</h3>
      <p className="card-price">{price(item.price ?? 0)}</p>
      <p className="card-fav">♡ {item.favoriteCount ?? 0}</p>
    </article>
  );
}

export default ProductCard;
