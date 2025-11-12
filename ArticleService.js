// 📰 ArticleService.js
const BASE_URL = 'https://panda-market-api-crud.vercel.app';

// GET: Article 목록 조회 (page, pageSize, keyword)
export function getArticleList(page = 1, pageSize = 10, keyword = '') {
  const query = `?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
  return fetch(`${BASE_URL}/articles${query}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`[StatusCode ${response.status}] ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('❌ getArticleList Error:', error.message);
    });
}

// GET: 단일 Article 조회
export function getArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error(`[StatusCode ${response.status}] ${response.statusText}`);
      return response.json();
    })
    .catch((error) => {
      console.error('❌ getArticle Error:', error.message);
    });
}

// POST: 새 Article 생성
export function createArticle(articleData) {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`[StatusCode ${response.status}] ${response.statusText}`);
      return response.json();
    })
    .catch((error) => {
      console.error('❌ createArticle Error:', error.message);
    });
}

// PATCH: Article 수정
export function patchArticle(id, updatedData) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`[StatusCode ${response.status}] ${response.statusText}`);
      return response.json();
    })
    .catch((error) => {
      console.error('❌ patchArticle Error:', error.message);
    });
}

// DELETE: Article 삭제
export function deleteArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`, { method: 'DELETE' })
    .then((response) => {
      if (!response.ok) throw new Error(`[StatusCode ${response.status}] ${response.statusText}`);
      return response.json();
    })
    .catch((error) => {
      console.error('❌ deleteArticle Error:', error.message);
    });
}
