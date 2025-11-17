import { useParams } from "react-router-dom";

function ItemDetail() {
    const { id } = useParams();

    return (
        <main style={{ padding: "40px" }}>
            <h1>상품 상세 페이지</h1>
            <p>상품 ID: {id}</p>
        </main>
    );
}

export default ItemDetail;
