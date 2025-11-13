import React from "react";
import "./PaginationBar.css";
import { ReactComponent as LeftArrow } from "../../assets/images/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../../assets/images/icons/arrow_right.svg";

function PaginationBar({ totalPageNum = 1, activePageNum = 1, onPageChange }) {
  const maxVisiblePages = 5;
  let startPage;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, index) => startPage + index
  );

  return (
    <div className="paginationBar">
      <button
        type="button"
        className="paginationButton"
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
        aria-label="이전 페이지"
      >
        <LeftArrow />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`paginationButton ${
            activePageNum === page ? "active" : ""
          }`}
          onClick={() => onPageChange(page)}
          aria-current={activePageNum === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="paginationButton"
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
        aria-label="다음 페이지"
      >
        <RightArrow />
      </button>
    </div>
  );
}

export default PaginationBar;
