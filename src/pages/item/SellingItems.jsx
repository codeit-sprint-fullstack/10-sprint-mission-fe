import React, { useEffect, useState } from "react";
import ItemCard from "../MarketPage/components/ItemCard";
import PaginationBar from "../../components/UI/PaginationBar";

function getPageSize() {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1280) {
    return 6;
  } else {
    return 10;
  }
}

function SellingItems(props) {
  const searchKeyword = props.keyword || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getPageSize());
  const [items, setItems] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword]);

  useEffect(() => {
    const defaultItem = {
      id: 1,
      name: "로봇 청소기",
      price: 1500000,
      favoriteCount: 240,
      images: [],
    };

    const listToShow = [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    for (let i = 0; i < itemsPerPage; i++) {
      const itemToAdd = {
        id: startIndex + i + 1,
        name: defaultItem.name,
        price: defaultItem.price,
        favoriteCount: defaultItem.favoriteCount,
        images: defaultItem.images,
      };
      listToShow.push(itemToAdd);
    }
    setItems(listToShow);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    function handleWindowResize() {
      const newPageSize = getPageSize();
      setItemsPerPage(newPageSize);
    }

    window.addEventListener("resize", handleWindowResize);

    return function removeEventListener() {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const totalPages = 10;

  const handlePageChange = (newPageNumber) => {
    setCurrentPage(newPageNumber);
  };

  return (
    <div>
      <div className="allItemsCardSection">
        {items.map(function(item) {
          return <ItemCard item={item} key={"item-" + item.id} />;
        })}
      </div>

      {items.length === 0 && (
        <div className="market-empty">상품이 없습니다.</div>
      )}

      <div className="paginationBarWrapper">
        <PaginationBar
          totalPageNum={totalPages}
          activePageNum={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default SellingItems;
