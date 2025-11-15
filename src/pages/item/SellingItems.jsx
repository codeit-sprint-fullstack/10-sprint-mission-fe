import React, { useEffect, useState, useMemo } from "react";
import ItemCard from "../MarketPage/components/ItemCard";
import PaginationBar from "../../components/UI/PaginationBar";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1280) {
    return 6;
  }
  return 10;
};

// 고정 상품 데이터
const FIXED_ITEM = {
  id: 1,
  name: "로봇 청소기",
  price: 1500000,
  favoriteCount: 240,
  images: [],
};

function SellingItems({ keyword = "" }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());

  const itemList = useMemo(() => {
    return Array.from({ length: pageSize }, (_, index) => ({
      ...FIXED_ITEM,
      id: (page - 1) * pageSize + index + 1,
    }));
  }, [page, pageSize]);

  const totalPageNum = 10;

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div>
      <div className="allItemsCardSection">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`item-${item.id}`} />
        ))}
      </div>

      {itemList.length === 0 && (
        <div className="market-empty">상품이 없습니다.</div>
      )}

      <div className="paginationBarWrapper">
        <PaginationBar
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default SellingItems;
