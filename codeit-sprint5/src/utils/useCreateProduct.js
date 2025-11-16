import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://panda-market-api.vercel.app';

const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(`${API_BASE_URL}/products`, payload);
      return !!res?.data;
    } catch (e) {
      setError(e?.message || '상품 등록 실패');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export default useCreateProduct;


