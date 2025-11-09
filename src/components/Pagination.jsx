// src/components/Pagination.jsx
export default function Pagination({
  page,
  total,
  pageSize = 8,
  onChange,
  maxButtons = 7,
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  const clamp = (n) => Math.min(pages, Math.max(1, n));

  const makePages = () => {
    if (pages <= maxButtons)
      return Array.from({ length: pages }, (_, i) => i + 1);
    const w = 2,
      set = new Set([1, 2, pages - 1, pages]);
    for (let i = page - w; i <= page + w; i++)
      if (i >= 1 && i <= pages) set.add(i);
    const arr = [...set].sort((a, b) => a - b),
      out = [];
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i]);
      if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push('…');
    }
    return out;
  };
  const list = makePages();
  const go = (n) => onChange?.(clamp(n));

  return (
    <nav className="pg" aria-label="페이지네이션">
      <button
        className="pg__btn"
        disabled={page === 1}
        onClick={() => go(page - 1)}
        aria-label="이전"
      >
        ‹
      </button>
      {list.map((it, i) =>
        it === '…' ? (
          <span key={`dot-${i}`} className="pg__dot">
            …
          </span>
        ) : (
          <button
            key={it}
            className={`pg__btn ${it === page ? 'is-active' : ''}`}
            aria-current={it === page ? 'page' : undefined}
            onClick={() => go(it)}
          >
            {it}
          </button>
        )
      )}
      <button
        className="pg__btn"
        disabled={page === pages}
        onClick={() => go(page + 1)}
        aria-label="다음"
      >
        ›
      </button>
    </nav>
  );
}
