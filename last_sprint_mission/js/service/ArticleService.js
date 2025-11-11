const ARTICLE_BASE = "https://panda-market-api-crud.vercel.app/articles";

// 2xx 아니면 에러로 처리하기 (catch/then 버전)
function passOk(response) {
  return response
    .json()
    .catch(() => ({}))
    .then((body) => {
      if (!response.ok) {
        const message =
          body?.message ||
          `Request failed: ${response.status} ${response.statusText}`;
        console.error(message);
        throw new Error(message);
      }
      return body;
    });
}

// Article List 조회 (GET) - page, pageSize, keyword 쿼리
export function getArticleList({ page = 1, pageSize = 10, keyword = "" }) {
  const url = new URL(ARTICLE_BASE);
  url.searchParams.set("page", page);
  url.searchParams.set("pageSize", pageSize);
  if (keyword) url.searchParams.set("keyword", keyword);

  return fetch(url.toString(), {
    method: "GET",
  })
    .then(passOk)
    .catch((error) => {
      throw error;
    });
}

// Article 상세 조회 (GET) - articleId 이용
export function getArticle(articleId) {
  const url = `${ARTICLE_BASE}/${articleId}`;

  return fetch(url, {
    method: "GET",
  })
    .then(passOk)
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
}

// Article 생성 (POST) - title, content, image 포함
export function createArticle({ title, content, image }) {
  const url = ARTICLE_BASE;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, image }),
  })
    .then(passOk)
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
}

// Article 수정 (PATCH)
export function patchArticle(articleId, changeData) {
  const url = `${ARTICLE_BASE}/${articleId}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changeData),
  })
    .then(passOk)
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
}

// Article 삭제 (DELETE)
export function deleteArticle(articleId) {
  const url = `${ARTICLE_BASE}/${articleId}`;
  return fetch(url, {
    method: "DELETE",
  })
    .then(passOk)
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
}
