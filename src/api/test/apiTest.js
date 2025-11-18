import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

console.log("GET /getProductList");
const data = await getProductList({
  page: 2,
  pageSize: 5,
  keyword: "전자제품",
});
console.log(data);

console.log("GET /getProduct");
const data2 = await getProduct(105);
console.log(data2);

console.log("POST /createProduct");
const newHairdryer = {
  name: "전자제품",
  description: "최신 제품",
  price: 9999,
  tags: ["신상"],
  images: ["https://example.com/..."],
};
const data3 = await createProduct(newHairdryer);
console.log(data3);

console.log("PATCH /patchProduct");
const premiumLine = {
  name: "luxury Hairdryer",
  description: "프리미엄라인",
  price: 9999,
  tags: ["프리미엄"],
  images: ["https://example.com/..."],
};
const data4 = await patchProduct(56, premiumLine);
console.log(data4);

// 56, 67 둘다 get으로 확인하면 있는데 왜 삭제하면 404에러가 뜨죠??
console.log("DELETE /deleteProduct");
const data5 = await deleteProduct(56);
console.log(data5);

////////////////      Article        ///////////////////
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

getArticleList({ page: 2, pageSize: 3, keyword: "내용" });

const newArticle = {
  title: "자바스크립트 어려워",
  content: "자바스크립트 어려워 내용",
  image: "https://picture.com/",
};
createArticle(newArticle);

const editedArticle = {
  title: "리액트도 어려워",
};
patchArticle(33, editedArticle);

deleteArticle(77);
