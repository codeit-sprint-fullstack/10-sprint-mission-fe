export async function getProductList( page, pageSize, keyword ) {
    try {
        const url = https://panda-market-api-crud.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('에러:', response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('요청 실패:', error);
    }
}   

export async function getProduct(id) {
   try {
    const response = await fetch(`URL/${id}`);
    if (!response.ok) {
        throw new Error('에러:', response.status);
    }
    const data = await response.json();
    return data;
   } catch (error) {
    console.error('요청 실패:', error);
   }
}

export async function createProduct( name, description, price, tags, images) {
    try {
        const response = await fetch(`URL`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, price, tags, images})
        });
        if (!response.ok) {
          console.error('에러:', response.status);
        }

        return await response.json();
    } catch (error) {
        console.error('요청 실패:', error);
    }
}
    
export async function patchProduct(id, data) {
    try {
        const response = await fetch(`URL/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
          console.error('에러:', response.status);
        }

        return await response.json();
    } catch (error) {
        console.error('요청 실패:', error);
    }
}

export async function deleteProduct(id) {
    try {
        const response = await fetch(`URL/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
          console.error('에러:', response.status);
        }

        return await response.json();
    } catch (error) {
        console.error('요청 실패:', error);
    }
}


