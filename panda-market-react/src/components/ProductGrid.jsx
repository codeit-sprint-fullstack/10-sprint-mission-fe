import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ items, field = "all" }) {
  const productList = Array.isArray(items) ? items : [];

  return (
    <div className={field === "best" ? "grid-best" : "grid-all"}>
      {productList.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductGrid;
