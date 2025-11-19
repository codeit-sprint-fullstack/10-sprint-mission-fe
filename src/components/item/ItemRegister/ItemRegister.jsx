import "./ItemRegister.css";
import { Link } from "react-router-dom";

function ItemRegister() {
    return (
        <Link to="/registration">
            <button className="RegisterBtn" type="submit">
                상품 등록하기
            </button>
        </Link>
    );
}

export default ItemRegister;
