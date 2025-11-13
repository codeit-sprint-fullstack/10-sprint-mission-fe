import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../../../api/itemApi";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 744) {
    return 1;
  } else if (width < 1280) {
    return 2;
  }
  return 4;
};

function BestItemsSection() {
  const [itemList, setItemList] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const fetchSortedData = async ({ orderBy, pageSize }) => {
    try {
      const products = await getProducts({ orderBy, pageSize });
      setItemList(products.list);
    } catch (error) {
      console.error("베스트 상품을 불러오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy: "favorite", pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <section className="bestItemsContainer">
      <h1 className="sectionTitle">베스트 상품</h1>

      <div className="bestItemsCardSection">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </section>
  );
}

export default BestItemsSection;
