import React, { useState, useEffect, useRef } from 'react';
import UsedMarketTemplate from '../templates/UsedMarketTemplate';
import useProducts from '../utils/useProducts';

const UsedMarket = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [bestPageSize, setBestPageSize] = useState(4);
  const mainRef = useRef(null);

  useEffect(() => {
    const mediaQueryDesktop = window.matchMedia('(min-width: 1024px)');
    const mediaQueryTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    
    const updatePageSize = () => {
      if (mediaQueryDesktop.matches) {
        setPageSize(5);
        setBestPageSize(4);
      } else if (mediaQueryTablet.matches) {
        setPageSize(3);
        setBestPageSize(2);
      } else {
        setPageSize(2);
        setBestPageSize(1);
      }
    };

    updatePageSize();
    
    mediaQueryDesktop.addEventListener('change', updatePageSize);
    mediaQueryTablet.addEventListener('change', updatePageSize);
    
    return () => {
      mediaQueryDesktop.removeEventListener('change', updatePageSize);
      mediaQueryTablet.removeEventListener('change', updatePageSize);
    };
  }, []);

  const { products: bestProducts, loading: bestLoading, error: bestError } = useProducts({
    page: 1,
    pageSize: bestPageSize,
    sort: 'favorite',
  });

  const { products: allProducts, loading: allLoading, totalPages, error: allError } = useProducts({
    page: currentPage,
    pageSize,
    sort: sortBy,
    search: searchQuery,
  });

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRegisterClick = () => {};

  const sortOptions = [
    { key: '1', value: 'latest', children: '최신순' },
    { key: '2', value: 'favorite', children: '좋아요순' },
  ];

  return (
    <UsedMarketTemplate
      mainRef={mainRef}
      bestProducts={bestProducts}
      bestLoading={bestLoading}
      bestError={bestError}
      allProducts={allProducts}
      allLoading={allLoading}
      allError={allError}
      totalPages={totalPages}
      currentPage={currentPage}
      sortBy={sortBy}
      sortOptions={sortOptions}
      searchInput={searchInput}
      onSearchChange={handleSearchChange}
      onSearchClick={handleSearchClick}
      onSearchKeyPress={handleSearchKeyPress}
      onSortChange={handleSortChange}
      onPageChange={handlePageChange}
      onRegisterClick={handleRegisterClick}
    />
  );
};

export default UsedMarket;
