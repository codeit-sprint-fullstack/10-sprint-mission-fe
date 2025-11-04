import instance from './api.js'

export async function getProductList({ page = 1, pageSize = 10, keyword = '' }) {
    try {
        const body = { page, pageSize, keyword };
        const res = await instance.get('/products', body);
        return res.data
    } catch (e) {
        console.log(e.message)
    }
}

export async function getProduct(id) {
    try {
        const res = await instance.get(`/products/${id}`);
        return res.data;
    } catch (e) {
        console.log(e.message)
    }
}

export async function createProduct({ name, description, price, tags, images }) {
    try {
        const body = { name, description, price, tags, images }
        const res = await instance.post('/products', body)
        return res.data;
    } catch (e) {
        console.log(e.message)
    }
}

export async function patchProduct(id, productsData) {
    try {
        const res = await instance.patch(`/products/${id}`, productsData)
        return res.data;
    } catch (e) {
        console.log(e.message)
    }
}

export async function deleteProduct(id) {
    try {
        const res = await instance.delete(`/products/${id}`)
        return res.data;
    } catch (e) {
        console.log(e.message)
    }
}