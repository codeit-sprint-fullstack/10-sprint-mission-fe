const PRODUCT_BASE_URL = "https://panda-market-api-crud.vercel.app";

async function handleJson(res, tag) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = data?.message || res.statusText;
    console.error(`[Product] ${tag} 실패 (${res.status}): ${msg}`);
    throw new Error(msg);
  }
  return data;
}

export async function getProductList({ page = 1, pageSize = 10, keyword = "" } = {}) {
  try {
    const url = new URL(`${PRODUCT_BASE_URL}/products`);
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);
    url.searchParams.set("keyword", keyword);
    const res = await fetch(url, { method: "GET" });
    return await handleJson(res, "GET /products");
  } catch (e) {
    console.error("[Product] GET /products 에러:", e.message);
    throw e;
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${PRODUCT_BASE_URL}/products/${id}`, { method: "GET" });
    return await handleJson(res, `GET /products/${id}`);
  } catch (e) {
    console.error("[Product] getProduct 에러:", e.message);
    throw e;
  }
}

export async function createProduct({ name, description, price, tags = [], images = [] }) {
  try {
    const res = await fetch(`${PRODUCT_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    return await handleJson(res, "POST /products");
  } catch (e) {
    console.error("[Product] createProduct 에러:", e.message);
    throw e;
  }
}

export async function patchProduct(id, patch) {
  try {
    const res = await fetch(`${PRODUCT_BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    return await handleJson(res, `PATCH /products/${id}`);
  } catch (e) {
    console.error("[Product] patchProduct 에러:", e.message);
    throw e;
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${PRODUCT_BASE_URL}/products/${id}`, { method: "DELETE" });
    return await handleJson(res, `DELETE /products/${id}`);
  } catch (e) {
    console.error("[Product] deleteProduct 에러:", e.message);
    throw e;
  }
}