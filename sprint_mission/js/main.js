import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./service/ArticleService.js";
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./service/ProductService.js";

//============================== Article ==============================//
getArticleList({ page: 1, pageSize: 5, keyword: "" })
  .then((data) => {
    console.log("[성공]", data);
  })
  .catch((error) => {
    console.log("[에러]", error.message);
  });

// (CORS로 브라우저에서 막힘)
createArticle({
  title: "테스트 게시글 - 패치/삭제 테스트!",
  content: "패치와 삭제 테스트용 내용입니다~",
  image:
    "https://yt3.googleusercontent.com/_8Gwda58F-O2p2QYW6qa1Z9944kfItbG5YnkSucDtMTEYybj4lQyy70DLeZQnKbVKjF2OUHY=s900-c-k-c0x00ffffff-no-rj",
})
  .then((created) => {
    console.log("[생성 OK]", created);
    const id = created.id;

    return patchArticle(id, { title: "제목이 이렇게 바뀌었습니다!" }).then(
      (patched) => {
        console.log("[패치 OK]", patched);
        return id;
      }
    );
  })
  .then((id) => {
    return getArticle(id).then((detail) => {
      console.log("[상세 확인 OK]", detail);
      return id;
    });
  })
  .then((id) => {
    return deleteArticle(id).then((res) => {
      console.log("[삭제 OK]", res);
      return id;
    });
  })
  .then((id) => {
    return getArticle(id)
      .then(() => {
        console.warn("[주의] 삭제 후 상세 체크가 성공했습니다:)");
      })
      .catch((err) => {
        console.log("[삭제 확인]", err.message);
      });
  })
  .catch((err) => {
    console.log("[전체 에러]", err.message);
  });

//============================== Product ==============================//
async function testProducts() {
  try {
    const list = await getProductList({ page: 1, pageSize: 5, keyword: "" });
    console.log("[상품 리스트 OK]", list);

    const someId = list?.list?.[0]?.id;
    if (someId) {
      const detail = await getProduct(someId);
      console.log("[상품 상세 OK]", detail);
    }

    // (CORS로 브라우저에서 막힘)
    const created = await createProduct({
      name: "테스트 상품",
      description: "설명입니다~",
      price: 9999,
      tags: ["test", "panda"],
      images: ["https://example.com/image.png"],
    });
    console.log("[상품 생성 OK]", created);

    const patched = await patchProduct(created.id, {
      price: 8888,
      tags: ["patched"],
    });
    console.log("[상품 패치 OK]", patched);

    const deleted = await deleteProduct(created.id);
    console.log("[상품 삭제 OK]", deleted);

    try {
      await getProduct(created.id);
      console.warn("[주의] 삭제 후 상세 체크가 성공했어요:)");
    } catch (err) {
      console.log("[삭제 확인 OK]", err.message);
    }
  } catch (err) {
    console.log("[Product 전체 에러]", err.message);
  }
}

// 실제 실행
testProducts();
