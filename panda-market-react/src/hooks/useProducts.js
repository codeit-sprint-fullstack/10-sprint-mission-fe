import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";

function useProducts(initial = {}) {
  const [page, setPage] = useState(initial.page ?? 1); // 현재 페이지
  const [pageSize, setPageSize] = useState(initial.pageSize ?? 10); // 페이지 당 몇개의 상품 노출할건지
  const [orderBy, setOrderBy] = useState(initial.orderBy ?? "recent"); // 정렬 기준
  const [keyword, setKeyword] = useState(initial.keyword ?? ""); // 사용자가 검색하는 키워드

  const [list, setList] = useState([]); // 불러온 상품 리스트
  const [totalCount, setTotalCount] = useState(0); // 전체 상품 개수
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(""); // 에러

  useEffect(() => {
    const query = { page, pageSize, orderBy, keyword };

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const { items, total } = await fetchProducts(query);
        setList(items);
        setTotalCount(total);
      } catch (error) {
        setError(error.message || "불러오기를 실패했습니다");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();

    return () => {};
  }, [page, pageSize, orderBy, keyword]);

  return {
    list,
    totalCount,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    orderBy,
    setOrderBy,
    keyword,
    setKeyword,
  };
}

export default useProducts;
