import React, { useState, useEffect } from 'react';
import LandingTemplate from '../templates/LandingTemplate';
import { useNavigate } from 'react-router';
import useProducts from '../utils/useProducts';

const Landing = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const tablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const update = () => {
      if (desktop.matches) setPageSize(8);
      else if (tablet.matches) setPageSize(6);
      else setPageSize(4);
    };
    update();
    desktop.addEventListener('change', update);
    tablet.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
    };
  }, []);

  const { products: bestProducts } = useProducts({
    page: 1,
    pageSize: Math.min(8, pageSize),
    sort: 'favorite',
  });

  const { products: latestProducts } = useProducts({
    page: 1,
    pageSize,
    sort: 'latest',
    search: searchQuery,
  });

  const navigate = useNavigate();
  const handleSearchChange = (e) => setSearchInput(e.target.value);
  const handleSearchClick = () => setSearchQuery(searchInput);
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') handleSearchClick();
  };

  return (
    <LandingTemplate
      bestProducts={bestProducts}
      latestProducts={latestProducts}
      onSearchChange={handleSearchChange}
      onSearchClick={handleSearchClick}
      onSearchKeyPress={handleSearchKeyPress}
      onRegisterClick={() => navigate('/registration')}
    />
  );
};

export default Landing;


