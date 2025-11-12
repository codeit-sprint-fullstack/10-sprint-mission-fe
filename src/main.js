import { Product } from './models/Product.js';
import * as ProductService from './services/ProductService.js';
import * as ArticleService from './services/ArticleService.js';
import path from 'path';
console.log('🧭 현재 실행 중인 파일:', import.meta.url);
console.log(
  '🧭 실제 불러온 ProductService 경로:',
  import.meta.resolve('./services/ProductService.js'),
);

console.log('🟢 Panda Market 실행 시작');

// ✅ 상품 목록 조회 및 인스턴스화
async function getProductListAndInstantiate() {
  let rawProducts;

  try {
    rawProducts = await ProductService.getProductList();
    console.log('🐞 ProductService.getProductList() 반환값:', rawProducts);
  } catch (err) {
    console.error('❌ ProductService 호출 오류:', err);
    rawProducts = [];
  }

  if (!Array.isArray(rawProducts)) {
    console.warn('⚠️ rawProducts가 배열이 아닙니다. 빈 배열로 대체합니다.');
    rawProducts = [];
  }

  for (const rawProduct of rawProducts) {
    console.log('🛍️ product:', rawProduct);
  }
}

// ✅ 실행
async function main() {
  console.log('✅ main() 시작');

  await getProductListAndInstantiate();
  await testProductService();
  await testArticleService();

  console.log('🏁 main() 완료');
}

main();
