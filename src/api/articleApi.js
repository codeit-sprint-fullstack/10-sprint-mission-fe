//Article API를 사용해 CRUD, fetch,await 활용
const BASE_URL = "https://panda-market-api-crud.vercel.app/articles";

//GET 하기 : page, pageSize, keyword 쿼리 파라미터를 이용
export async function getArticleList({ page, pageSize, keyword }) {
  try {
    const url = new URL(BASE_URL);
    if (page) url.searchParams.append("page", page);
    if (pageSize) url.searchParams.append("pageSize", pageSize);
    if (keyword) url.searchParams.append("keyword", keyword);
    console.log("요청url:", url.toString());
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET 실패:${res.status}`);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

//GET by ID
export async function getArticle(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`GET 실패:${res.status}`);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// POST newArticle 만들기: title, content, image 포함
export async function createArticle(newArticle) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArticle),
    });
    if (!res.ok) throw new Error(`Create 실패:${res.status}`);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// PATCH하기
export async function patchArticle(id, editedArticle) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedArticle),
    });
    if (!res.ok) throw new Error(`Patch 실패:${res.status}`);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

//DELET 하기
export async function deleteArticle(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`DELETE 실패:${res.status}`);
    // const data = await res.json();
    console.log(`${id} 삭제 성공!`);
    return true;
  } catch (err) {
    console.error(err);
  }
}
