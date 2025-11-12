// scripts/items.js
import { getArticleList } from '../ArticleService.js';
import { getProductList } from '../ProductService.js';

const articleListEl = document.querySelector('#article-list');
const productListEl = document.querySelector('#product-list');

// 📰 게시글 목록
getArticleList(1, 5).then((data) => {
  if (!data || !data.list) return;
  data.list.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}" width="100" />
      <div>
        <h3>${item.title}</h3>
        <p>${item.content}</p>
      </div>
    `;
    articleListEl.appendChild(li);
  });
});

// 🛍 상품 목록
(async () => {
  const data = await getProductList(1, 5);
  if (!data || !data.list) return;
  data.list.forEach((product) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${product.images?.[0] || ''}" alt="${product.name}" width="100" />
      <div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong>${product.price}원</strong>
      </div>
    `;
    productListEl.appendChild(li);
  });
})();
