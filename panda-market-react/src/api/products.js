const PRODUCT_BASE = "https://panda-market-api.vercel.app/products";

// Product List 조회 (GET) - page, pageSize, orderBy, keyword 쿼리
export async function fetchProducts({
  page = 1, // 현재 페이지
  pageSize = 10, // 페이지 당 몇개의 상품 노출할건지
  orderBy = "recent", // 정렬 기준
  keyword = "", // 사용자가 검색하는 키워드
} = {}) {
  const url = new URL(PRODUCT_BASE);
  url.searchParams.set("page", page);
  url.searchParams.set("pageSize", pageSize);
  if (keyword) url.searchParams.set("keyword", keyword);
  if (orderBy) url.searchParams.set("orderBy", orderBy);

  const response = await fetch(url.toString(), {
    method: "GET",
  });

  if (!response.ok) {
    let body = {};
    try {
      body = await response.json();
    } catch {
      // json 형태가 아님 !
    }
    const message =
      body?.message ||
      `요청이 실패했습니다: ${response.status} ${response.statusText}`;
    console.error(message);
    throw new Error(message);
  }
  const apiData = await response.json();
  return {
    items: Array.isArray(apiData.list) ? apiData.list : [],
    total: Number(apiData.totalCount) || 0,
  };
}
