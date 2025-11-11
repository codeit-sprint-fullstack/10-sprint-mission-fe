const PRODUCT_BASE = "https://panda-market-api-crud.vercel.app/products";

// 2xx 아니면 에러로 처리하기 (async/await 버전)
async function passOk(response) {
  let body = {};
  try {
    body = await response.json();
  } catch {
    body = {};
  }

  if (!response.ok) {
    const message =
      body?.message ||
      `Request failed: ${response.status} ${response.statusText}`;
    console.error(message);
    throw new Error(message);
  }
  return body;
}

// 상품 목록 조회 (GET) - page, pageSize, keyword 쿼리
export async function getProductList({
  page = 1,
  pageSize = 10,
  keyword = "",
}) {
  const url = new URL(PRODUCT_BASE);
  url.searchParams.set("page", page);
  url.searchParams.set("pageSize", pageSize);
  if (keyword) url.searchParams.set("keyword", keyword);

  const response = await fetch(url.toString(), {
    method: "GET",
  });
  return passOk(response);
}

// 상품 상세 조회 (GET) - productId 이용
export async function getProduct(productId) {
  const response = await fetch(`${PRODUCT_BASE}/${productId}`, {
    method: "GET",
  });
  return passOk(response);
}

// 상품 생성 (POST) - name, description, price, tags, images 포함
export async function createProduct({
  name,
  description,
  price,
  tags = [],
  images = [],
}) {
  const response = await fetch(PRODUCT_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price, tags, images }),
  });
  return passOk(response);
}

// 상품 수정 (PATCH)
export async function patchProduct(productId, changeData = {}) {
  const response = await fetch(`${PRODUCT_BASE}/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changeData),
  });
  return passOk(response);
}

// 상품 삭제 (DELETE)
export async function deleteProduct(productId) {
  const response = await fetch(`${PRODUCT_BASE}/${productId}`, {
    method: "DELETE",
  });
  return passOk(response);
}
