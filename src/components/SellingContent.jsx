import "./SellingContent.css";

function SellingContentItem({ item }) {
    return (
        <div className="SellingItem">
            <img
                className="SellingContentItem-img"
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

function SellingContent({ items }) {
    return (
        <ul className="Selling-itemList">
            {items.map((item) => {
                return (
                    <li>
                        <SellingContentItem item={item} />
                    </li>
                );
            })}
        </ul>
    );
}

export default SellingContent;
