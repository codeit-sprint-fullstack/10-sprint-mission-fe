const PRODUCT_BASE = "http://localhost:4000/products";

// Product List 조회 (GET) - page, pageSize, orderBy, keyword 쿼리
export async function fetchProducts({
  page = 1, // 현재 페이지
  pageSize = 10, // 페이지 당 몇개의 상품 노출할건지
  orderBy = "recent", // 정렬 기준
  keyword = "", // 사용자가 검색하는 키워드
} = {}) {
  let response;
  let apiData;

  try {
    const url = new URL(PRODUCT_BASE);

    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);
    if (keyword) url.searchParams.set("keyword", keyword);
    if (orderBy) url.searchParams.set("orderBy", orderBy);

    response = await fetch(url, {
      method: "GET",
    });
  } catch (error) {
    const message = `오류가 발생했습니다: ${error.message}`;
    console.error(message);
    throw new Error(message);
  }

  try {
    apiData = await response.json();
  } catch (error) {
    const message = `데이터를 JSON 형식으로 변환하는데 오류가 발생했습니다: ${error.message}`;
    console.error(message);
    throw new Error(message);
  }

  if (!response.ok) {
    const message =
      apiData?.message ||
      `요청이 실패했습니다: ${response.status} ${response.statusText}`;
    console.error(message);
    throw new Error(message);
  }

  const items = Array.isArray(apiData.list) ? apiData.list : [];
  const total = Number(apiData.totalCount) || 0;

  return {
    items,
    total,
  };
}

// Product 등록 (POST) - 상품 정보(name, description, price, tags)
export async function createProduct({ name, description, price, tags }) {
  let response;
  let data = {};

  try {
    response = await fetch(PRODUCT_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
      }),
    });

    data = await response.json();

    if (!response.ok) {
      const message =
        data?.message ||
        `요청이 실패했습니다: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
