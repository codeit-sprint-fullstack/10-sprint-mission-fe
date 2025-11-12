// 🧩 main.js
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from './ArticleService.js';
import.meta.url && console.log('🟢 ProductService loaded from:', import.meta.url);

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from './ProductService.js';

// 테스트 실행
console.log('✅ Panda Market API 테스트 시작');

(async () => {
  // 📰 Article API 테스트
  console.log('\n📄 [Article List]');
  await getArticleList(1, 5, '테스트').then(console.log);

  console.log('\n📄 [Article Detail]');
  await getArticle(1).then(console.log);

  // 🛍 Product API 테스트
  console.log('\n🛒 [Product List]');
  console.log(await getProductList(1, 5, '상품'));

  console.log('\n🛒 [Product Detail]');
  console.log(await getProduct(1));
})();
