import "./SearchTool.css";
import SearchIcon from "../img/Search.svg";

function SearchTool({ onChange }) {
    return (
        <div className="Search-Container">
            <div className="SearchTool">
                <img className="SearchIcon" src={SearchIcon} />
                <input
                    type="text"
                    placeholder="검색할 상품을 입력해주세요"
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
}

export default SearchTool;
