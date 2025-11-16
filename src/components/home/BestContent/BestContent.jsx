import "./BestContent.css";

function BestContentItem({ item }) {
    return (
        <div className="BestContentItem">
            <img
                className="BestContentItem-img"
                src={item.images}
                alt="상품 이미지"
            />
            <div>
                <p className="item-name">{item.name}</p>
                <p className="item-price">
                    {item.price.toLocaleString("ko-KR") + "원"}
                </p>
                <p className="item-favorite">♡ {item.favoriteCount}</p>
            </div>
        </div>
    );
}

function BestContent({ items }) {
    return (
        <ul className="itemList">
            {items.map((item) => {
                return (
                    <li>
                        <BestContentItem item={item} />
                    </li>
                );
            })}
        </ul>
    );
}

export default BestContent;
