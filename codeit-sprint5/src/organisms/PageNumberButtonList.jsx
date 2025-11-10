import React from 'react';
import PageNumberButton from '../molecules/PageNumberButton';
import styles from './PageNumberButtonList.module.css';

const PageNumberButtonList = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageNumberButton
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? styles.active : styles.inactive}
        >
          {i}
        </PageNumberButton>
      );
    }

    return pages;
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={styles.arrowButton}
      >
        {'<'}
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.arrowButton}
      >
        {'>'}
      </button>
    </div>
  );
};

export default PageNumberButtonList;

