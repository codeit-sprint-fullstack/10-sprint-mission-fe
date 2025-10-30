// 게시물 리스트
async function getArticleList(page = 1, pageSize = 10, keyword = "") {
  fetch(
    `https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP 오류! 상태: ${res.status}`);
      }
      return res.json();
    })

    .then((data) => console.log(data))
    .catch((err) => console.error("게시글이 존재하지않습니다:", err.message));
}

// 해당 게시물

async function getArticle(id) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP 오류! 상태: ${res.status}`);
      }
      return res.json();
    })

    .then((data) => console.log(data))
    .catch((err) => console.error("게시글이 존재하지않습니다:", err.message));
}

// 게시글 작성

async function createArticle(title, content, image) {
  fetch(`https://panda-market-api-crud.vercel.app/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP 오류! 상태: ${res.status}`);
      }
      return res.json();
    })

    .then((data) => console.log(data))
    .catch((err) => console.error("게시글이 존재하지않습니다:", err.message));
}

// 게시글 수정

async function patchArticle(id, title, content, image) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP 오류! 상태: ${res.status}`);
      }
      return res.json();
    })

    .then((data) => console.log(data))
    .catch((err) => console.error("게시글이 존재하지않습니다:", err.message));
}

// 게시글 삭제

async function deleteArticle(id) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP 오류! 상태: ${res.status}`);
      }
      return res.json();
    })

    .then((data) => console.log(data))
    .catch((err) => console.error("게시글이 존재하지않습니다:", err.message));
}

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
