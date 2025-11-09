// src/lib/api.js
const BASE = 'https://panda-market-api.vercel.app';

/** 어떤 JSON이어도 "첫 번째 배열"을 찾아 돌려줌 */
function extractArray(json) {
  if (Array.isArray(json)) return json;
  if (json && typeof json === 'object') {
    for (const k of Object.keys(json)) {
      if (Array.isArray(json[k])) return json[k];
    }
  }
  return [];
}

async function tryFetch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return extractArray(await res.json());
}

/** 서버 정렬 파라미터 맵 */
function applySortParams(u, sort) {
  // 여러 서버를 고려해 가능한 쿼리 동시 세팅
  if (sort === 'likes') {
    // json-server 스타일
    u.searchParams.set('_sort', 'likes');
    u.searchParams.set('_order', 'desc');
    // 기타 스타일
    u.searchParams.set('sort', 'likes');
    u.searchParams.set('order', 'desc');
  } else {
    u.searchParams.set('_sort', 'createdAt');
    u.searchParams.set('_order', 'desc');
    u.searchParams.set('sort', 'latest');
    u.searchParams.set('order', 'desc');
  }
}

/** 클라이언트 정렬(서버가 무시했을 때 대비) */
function sortClient(arr, sort) {
  const list = [...arr];
  if (sort === 'likes') {
    list.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
    return list;
  }
  const getDate = (x) => x.createdAt || x.created_at || x.date || x.timestamp;
  list.sort((a, b) => new Date(getDate(b)) - new Date(getDate(a)));
  // 날짜가 전무하면 id 내림차순
  if (!getDate(list[0])) list.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
  return list;
}

/** 상품 목록 조회 (검색/정렬) */
export async function fetchProducts({ q = '', sort = 'latest' } = {}) {
  // 1) 서버 정렬/검색 시도
  const u = new URL(`${BASE}/products`);
  if (q) u.searchParams.set('q', q);
  applySortParams(u, sort);

  try {
    const server = await tryFetch(u);
    // 서버가 정렬을 무시했을 수도 있으니 한 번 더 보정
    return sortClient(server, sort);
  } catch {
    // 2) 실패 시 기본 목록 받아서 클라 정렬/검색
    const fall = await tryFetch(new URL(`${BASE}/products`));
    const filtered = q
      ? fall.filter((x) =>
          JSON.stringify(x).toLowerCase().includes(q.toLowerCase())
        )
      : fall;
    return sortClient(filtered, sort);
  }
}

/** 베스트 상품(좋아요 기준 상위 4개) */
export async function fetchBest() {
  const u = new URL(`${BASE}/products`);
  // 서버가 지원하면 활용
  u.searchParams.set('favorite', 'true');
  applySortParams(u, 'likes');

  let arr = [];
  try {
    arr = await tryFetch(u);
  } catch {
    arr = await tryFetch(new URL(`${BASE}/products`));
  }

  // favorite/favorites 플래그 우선, 없으면 전체에서 좋아요 상위
  const onlyFav = arr.filter(
    (x) => x.favorite === true || x.favorites === true
  );
  const base = onlyFav.length ? onlyFav : arr;
  return sortClient(base, 'likes').slice(0, 4); // 데스크톱 1열 4개
}
