const BASE_URL = 'http://localhost:4000';

function handleResponse(res, label) {
  if (!res.ok) {
    console.error(`❌ ${label} 실패: [${res.status}] ${res.statusText}`);
    throw new Error(`${label} 요청 실패`);
  }
  return res.json();
}

export async function getProductList({
  page = 1,
  pageSize = 10,
  keyword = '',
} = {}) {
  try {
    const query = new URLSearchParams({ page, pageSize, keyword }).toString();
    const res = await fetch(`${BASE_URL}/products?${query}`);
    return await handleResponse(res, 'getProductList');
  } catch (err) {
    console.error('getProductList error:', err.message);
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return await handleResponse(res, 'getProduct');
  } catch (err) {
    console.error('getProduct error:', err.message);
  }
}

export async function createProduct({
  name,
  description,
  price,
  tags = [],
  images = [],
}) {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    return await handleResponse(res, 'createProduct');
  } catch (err) {
    console.error('createProduct error:', err.message);
  }
}

export async function patchProduct(
  id,
  { name, description, price, tags, images }
) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    return await handleResponse(res, 'patchProduct');
  } catch (err) {
    console.error('patchProduct error:', err.message);
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
    return await handleResponse(res, 'deleteProduct');
  } catch (err) {
    console.error('deleteProduct error:', err.message);
  }
}
