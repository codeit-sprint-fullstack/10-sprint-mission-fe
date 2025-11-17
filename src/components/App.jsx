import { useState, useEffect } from "react";
import "./App.css";

import MainHeader from "./common/MainHeader/MainHeader";
import SearchTool from "./common/SearchTool/SearchTool";
import OrderSelect from "./common/OrderSelect/OrderSelect";
import Pagination from "./common/pagination/Pagination";
import Footer from "./common/Footer/Footer";

import BestContent from "./home/BestContent/BestContent";
import SellingContent from "./home/SellingContent/SellingContent";

import ItemRegister from "./item/ItemRegister/ItemRegister";

import { getData } from "../api/api";
import useSortedItems from "../hooks/useSortedItems";
import usePageSize from "../hooks/usePageSize";

function App() {
    const [bestItems, setBestItems] = useState([]);
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("favorite");
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const sortedItems = useSortedItems(items, order);

    const bestPageSize = usePageSize({ mobile: 1, tablet: 2, desktop: 4 });
    const sellingPageSize = usePageSize({ mobile: 4, tablet: 6, desktop: 10 });

    useEffect(() => {
        setPageSize(sellingPageSize);
    }, [sellingPageSize]);

    useEffect(() => {
        setPage(1);
    }, [pageSize, order, keyword]);

    const loadBest = async (size) => {
        try {
            const { items } = await getData({
                page: 1,
                pageSize: size,
                orderBy: "favorite",
                keyword: "",
            });
            setBestItems(items || []);
        } catch (e) {
            console.error(e);
        }
    };

    const loadSelling = async (options) => {
        try {
            setLoading(true);
            setErr(null);
            const { items, totalCount } = await getData(options);
            setItems(items || []);
            setTotalPages(
                Math.max(1, Math.ceil((totalCount ?? 0) / options.pageSize))
            );
        } catch (e) {
            setErr(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (value) => {
        setKeyword(value.trim());
    };

    useEffect(() => {
        loadBest(bestPageSize);
    }, [bestPageSize]);

    useEffect(() => {
        loadSelling({ page, pageSize, orderBy: order, keyword });
    }, [page, order, keyword, pageSize]);

    return (
        <div>
            <MainHeader />
            <main>
                <div className="Bestcontainer">
                    <div>
                        {/* <div className="BestHeader">
                            <h2 className="BestString">베스트 상품</h2>
                        </div>
                        <BestContent items={bestItems} /> */}
                        <div className="SellingHeader">
                            <h2 className="SellingString">판매 중인 상품</h2>
                            <div className="SellingTool">
                                <SearchTool onChange={handleSearchChange} />
                                <ItemRegister />
                                <OrderSelect
                                    value={order}
                                    onChange={setOrder}
                                />
                            </div>
                        </div>
                        {err && (
                            <p style={{ color: "crimson" }}>
                                목록을 불러오지 못했어요.
                            </p>
                        )}
                        {loading ? (
                            <p>로딩중…</p>
                        ) : (
                            <SellingContent items={sortedItems} />
                        )}

                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onChange={setPage}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
export default App;
