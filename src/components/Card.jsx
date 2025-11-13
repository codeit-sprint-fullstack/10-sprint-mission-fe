// src/components/Card.jsx
export default function Card({ item }) {
  if (!item) return null;

  const fallback = 'https://placehold.co/600x600?text=Panda';

  return (
    <div className="Card">
      <div className="Card__img-wrapper">
        <img
          className="Card__img"
          src={item.img || 'https://placehold.co/600x375?text=Panda'}
          alt={item.title}
        />
      </div>
      <div className="Card__meta">
        <p className="title">{item.title}</p>
        <p className="price">{item.price.toLocaleString()}원</p>
        <p className="likes">♡ {item.likes ?? 0}</p>
      </div>
    </div>
  );
}
