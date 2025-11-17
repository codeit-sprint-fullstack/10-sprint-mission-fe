const BASE_URL = import.meta.env.VITE_API_URL;

export async function getData({
    page,
    pageSize,
    orderBy = "recent",
    keyword = "",
}) {
    const offset = (page - 1) * pageSize;
    const params = new URLSearchParams({
        offset: offset.toString(),
        limit: pageSize.toString(),
        orderBy,
        keyword,
    });

    const res = await fetch(`${BASE_URL}/products?${params.toString()}`);
    console.log("status:", res.status);
    console.log("content-type:", res.headers.get("content-type"));
    if (!res.ok) {
        throw new Error("상품 목록을 가져오지 못했습니다.");
    }
    const body = await res.json();
    return body;
}

export async function createProduct(productData) {
    const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error("상품 등록 실패:", res.status, errorBody);
        throw new Error("상품 등록에 실패했습니다.");
    }

    const body = await res.json();
    return body;
}
