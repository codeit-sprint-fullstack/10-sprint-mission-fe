// src/pages/MarketPage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { fetchProducts, fetchBest } from '../lib/api';
import { normalize } from '../lib/shape';
import SearchBox from '../components/SearchBox';
import SortBar from '../components/SortBar';
import Pagination from '../components/Pagination';
import Card from '../components/Card';

export default function MarketPage() {
  // 검색/정렬/페이징
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('latest'); // 'latest' | 'likes'
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // 데이터 상태
  const [list, setList] = useState([]);
  const [best, setBest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  // 베스트 1회 로드
  useEffect(() => {
    fetchBest()
      .then((d) => (Array.isArray(d) ? d.map(normalize) : []))
      .then(setBest)
      .catch(() => setBest([]));
  }, []);

  // 검색/정렬에 따른 목록 로드
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr('');

    fetchProducts({ q, sort })
      .then((data) => {
        if (!alive) return;
        const arr = Array.isArray(data) ? data.map(normalize) : [];
        setList(arr);
      })
      .catch((e) => {
        if (!alive) return;
        setErr(e.message || '조회 실패');
        setList([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [q, sort]);

  // 검색/정렬이 바뀌면 1페이지로
  useEffect(() => {
    setPage(1);
  }, [q, sort]);

  // 입력 디바운스 (250ms)
  const onChangeQ = useMemo(() => {
    let t;
    return (eOrVal) => {
      const val =
        typeof eOrVal === 'string' ? eOrVal : eOrVal?.target?.value ?? '';

      clearTimeout(t);
      t = setTimeout(() => setQ(val.trim()), 250);
    };
  }, []);

  // 안전 가드 및 페이징
  const items = Array.isArray(list) ? list : [];
  const bestItems = Array.isArray(best) ? best : [];
  const paged = items.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <main className="MainFrame">
        {bestItems.length > 0 && (
          <section className="BestFrame">
            <h2>베스트 상품</h2>
            <ul className="CardGrid">
              {bestItems.map((b) => (
                <Card key={b.id} item={b} />
              ))}
            </ul>
          </section>
        )}

        {/* SearchBar (가운데 검색, 우측 버튼/정렬) */}
        <section className="SellingFrame">
          <div className="SellingFrame__header">
            <h2>판매 중인 상품</h2>
            <div className="SearchBar">
              <SearchBox value={q} onChange={onChangeQ} />
              <button className="primary">상품 등록하기</button>
              <SortBar value={sort} onChange={setSort} />
            </div>
          </div>
        </section>

        {/* 판매 중인 상품 Frame */}
        <section className="SellingFrame">
          {loading && <p>불러오는 중…</p>}
          {err && !loading && <p className="error">에러: {err}</p>}
          {!loading && !err && items.length === 0 && (
            <p>검색 결과가 없습니다.</p>
          )}

          {!loading && !err && paged.length > 0 && (
            <>
              <ul className="CardGrid">
                {paged.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </ul>

              <Pagination
                page={page}
                total={items.length}
                pageSize={pageSize}
                onChange={setPage}
              />
            </>
          )}
        </section>
      </main>
    </>
  );
}
