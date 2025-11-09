export function getArticleList( page, pageSize, keyword ) {
   const url = `https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

    return fetch( url )
        .then( response => {
            if ( !response.ok ) {
                throw new Error( '에러' );
            }
            return response.json();
        })
}

export function getArticle(id) {

    const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;

    return fetch( url )
        .then( response => {
            if ( !response.ok ) {
                throw new Error( '에러' );
            }
            return response.json();
        }       
)}

export function createArticle( title, content, image ) {
    const url = `https://panda-market-api-crud.vercel.app/articles`;
    
    return fetch( url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, image })
    })
    .then( response => {
        if ( !response.ok ) {
            throw new Error( '에러' );
        }
        return response.json();
    })

}
export function patchArticle(id, data) {
    const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;

    return fetch( url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then( response => {
        if ( !response.ok ) {
            throw new Error( '에러' );
        }
        return response.json();
    })      
}

export function deleteArticle(id) {
    const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;

    return fetch( url, {
        method: 'DELETE'
    })
    .then( response => {
        if ( !response.ok ) {
            throw new Error( '에러' );
        }
        return response.json();
    })      
}