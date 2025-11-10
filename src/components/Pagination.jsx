import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="page-nav"
        >
          ◁
        </button>
      )}
      
      {(() => {
        let pageNumbers = [];
        const maxVisible = 5;
        const halfVisible = Math.floor(maxVisible / 2);
        
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        // Adjust startPage if we're near the end
        if (endPage - startPage + 1 < maxVisible) {
          startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            i === currentPage ? (
              <button
                key={i}
                className="active"
                disabled
              >
                {i}
              </button>
            ) : (
              <button
                key={i}
                onClick={() => onPageChange(i)}
              >
                {i}
              </button>
            )
          );
        }
        
        return pageNumbers;
      })()}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="page-nav"
        >
          ▷
        </button>
      )}
    </div>
  );
}

export default Pagination;