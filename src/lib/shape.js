// src/lib/shape.js
export function normalize(p = {}) {
  const title = p.title || p.name || p.productName || p.label || '상품';

  const price = Number(p.price ?? p.cost ?? p.amount ?? 0);

  const img =
    p.thumbnail ||
    p.thumbnailUrl ||
    p.image ||
    p.imageUrl ||
    p.img ||
    p.picture ||
    p.photo ||
    (Array.isArray(p.images) && (p.images[0]?.url || p.images[0])) ||
    (Array.isArray(p.photos) && (p.photos[0]?.url || p.photos[0])) ||
    '';

  const likes =
    p.likes ?? p.heart ?? p.hearts ?? p.favoriteCount ?? p.favorites ?? 0;

  const favorite =
    p.favorite === true || p.favorites === true || p.isFavorite === true;

  return { ...p, title, price, img, likes, favorite };
}
