import axios from "axios";

//Product API를 사용해 CRUD, axios 활용
const instance = axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app",
  timeout: 10000,
});

export async function getProductList(params = {}) {
  const res = await instance.get(`/products`, { params });
  return res.data;
}

export async function getProduct(id) {
  const res = await instance.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(newProduct) {
  const res = await instance.post(`/products`, newProduct);
  return res.data;
}

export async function patchProduct(id, premiumLine) {
  const res = await instance.patch(`/products/${id}`, premiumLine);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await instance.delete(`/products/${id}`);
  return res.data;
}
