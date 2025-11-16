const BASE_URL = "https://panda-market-api.vercel.app";

export async function getData({
    page,
    pageSize,
    orderBy = "favorite",
    keyword = "",
}) {
    const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
    const res = await fetch(`${BASE_URL}/products?${query}`);
    const body = await res.json();
    return body;
}
