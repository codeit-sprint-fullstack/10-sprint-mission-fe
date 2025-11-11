import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import EmptyResult from "../components/EmptyResult";
import Pagination from "../components/Pagination";
import SortDropdown from "../components/SortDropdown";

const price = (n) => {
  const number = n ?? 0;

  const formattedNumber = number.toLocaleString("ko-KR");

  return formattedNumber + "원";
}; // toLocaleString('ko-KR')을 사용하면 한국 로케일 기준에 맞춰 3자리마다 쉼표를 자동으로 삽입(알아두자)

function useResponsivePage(setPageSize, mode = "all") {
  useEffect(() => {
    const refresh = () => {
      const screenWidth = window.innerWidth;

      if (mode === "best") {
        if (screenWidth >= 1200) {
          setPageSize(4);
        } else if (screenWidth >= 744) {
          setPageSize(2);
        } else {
          setPageSize(1);
        }
      } else {
        if (screenWidth >= 1200) {
          setPageSize(10);
        } else if (screenWidth >= 744) {
          setPageSize(6);
        } else {
          setPageSize(4);
        }
      }
    };
    refresh();
    window.addEventListener("resize", refresh);
    return () => {
      window.removeEventListener("resize", refresh);
    };
  }, [setPageSize, mode]);
}

function ProductCard({ item }) {
  return (
    <article className="card">
      <img className="card-image" src={item?.images?.[0]} alt={item.name} />
      <h3 className="card-title">{item.name}</h3>
      <p className="card-price">{price(item.price ?? 0)}</p>
      <p className="card-fav">♡ {item.favoriteCount ?? 0}</p>
    </article>
  );
}

function Grid({ items, field = "all" }) {
  const productList = Array.isArray(items) ? items : [];

  return (
    <div className={field === "best" ? "grid-best" : "grid-all"}>
      {productList.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function SecondhandMarket() {
  const best = useProducts({ page: 1, pageSize: 4, orderBy: "favorite" });
  const all = useProducts({ page: 1, pageSize: 10, orderBy: "recent" });
  const [inputValue, setInputValue] = useState("");

  useResponsivePage(all.setPageSize, "all");
  useResponsivePage(best.setPageSize, "best");

  const totalPages = Math.max(1, Math.ceil(all.totalCount / all.pageSize));

  return (
    <main>
      {/* 베스트 상품 */}
      <section className="section best-products">
        <div className="container">
          <h2 className="section-title">베스트 상품</h2>
          {best.loading ? <div>로딩중...</div> : null}
          {best.error ? <div className="error">{best.error}</div> : null}
          {!best.loading && !best.error && best.list && (
            <Grid items={best.list} field="best" />
          )}
        </div>
      </section>

      {/* 전체 상품 */}
      <section className="section all-products">
        <div className="container">
          <div className="top-bar">
            <div className="top-bar-row first-row">
              <h2 className="section-title">판매 중인 상품</h2>
              <button className="register-button">상품 등록하기</button>
            </div>

            <div className="controls top-bar-row second-row">
              <input
                type="search"
                placeholder="🔍 검색할 상품을 입력해주세요"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    all.setKeyword(inputValue);
                    all.setPage(1);
                  }
                }}
              />
              <SortDropdown
                value={all.orderBy}
                onChange={(value) => {
                  all.setOrderBy(value);
                  all.setPage(1);
                }}
              />
            </div>
          </div>

          {all.loading ? <div>로딩중...</div> : null}
          {all.error ? <div className="error">{all.error}</div> : null}
          {!all.loading && !all.error && all.list && (
            <Grid items={all.list} field="all" />
          )}
          {!all.loading && !all.error && all.list && all.list.length === 0 && (
            <EmptyResult message="검색 결과가 없습니다 :(˘•̥ㅁ•̥˘ ):" />
          )}

          {/* 페이지네이션 */}
          <Pagination
            page={all.page}
            totalPages={totalPages}
            onChange={(pageNumber) => all.setPage(pageNumber)}
            maxVisiblePages={5}
          />
        </div>
      </section>
    </main>
  );
}

export default SecondhandMarket;
