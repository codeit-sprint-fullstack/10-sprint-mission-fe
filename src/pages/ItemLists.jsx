import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import { getProducts } from "../api/getProducts";

function ItemLists() {
    const [bestProducts, setBestProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [sortOrder, setSortOrder] = useState("recent");
    const [isSearching, setIsSearching] = useState(false);
    const PAGE_SIZE = 10;

    // Fetch best products
    useEffect(() => {
        const fetchBestProducts = async () => {
            try {
                console.log('Fetching best products...');
                const result = await getProducts({ 
                    page: 1, 
                    pageSize: 4, 
                    orderBy: "favorite" 
                });
                console.log('Best products result:', result);
                setBestProducts(result?.items || []);
            } catch (error) {
                console.error("Error fetching best products:", error);
            }
        };
        fetchBestProducts();
    }, []);

    // Fetch products with pagination
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products...');
                const result = await getProducts({
                    page: currentPage,
                    pageSize: PAGE_SIZE,
                    orderBy: sortOrder,
                    keyword: searchKeyword
                });
                console.log('Products result:', result);
                if (result && result.items) {
                    setProducts(result.items);
                    setTotalPages(Math.ceil(result.total / PAGE_SIZE));
                } else {
                    console.error('Invalid response format:', result);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [currentPage, sortOrder, searchKeyword]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

        // Handle search input change
        const handleSearchInputChange = (e) => {
            setSearchInput(e.target.value);
        };

        // Handle search submission
        const handleSearch = () => {
            setSearchKeyword(searchInput);
            setCurrentPage(1);
            setIsSearching(!!searchInput);
        };

        // Handle search on Enter key press
        const handleSearchKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        };

        // Handle search clear
        const handleSearchClear = () => {
            setSearchInput("");
            setSearchKeyword("");
            setIsSearching(false);
            setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        setCurrentPage(1);
    };

    const handleMobileSortClick = (value) => {
        setSortOrder(value);
        setCurrentPage(1);
        // Hide mobile dropdown
        document.querySelector('.mobile-sort-dropdown').style.display = 'none';
    };

    return (
        <>
            <main>
                <section>
                    <h2 className="section-title">베스트 상품</h2>
                    <div className="playlists">
                        {bestProducts.map((product) => (
                            <div key={product.id} className="playlist">
                                <img 
                                    className="playlist-thumb" 
                                    src={product.images || '/src/assets/icons/products/default.png'} 
                                    alt={product.name}
                                />
                                <div className="playlist-title">
                                    {product.name}
                                </div>
                                <div className="playlist-artist">
                                    {product.price.toLocaleString()}원
                                </div>
                                <div className="playlist-like-count">
                                    ♡ {product.favoriteCount}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                <section>
                    <div className="section-header">
                        <div className="section-header-left">
                                <h2 className="section-title">
                                    {isSearching 
                                        ? `'${searchKeyword}' 검색 결과`
                                        : '판매중인 상품'
                                    }
                                </h2>
                            <button className="register-button mobile-only">상품등록하기</button>
                        </div>
                        <div className="section-controls desktop-only">
                            <div className="search-container">
                                <input 
                                    type="text" 
                                    className="search-input" 
                                    placeholder="상품을 검색해보세요"
                                        value={searchInput}
                                        onChange={handleSearchInputChange}
                                        onKeyPress={handleSearchKeyPress}
                                />
                                    {searchInput && (
                                        <button 
                                            className="search-clear-button" 
                                            onClick={handleSearchClear}
                                            aria-label="검색어 지우기"
                                        >
                                            ×
                                        </button>
                                    )}
                                    <button 
                                        className="search-button" 
                                        onClick={handleSearch}
                                        aria-label="검색"
                                    >
                                    <img src="/src/assets/icons/ic_search.svg" alt="검색" width="20" height="20" />
                                </button>
                            </div>
                            <button className="register-button">상품등록하기</button>
                            <select 
                                className="sort-select"
                                value={sortOrder}
                                onChange={handleSortChange}
                            >
                                <option value="recent">최신순</option>
                                <option value="favorite">좋아요순</option>
                            </select>
                        </div>
                        
                        <div className="mobile-controls mobile-only">
                            <div className="mobile-search-bar">
                                <img src="/src/assets/icons/ic_search.svg" alt="검색" width="20" height="20" className="search-icon" />
                                <input 
                                    type="text" 
                                    className="search-input" 
                                    placeholder="상품을 검색해보세요"
                                        value={searchInput}
                                        onChange={handleSearchInputChange}
                                        onKeyPress={handleSearchKeyPress}
                                />
                                    {searchInput && (
                                        <button 
                                            className="search-clear-button" 
                                            onClick={handleSearchClear}
                                            aria-label="검색어 지우기"
                                        >
                                            ×
                                        </button>
                                    )}
                            </div>
                            <button 
                                className="sort-toggle" 
                                aria-label="정렬 옵션"
                                onClick={() => {
                                    const dropdown = document.querySelector('.mobile-sort-dropdown');
                                    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                                }}
                            >
                                <img src="/src/assets/icons/ic_sort.svg" alt="메뉴" width="45" height="45" />
                            </button>
                            <div className="mobile-sort-dropdown" style={{display: 'none'}}>
                                <button 
                                    className="sort-option" 
                                    onClick={() => handleMobileSortClick('recent')}
                                >
                                    최신순
                                </button>
                                <button 
                                    className="sort-option" 
                                    onClick={() => handleMobileSortClick('favorite')}
                                >
                                    좋아요순
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="playlists">
                        {products.length === 0 ? (
                            isSearching ? (
                                <div className="no-results">검색하신 상품을 찾지 못하였습니다</div>
                            ) : (
                                <></>
                            )
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="playlist">
                                    <img 
                                        className="playlist-thumb" 
                                        src={product.images || '/src/assets/products/default.png'} 
                                        alt={product.name}
                                    />
                                    <div className="playlist-title">
                                        {product.name}
                                    </div>
                                    <div className="playlist-artist">
                                        {product.price.toLocaleString()}원
                                    </div>
                                    <div className="playlist-like-count">
                                        ♡ {product.favoriteCount}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                <section>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </section>
            </main>
        </>
    );
}

export default ItemLists;