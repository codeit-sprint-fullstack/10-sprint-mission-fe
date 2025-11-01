const BASE_URL = 'http://localhost:4000';

function handleResponse(res, label) {
  if (!res.ok) {
    console.error(`❌ ${label} 실패: [${res.status}] ${res.statusText}`);
    throw new Error(`${label} 요청 실패`);
  }
  return res.json();
}

export function getArticleList({ page = 1, pageSize = 10, keyword = '' } = {}) {
  const query = new URLSearchParams({ page, pageSize, keyword }).toString();

  return fetch(`${BASE_URL}/articles?${query}`)
    .then((res) => handleResponse(res, 'getArticleList'))
    .catch((err) => console.error('getArticleList error:', err.message));
}

export function getArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`)
    .then((res) => handleResponse(res, 'getArticle'))
    .catch((err) => console.error('getArticle error:', err.message));
}

export function createArticle({ title, content, image }) {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then((res) => handleResponse(res, 'createArticle'))
    .catch((err) => console.error('createArticle error:', err.message));
}

export function patchArticle(id, { title, content, image }) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then((res) => handleResponse(res, 'patchArticle'))
    .catch((err) => console.error('patchArticle error:', err.message));
}

export function deleteArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`, { method: 'DELETE' })
    .then((res) => handleResponse(res, 'deleteArticle'))
    .catch((err) => console.error('deleteArticle error:', err.message));
}
