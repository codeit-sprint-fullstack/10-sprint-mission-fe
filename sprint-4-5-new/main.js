import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';

getArticleList(1,10, '')
    .then( data => console.log(data));

getArticle(1)
    .then( data => console.log(data));
    
createArticle("게시글 제목입니다.", "게시글 내용입니다.","https://example.com/...")
    .then( data => console.log(data));

patchArticle(1, {
    title: "게시글 제목입니다.",
    content: "게시글 내용입니다."
})
    .then( data => console.log(data));

deleteArticle1(0) 
    .then( data => console.log(data));



import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

(async () => {
    try {
    const products = await getProductList(1, 10, '');
    console.log(products);
 } catch (error) {
    console.error('에러:', error);
 }
})();

(async () => {
    try {
    const product = await getProduct(1);
    console.log(product);
 } catch (error) {
    console.error('에러:', error);
 }
})();

(async () => {
    try {
    const products = await createProduct('상품 이름', 'string', '0', ['전자제품'], ["https://example.com/..."]);
    console.log(products);
    } catch (error) {
    console.error('에러:', error);
    }       
})();


(async () => {
    try {
    const products = await patchProduct(1, { 
        name: '상품 이름',
        description: 'string',
        price: '0',
        tags: ['전자제품'];
    });
    console.log(products);
    } catch (error) {
    console.error('에러:', error);
    }       
})();

(async () => {      
    try {
    const products = await deleteProduct(0);
    console.log(products);
    }   catch (error) {     
    console.error('에러:', error);
    }       
})();



   
