// js/main.js
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./services/ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./services/ProductService.js";


getArticleList({ page: 1, pageSize: 5, keyword: "" })
  .then((list) => {
    console.log("[Article] 목록:", list);
    return createArticle({
      title: "테스트 제목",
      content: "테스트 내용",
      image: "https://picsum.photos/300",
    });
  })
  .then((created) => {
    console.log("[Article] 생성:", created);
    return patchArticle(created.id, { title: "제목 수정" });
  })
  .then((patched) => {
    console.log("[Article] 수정:", patched);
    return getArticle(patched.id);
  })
  .then((detail) => {
    console.log("[Article] 상세:", detail);
    return deleteArticle(detail.id);
  })
  .then((removed) => {
    console.log("[Article] 삭제:", removed);
  })
  .catch((err) => {
    console.error("[Article] 체이닝 에러:", err.message);
  });


(async () => {
  try {
    const list = await getProductList({ page: 1, pageSize: 5, keyword: "" });
    console.log("[Product] 목록:", list);

    const created = await createProduct({
      name: "샘플 상품",
      description: "설명입니다.",
      price: 9900,
      tags: ["sample", "panda"],
      images: ["https://picsum.photos/400"],
    });
    console.log("[Product] 생성:", created);

    const patched = await patchProduct(created.id, { price: 12900 });
    console.log("[Product] 수정:", patched);

    const detail = await getProduct(patched.id);
    console.log("[Product] 상세:", detail);

    const removed = await deleteProduct(detail.id);
    console.log("[Product] 삭제:", removed);
  } catch (e) {
    console.error("[Product] try/catch 에러:", e.message);
  }
})();