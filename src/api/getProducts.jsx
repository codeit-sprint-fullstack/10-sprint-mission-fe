const ListProducts = "https://panda-market-api.vercel.app/products";

// getProducts - get Request with api in page, pageSize, orderBy, keyword
export async function getProducts({ page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = {}) {
  try {
    const url = new URL(ListProducts);
    url.searchParams.set("page", String(page));
    url.searchParams.set("pageSize", String(pageSize));
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } 
    if (orderBy) {
      url.searchParams.set("orderBy", orderBy);
    }

    console.log('Fetching URL:', url.toString());
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const dataList = await response.json();
    console.log('API Response:', dataList);

    // validate data array list
    if (Array.isArray(dataList)) {
      return {
        items: dataList,
        total: dataList.length
      };
    }

    // validate data = products
    if (Array.isArray(dataList.products)) {
      return {
        items: dataList.products,
        total: dataList.totalCount || dataList.products.length
      };
    }

    // validate data = list
    if (Array.isArray(dataList.list)) {
      return {
        items: dataList.list,
        total: dataList.totalCount || dataList.list.length
      };
    }

    console.error('Unexpected API response format:', dataList);
    return {
      items: [],
      total: 0
    };

  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      items: [],
      total: 0
    };
  }
}