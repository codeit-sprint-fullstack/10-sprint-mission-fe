import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://panda-market-api.vercel.app';

const useProducts = ({ page = 1, pageSize = 10, sort = 'latest', search = '' } = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {
          page,
          pageSize,
          sort,
        };
        
        if (search) {
          params.search = search;
        }

        const response = await axios.get(`${API_BASE_URL}/products`, { params });
        
        const data = response.data;
        const productsList = data.list || data.products || data.data || [];
        const totalCount = data.totalCount || data.total || 0;
        
        setProducts(productsList);
        setTotalPages(Math.ceil(totalCount / pageSize) || 1);
      } catch (err) {
        setError(err.message || '상품을 불러오는데 실패했습니다.');
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize, sort, search]);

  return { products, loading, error, totalPages };
};

export default useProducts;

