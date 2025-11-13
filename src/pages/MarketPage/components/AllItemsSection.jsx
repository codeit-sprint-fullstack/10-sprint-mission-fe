import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/itemApi";
import ItemCard from "./ItemCard";
import { ReactComponent as SortIconMobile } from "../../../assets/images/icons/ic_sort_mobile.svg";
import { ReactComponent as SortIconArrowDown } from "../../../assets/images/icons/ic_arrow_down.svg";
import { ReactComponent as SearchIcon } from "../../../assets/images/icons/ic_search.svg";
import DropdownList from "../../../components/UI/DropdownList";
import PaginationBar from "../../../components/UI/PaginationBar";

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
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [itemList, setItemList] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [keyword, setKeyword] = useState("");

  const fetchSortedData = async ({ orderBy, page, pageSize, keyword }) => {
    try {
      const products = await getProducts({ orderBy, page, pageSize, keyword });
      setItemList(products.list);
      setTotalPageNum(Math.max(1, Math.ceil(products.totalCount / pageSize)));
    } catch (error) {
      console.error("상품 목록을 불러오지 못했습니다.", error);
    }
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
    setIsDropdownVisible(false);
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchSortedData({ orderBy, page: 1, pageSize, keyword });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const convertToKorean = (orderByValue) => {
    switch (orderByValue) {
      case "recent":
        return "최신순";
      case "favorite":
        return "인기순";
      default:
        return "최신순";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize, keyword });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize, keyword]);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
    fetchSortedData({ orderBy, page: pageNumber, pageSize, keyword });
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
            value={keyword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            aria-label="상품 검색어 입력"
          />
        </div>
        <div className="createItemButton button" role="button" tabIndex={0}>
          상품 등록하기
        </div>
        <div className="sortButtonWrapper">
          <button
            type="button"
            className="sortDropdownTriggerButton"
            onClick={toggleDropdown}
          >
            <div className="sortBtn">
              <span>{convertToKorean(orderBy)}</span>
              <SortIconArrowDown aria-hidden />
            </div>
            <SortIconMobile className="mobileSortBtn" aria-hidden />
          </button>
          {isDropdownVisible && (
            <DropdownList onSortSelection={handleSortSelection} />
          )}
        </div>
      </div>

      <div className="allItemsCardSection">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
      </div>

      <div className="paginationBarWrapper">
        <PaginationBar
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}

export default AllItemsSection;
