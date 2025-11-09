import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import ItemCardList from '../organisms/ItemCardList';
import SearchForm from '../molecules/SearchForm';
import SortBox from '../molecules/SortBox';
import Button from '../atoms/Button';
import PageNumberButtonList from '../organisms/PageNumberButtonList';
import styles from './UsedMarketTemplate.module.css';

const UsedMarketTemplate = ({
  mainRef,
  bestProducts = [],
  bestLoading = false,
  bestError = null,
  allProducts = [],
  allLoading = false,
  allError = null,
  totalPages = 1,
  currentPage = 1,
  sortBy = 'latest',
  sortOptions = [],
  searchInput = '',
  onSearchChange,
  onSearchClick,
  onSearchKeyPress,
  onSortChange,
  onPageChange,
  onRegisterClick,
}) => {
  const handlePageChange = (page) => {
    onPageChange(page);
    if (mainRef && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main ref={mainRef} className={styles.main}>
        <section className={styles.bestSection}>
          <h2 className={styles.sectionTitle}>베스트 상품</h2>
          {bestLoading ? (
            <div className={styles.loading}>로딩 중...</div>
          ) : bestError ? (
            <div className={styles.loading}>에러: {bestError}</div>
          ) : (
            <ItemCardList items={bestProducts} type="best" />
          )}
        </section>

        <section className={styles.allSection}>
          <h2 className={styles.sectionTitle}>판매 중인 상품</h2>
          <div className={styles.controls}>
            <SearchForm
              onChange={onSearchChange}
              onClick={onSearchClick}
              onKeyPress={onSearchKeyPress}
            />
            <Button
              onClick={onRegisterClick}
              style={styles.registerButton}
            >
              상품 등록하기
            </Button>
            <SortBox 
              onChange={onSortChange} 
              data={sortOptions} 
              value={sortBy} 
            />
          </div>
          {allLoading ? (
            <div className={styles.loading}>로딩 중...</div>
          ) : allError ? (
            <div className={styles.loading}>에러: {allError}</div>
          ) : (
            <>
              <ItemCardList items={allProducts} type="all" />
              <PageNumberButtonList
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UsedMarketTemplate;

