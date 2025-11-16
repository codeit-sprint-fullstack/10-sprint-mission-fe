import React from "react";
import "./DropdownList.css";

function DropdownList({ onSortSelection }) {
  return (
    <div className="dropdownList">
      <button
        type="button"
        className="dropdownItem"
        onClick={() => onSortSelection("recent")}
      >
        최신순
      </button>
      <button
        type="button"
        className="dropdownItem"
        onClick={() => onSortSelection("favorite")}
      >
        인기순
      </button>
    </div>
  );
}

export default DropdownList;
