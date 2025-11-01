// main.js
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from './article.js';
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from './product.js';

console.log('--- 📰 Article API 테스트 시작 ---');
// 목록 확인
getArticleList({ page: 1, pageSize: 5, keyword: '' })
  .then((data) => console.log('getArticleList:', data))
  .catch(console.error);

// 생성 → 조회 → 수정 → 삭제
createArticle({
  title: '테스트 글',
  content: '내용입니다',
  image: 'https://picsum.photos/200',
})
  .then((created) => {
    console.log('createArticle:', created);
    const id = created.id; // ✅ 생성된 id 사용
    return getArticle(id)
      .then((detail) => (console.log('getArticle:', detail), id))
      .then((id) => patchArticle(id, { title: '수정된 제목' }))
      .then((patched) => (console.log('patchArticle:', patched), id))
      .then((id) => deleteArticle(id))
      .then((deleted) => console.log('deleteArticle:', deleted));
  })
  .catch((e) => console.error('Article flow error:', e.message));

console.log('--- 🛒 Product API 테스트 시작 ---');
(async () => {
  try {
    // 목록
    const list = await getProductList({ page: 1, pageSize: 5, keyword: '' });
    console.log('getProductList:', list);

    // 생성 → 조회 → 수정 → 삭제
    const newProduct = await createProduct({
      name: '테스트 상품',
      description: '설명',
      price: 1000,
      tags: ['tag'],
      images: ['https://picsum.photos/300'],
    });
    console.log('createProduct:', newProduct);

    const id = newProduct.id; // ✅ 생성된 id 사용
    const detail = await getProduct(id);
    console.log('getProduct:', detail);

    const patched = await patchProduct(id, { price: 2000 });
    console.log('patchProduct:', patched);

    const deleted = await deleteProduct(id);
    console.log('deleteProduct:', deleted);
  } catch (e) {
    console.error('Product flow error:', e.message);
  }
})();
