const getArticleList = async (page, pageSize, orderBy = 'recent', keyword='') => {
    if (keyword) {
        const articles = (await fetch(`https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`))
            .then(res => res.json())
            .catch(err => console.error(err));

        return articles;
    }

    else {
        const articles = await fetch(`https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`)
            .then(res => res.json())
            .catch(err => console.error(err));

        return articles;
    }

};

const getArticle = async (articleId) => {
    const article = await fetch(`https://panda-market-api-crud.vercel.app/articles/${articleId}`)
    .then(res => res.json())
    .catch(err => console.error(err));

    return article;
};

const createArticle = async (image, content, title) => {
    const article = await fetch(`https://panda-market-api-crud.vercel.app/articles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image,
            content,
            title
        })
    })
        .then(res => res.json())
        .catch(err => console.error(err));

    return article;
};

const patchArticle = async (articleId, image, content, title) => {
    const article = await fetch(`https://panda-market-api-crud.vercel.app/articles/${articleId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image,
            content,
            title
        })
    })
        .then(res => res.json())
        .catch(err => console.error(err));

    return article;
};

const deleteArticle = async (articleId) => {
    const article = await fetch(`https://panda-market-api-crud.vercel.app/articles/${articleId}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .catch(err => console.error(err));

    return article;
};

export {getArticleList, getArticle, createArticle, patchArticle, deleteArticle};