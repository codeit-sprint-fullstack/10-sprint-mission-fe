import "./Pagination.css";

function Pagination({
  page, // 현재 페이지
  totalPages, // 총 페이지 수
  onChange, // 페이지 변경
  maxVisiblePages = 5, // 가운데 정렬된 페이지 버튼 수
  className = "",
}) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = getPageArray(page, totalPages, maxVisiblePages);

  const go = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === page)
      return;
    onChange(pageNumber);
  };

  return (
    <nav className={`pagination ${className}`}>
      <button type="button" disabled={page <= 1} onClick={() => go(page - 1)}>
        &lt;
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={pageNumber === page ? "active" : ""}
          onClick={() => go(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
      >
        &gt;
      </button>
    </nav>
  );
}

function getPageArray(currentPage, totalPages, maxVisiblePages = 5) {
  const half = Math.floor(maxVisiblePages / 2);
  let start = currentPage - half;
  let end = currentPage + half;

  if (start < 1) {
    start = 1;
    end = Math.min(totalPages, maxVisiblePages);
  }
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisiblePages + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default Pagination;
