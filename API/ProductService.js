// API URL
const API_URL = 'https://panda-market-api-crud.vercel.app/api/v1/products';

async function handleProductResponse(response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    console.error("Product API Error:", errorMessage);
    throw new Error(`API 요청 실패 (${response.status}): ${errorMessage}`);
  }
  return response.json();
}

// 목록 조회
export async function getProductList(params = {}) {
  try {
    const url = new URL(API_URL);
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });
    const res = await fetch(url.toString());
    return await handleProductResponse(res);
  } catch (error) {
    throw error;
  }
}

// ID 조회
export async function getProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    return await handleProductResponse(res);
  } catch (error) {
    throw error;
  }
}

// 생성
export async function createProduct(productData) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return await handleProductResponse(res);
  } catch (error) {
    throw error;
  }
}

// 수정
export async function patchProduct(id, productData) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return await handleProductResponse(res);
  } catch (error) {
    throw error;
  }
}

// 삭제
export async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return await handleProductResponse(res);
  } catch (error) {
    throw error;
  }
}
