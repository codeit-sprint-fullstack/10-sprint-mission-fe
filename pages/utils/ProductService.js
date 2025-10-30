const getProductList = async (page, pageSize, orderBy = 'recent', keyword='') => {
    if (keyword) {
        const products = (await fetch(`https://panda-market-api-crud.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`))
            .then(res => res.json())
            .catch(err => console.error(err));

        return products;
    }

    else {
        const products = await fetch(`https://panda-market-api-crud.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`)
            .then(res => res.json())
            .catch(err => console.error(err));

        return products;
    }

};

const getProduct = async (productId) => {
    const product = await fetch(`https://panda-market-api-crud.vercel.app/products/${productId}`)
        .then(res => res.json())
        .catch(err => console.error(err));

    return product;
};

const createProduct = async (images, tags, price, description, name) => {
    const product = await fetch(`https://panda-market-api-crud.vercel.app/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            images,
            tags,
            price,
            description,
            name
        })
    })
        .then(res => res.json())
        .catch(err => console.error(err));

    return product;
};

const patchProduct = async (productId, images, tags, price, description, name) => {
    const product = await fetch(`https://panda-market-api-crud.vercel.app/products/${productId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            images,
            tags,
            price,
            description,
            name
        })
    })
        .then(res => res.json())
        .catch(err => console.error(err));

    return product;
};

const deleteProduct = async (productId) => {
    const product = await fetch(`https://panda-market-api-crud.vercel.app/products/${productId}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .catch(err => console.error(err));

    return product;
};

export {getProductList, getProduct, createProduct, patchProduct, deleteProduct};