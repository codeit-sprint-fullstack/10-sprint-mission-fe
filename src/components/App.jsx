import BestContent from "./BestContent";
import SellingContent from "./SellingContent";
import MainHeader from "./MainHeader";
import "./App.css";
import { useState, useEffect } from "react";
import { getData } from "../api";
import SearchTool from "./SearchTool";
import ItemRegister from "./ItemRegister";
import OrderSelect from "./OrderSelect";
import Pagination from "./Pagination";
import useSortedItems from "../customhook/useSortedItems";
import Footer from "./footer";
import usePageSize from "../customhook/usePageSize";

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
            const { list } = await getData({
                page: 1,
                pageSize: size,
                orderBy: "favorite",
                keyword: "",
            });
            setBestItems(list || []);
        } catch (e) {
            console.error(e);
        }
    };

    const loadSelling = async (options) => {
        try {
            setLoading(true);
            setErr(null);
            const { list, totalCount } = await getData(options);
            setItems(list || []);
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
                        <div className="BestHeader">
                            <h2 className="BestString">베스트 상품</h2>
                        </div>
                        <BestContent items={bestItems} />
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
