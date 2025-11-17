import "./Pagination.css";
import leftbtn from "../../../assets/img/Button-left.svg";
import rightbtn from "../../../assets/img/Button-right.svg";

function Pagination({ page, totalPages, onChange }) {
    if (!totalPages || totalPages <= 1) return null;

    const blockSize = 5;
    const blockIndex = Math.floor((page - 1) / blockSize);
    const start = blockIndex * blockSize + 1;
    const end = Math.min(start + blockSize - 1, totalPages);

    const pages = [];
    for (let p = start; p <= end; p++) pages.push(p);

    const go = (p) => {
        if (p < 1 || p > totalPages || p === page) return;
        onChange(p);
    };

    return (
        <div className="pagination" role="navigation" aria-label="Pagination">
            <button
                type="button"
                className="page-btn"
                onClick={() => go(page - 1)}
                disabled={page === 1}
                aria-label="Previous Page"
            >
                <img src={leftbtn} alt="" aria-hidden="true" />
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    type="button"
                    className={`page-btn ${p === page ? "selected" : ""}`}
                    onClick={() => go(p)}
                    aria-current={p === page ? "page" : undefined}
                >
                    {p}
                </button>
            ))}

            <button
                type="button"
                className="page-btn"
                onClick={() => go(page + 1)}
                disabled={page === totalPages}
                aria-label="Next Page"
            >
                <img src={rightbtn} alt="" aria-hidden="true" />
            </button>
        </div>
    );
}

export default Pagination;
