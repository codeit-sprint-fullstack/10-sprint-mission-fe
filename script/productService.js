// 상품 목록 불러오는 함수

async function getProductList(page = 1, pageSize = 10, keyword = "") {
  try {
    const res = await fetch(
      `https://panda-market-api-crud.vercel.app/Products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    if (!res.ok) {
      // HTTP 상태가 200~299가 아닐 때
      throw new Error(`HTTP 오류! 상태: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("상품 목록 불러오기 실패:", error);
  }
}

// 단일 상품 함수

async function getProduct(id) {
  try {
    const res = await fetch(
      `https://panda-market-api-crud.vercel.app/Products/${id}`
    );
    if (!res.ok) {
      // HTTP 상태가 200~299가 아닐 때
      throw new Error(`HTTP 오류! 상태: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("상품 목록 불러오기 실패:", error);
  }
}

// 상품추가하기 함수

async function createProduct(name, description, price, tags, images) {
  try {
    const res = await fetch(
      "https://panda-market-api-crud.vercel.app/Products",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price,
          tags,
          images,
        }),
      }
    );
    if (!res.ok) {
      // HTTP 상태가 200~299가 아닐 때
      throw new Error(`HTTP 오류! 상태: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("상품 목록 불러오기 실패:", error);
  }
}

// 상품 수정

async function patchProduct(id, name, description, price, tags, images) {
  try {
    const res = await fetch(
      `https://panda-market-api-crud.vercel.app/Products/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price,
          tags,
          images,
        }),
      }
    );
    if (!res.ok) {
      // HTTP 상태가 200~299가 아닐 때
      throw new Error(`HTTP 오류! 상태: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("상품 목록 불러오기 실패:", error);
  }
}

// 상품 삭제

async function deleteProduct(id) {
  try {
    const res = await fetch(
      `https://panda-market-api-crud.vercel.app/Products/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Typq": "application/json" },
      }
    );
    if (!res.ok) {
      // HTTP 상태가 200~299가 아닐 때
      throw new Error(`HTTP 오류! 상태: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("상품 목록 불러오기 실패:", error);
  }
}

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
