// 🛍 ProductService.js (axios 전혀 사용 안 함, fetch 전용)
const BASE_URL = 'https://panda-market-api.vercel.app';

// 공통 fetch wrapper
async function safeFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[StatusCode ${res.status}] ${text || res.statusText}`);
  }
  return res.json();
}

// GET: Product 목록 조회
export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  const url = `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
  return safeFetch(url);
}

// GET: 단일 Product 조회
export async function getProduct(id) {
  const url = `${BASE_URL}/products/${id}`;
  return safeFetch(url);
}

// POST: 새 Product 생성
export async function createProduct(productData) {
  const url = `${BASE_URL}/products`;
  return safeFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
}

// PATCH: Product 수정
export async function patchProduct(id, updatedData) {
  const url = `${BASE_URL}/products/${id}`;
  return safeFetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
}

// DELETE: Product 삭제
export async function deleteProduct(id) {
  const url = `${BASE_URL}/products/${id}`;
  return safeFetch(url, { method: 'DELETE' });
}
