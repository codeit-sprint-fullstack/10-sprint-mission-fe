const ARTICLE_BASE_URL = "https://panda-market-api-crud.vercel.app";

export const getArticleList = ({ page = 1, pageSize = 10, keyword = "" } = {}) => {
  return window.axios
    .get(`${ARTICLE_BASE_URL}/articles`, { params: { page, pageSize, keyword } })
    .then((res) => res.data)
    .catch((err) => {
      const status = err.response?.status;
      const msg = err.response?.data?.message || err.message;
      console.error(`[Article] GET /articles 실패${status ? ` (${status})` : ""}: ${msg}`);
      throw err;
    });
};

export const getArticle = (id) => {
  return window.axios
    .get(`${ARTICLE_BASE_URL}/articles/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      const status = err.response?.status;
      const msg = err.response?.data?.message || err.message;
      console.error(`[Article] GET /articles/${id} 실패${status ? ` (${status})` : ""}: ${msg}`);
      throw err;
    });
};

export const createArticle = ({ title, content, image }) => {
  return window.axios
    .post(`${ARTICLE_BASE_URL}/articles`, { title, content, image })
    .then((res) => res.data)
    .catch((err) => {
      const status = err.response?.status;
      const msg = err.response?.data?.message || err.message;
      console.error(`[Article] POST /articles 실패${status ? ` (${status})` : ""}: ${msg}`);
      throw err;
    });
};

export const patchArticle = (id, patch) => {
  return window.axios
    .patch(`${ARTICLE_BASE_URL}/articles/${id}`, patch)
    .then((res) => res.data)
    .catch((err) => {
      const status = err.response?.status;
      const msg = err.response?.data?.message || err.message;
      console.error(`[Article] PATCH /articles/${id} 실패${status ? ` (${status})` : ""}: ${msg}`);
      throw err;
    });
};

export const deleteArticle = (id) => {
  return window.axios
    .delete(`${ARTICLE_BASE_URL}/articles/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      const status = err.response?.status;
      const msg = err.response?.data?.message || err.message;
      console.error(`[Article] DELETE /articles/${id} 실패${status ? ` (${status})` : ""}: ${msg}`);
      throw err;
    });
};