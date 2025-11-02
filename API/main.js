import { 
  getArticleList, 
  getArticle, 
  createArticle, 
  patchArticle, 
  deleteArticle 
} from './ArticleService.js';

import { 
  getProductList, 
  getProduct, 
  createProduct, 
  patchProduct, 
  deleteProduct 
} from './ProductService.js';

// 테스트
const articleData = {
  title: "테스트",
  content: "테스트내용",
  image: "http://image.panda.com/image"
};

const productData = {
  name: "테스트상품",
  description: "테스트상품설명",
  price: 99999,
  tags: ["설명", "상품", "테스트"],
  images: ["http://image.panda.com/image"]
};

let createdArticleId;
let createdProductId;

// Article API test
console.log("Article API test initiated");

createArticle(articleData)
  .then(newArticle => {
    createdArticleId = newArticle.id;
    console.log(`생성 성공: ID ${createdArticleId}`);
    
    // 목록 조회
    return getArticleList({ page: 1, pageSize: 10, keyword: '테스트' });
  })
  .then(list => {
    console.log(`list 조회 성공 총 ${list.total}개`);

    // 수정
    return patchArticle(createdArticleId, { content: "내용수정 완료" });
  })
  .then(updatedArticle => {
    console.log(`수정 성공: ID ${updatedArticle.id}, 내용: ${updatedArticle.content}`);
    return getArticle(createdArticleId);
  })

  .then(retrievedArticle => {
    console.log(`조회 성공 제목: ${retrievedArticle.title}`);

    // 삭제
    return deleteArticle(createdArticleId);
  })
  .then(deletedArticle => {
    console.log(`삭제 성공: ID ${deletedArticle.id}`);
    console.log("article API test completed");
  })
  .catch(error => {
    console.error("Article API test failure: ", error.message);
  });



//product API test

async function runProductTests() {
  console.log("product API test initiated");
  try {
    const newProduct = await createProduct(productData);
    createdProductId = newProduct.id;
    console.log(`post 성공: ID ${createdProductId}`);

    const list = await getProductList({ page: 1, pageSize: 10, keyword: '판다' });
    console.log(`get 성공: 총 ${list.total}개`);

    const updatedProduct = await patchProduct(createdProductId, { price: 99999 });
    console.log(`patch 성공: ID ${updatedProduct.id}, 새 가격: ${updatedProduct.price}`);

    const retrievedProduct = await getProduct(createdProductId);
    console.log(`get 성공: 이름: ${retrievedProduct.name}`);
    
    const deletedProduct = await deleteProduct(createdProductId);
    console.log(`delete 성공: ID ${deletedProduct.id}`);
    
    console.log("productAPI test completed");

  } catch (error) {
    console.error("product API test failure:", error.message);
  }
}

// async 함수 실행
runProductTests();
