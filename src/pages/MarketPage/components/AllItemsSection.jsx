import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/itemApi";
import ItemCard from "./ItemCard";
import { ReactComponent as SortIconMobile } from "../../../assets/images/icons/ic_sort_mobile.svg";
import { ReactComponent as SortIconArrowDown } from "../../../assets/images/icons/ic_arrow_down.svg";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";
import DropdownList from "../../../components/UI/DropdownList";
import PaginationBar from "../../../components/UI/PaginationBar";
import { Link } from "react-router-dom";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1280) {
    return 6;
  }
  return 10;
};

function AllItemsSection() {
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [items, setItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");

  const loadProducts = async () => {
    try {
      const result = await getProducts({
        orderBy: sortBy,
        page: currentPage,
        pageSize: pageSize,
        keyword: searchText,
      });
      setItems(result.list);
      const calculatedPages = Math.ceil(result.totalCount / pageSize);
      if (calculatedPages < 1) {
        setTotalPages(1);
      } else {
        setTotalPages(calculatedPages);
      }
    } catch (error) {
      console.error("상품 목록을 불러오지 못했습니다.", error);
    }
  };

  const handleSortClick = (selectedSort) => {
    setSortBy(selectedSort);
    setShowDropdown(false);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    loadProducts();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const getSortText = (sortValue) => {
    if (sortValue === "recent") {
      return "최신순";
    } else if (sortValue === "favorite") {
      return "인기순";
    } else {
      return "최신순";
    }
  };

  useEffect(() => {
    function handleResize() {
      const newSize = getPageSize();
      setPageSize(newSize);
    }

    window.addEventListener("resize", handleResize);
    loadProducts();

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, [sortBy, currentPage, pageSize, searchText]);

  const toggleDropdown = () => {
    if (showDropdown === true) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const handlePageChange = (newPageNumber) => {
    setCurrentPage(newPageNumber);
    loadProducts();
  };

  return (
    <section>
      <div className="allItemsSectionHeader">
        <h1 className="sectionTitle">판매 중인 상품</h1>

        <div className="searchBarWrapper">
          <SearchIcon aria-hidden />
          <input
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
            value={searchText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            aria-label="상품 검색어 입력"
          />
        </div>
        <Link to='items'>
        <div className="createItemButton button" role="button" tabIndex={0}>
          상품 등록하기
        </div>
        </Link>
        <div className="sortButtonWrapper">
          <button
            type="button"
            className="sortDropdownTriggerButton"
            onClick={toggleDropdown}
          >
            <div className="sortBtn">
              <span>{getSortText(sortBy)}</span>
              <SortIconArrowDown aria-hidden />
            </div>
            <SortIconMobile className="mobileSortBtn" aria-hidden />
          </button>
          {showDropdown === true && (
            <DropdownList onSortSelection={handleSortClick} />
          )}
        </div>
      </div>

      <div className="allItemsCardSection">
        {items.map(function(item) {
          return <ItemCard item={item} key={"market-item-" + item.id} />;
        })}
      </div>

      <div className="paginationBarWrapper">
        <PaginationBar
          totalPageNum={totalPages}
          activePageNum={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

export default AllItemsSection;
