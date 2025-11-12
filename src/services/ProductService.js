// ✅ ProductService.js (확정 작동 버전)
const BASE_URL = 'https://panda-market-api-crud.vercel.app';

// 공통 fetch 함수 (항상 배열 반환)
async function safeFetch(url, options = {}) {
  try {
    console.log('🌐 요청:', url);
    const res = await fetch(url, options);
    if (!res.ok) {
      console.warn(`⚠️ 요청 실패: [${res.status}] ${res.statusText}`);
      return []; // 항상 배열로 반환
    }

    const data = await res.json();
    console.log('📦 응답 데이터:', data);
    return data ?? [];
  } catch (err) {
    console.error('❌ safeFetch 오류:', err.message);
    return [];
  }
}

// ✅ 상품 목록 조회
export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  console.log('🚀 getProductList 실행됨');
  const url = `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
  const result = await safeFetch(url);
  console.log('🔍 getProductList 결과:', result);

  if (!Array.isArray(result)) {
    console.warn('⚠️ Product API 응답이 배열이 아닙니다. []로 대체합니다.');
    return [];
  }

  return result;
}

// ✅ 단일 상품 조회
export async function getProduct(id) {
  const url = `${BASE_URL}/products/${id}`;
  return safeFetch(url);
}

// ✅ 상품 생성
export async function createProduct(productData) {
  const url = `${BASE_URL}/products`;
  return safeFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
}

// ✅ 상품 수정
export async function patchProduct(id, updatedData) {
  const url = `${BASE_URL}/products/${id}`;
  return safeFetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
}

// ✅ 상품 삭제
export async function deleteProduct(id) {
  const url = `${BASE_URL}/products/${id}`;
  return safeFetch(url, { method: 'DELETE' });
}
