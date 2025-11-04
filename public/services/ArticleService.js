import instance from './api.js'

export async function getArticleList({ page = 1, pageSize = 10, keyword = '' } = {}) {
    try {
        const params = { page, pageSize, keyword };
        const res = await instance.get('/articles', { params });
        return res.data;
    } catch (e) {
        console.log(e.message)
    }
}

export async function getArticle(id) {
    try {
        const res = await instance.get(`/articles/${id}`);
        return res.data;
    } catch (e) {
        console.log(e.message)
    }
}

export async function createArticle({ title, content, image }) {
    try {
        const body = { title, content, image };
        const res = await instance.post('/articles', body);
        return res.data;
    } catch (e) {
        console.log(e.message)
    }
}

export async function patchArticle(id, articleData) {
    try {
        const res = await instance.patch(`/articles/${id}`, articleData);
        return res.data;
    } catch (e) {
        console.log(e.message)
    }
}

export async function deleteArticle(id) {
    try {
        const res = await instance.delete(`/articles/${id}`);
        return res.data;
    } catch (e) {
        console.log(e.message)
    }
}