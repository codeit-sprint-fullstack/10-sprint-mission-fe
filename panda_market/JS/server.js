// CommonJS 버전 (package.json: "type": "commonjs")
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// 메모리 DB (재시작하면 초기화)
let articles = [];
let products = [];

// 공용: 페이지네이션 + 키워드 필터
function listWithQuery(list, { page = 1, pageSize = 10, keyword = '' }) {
  page = Number(page) || 1;
  pageSize = Number(pageSize) || 10;
  const kw = String(keyword || '').trim();
  let filtered = list;

  if (kw) {
    const lower = kw.toLowerCase();
    filtered = list.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(lower)
    );
  }
  const totalCount = filtered.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const slice = filtered.slice(start, end);

  return { totalCount, list: slice };
}

/* -------------------- ARTICLE -------------------- */
// 목록
app.get('/articles', (req, res) => {
  const data = listWithQuery(articles, req.query);
  res.json(data);
});
// 단건
app.get('/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = articles.find((a) => a.id === id);
  if (!found) return res.status(404).json({ message: 'Not found' });
  res.json(found);
});
// 생성
app.post('/articles', (req, res) => {
  const { title, content, image } = req.body || {};
  if (!title || !content) {
    return res.status(400).json({ message: 'title, content 필수' });
  }
  const now = new Date().toISOString();
  const newItem = {
    id: Date.now(),
    title,
    content,
    image,
    createdAt: now,
    updatedAt: now,
  };
  articles.unshift(newItem);
  res.status(201).json(newItem);
});
// 수정
app.patch('/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  articles[idx] = {
    ...articles[idx],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  res.json(articles[idx]);
});
// 삭제
app.delete('/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = articles.length;
  articles = articles.filter((a) => a.id !== id);
  if (articles.length === before)
    return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted', id });
});

/* -------------------- PRODUCT -------------------- */
// 목록
app.get('/products', (req, res) => {
  const data = listWithQuery(products, req.query);
  res.json(data);
});
// 단건
app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = products.find((p) => p.id === id);
  if (!found) return res.status(404).json({ message: 'Not found' });
  res.json(found);
});
// 생성
app.post('/products', (req, res) => {
  const { name, description, price, tags = [], images = [] } = req.body || {};
  if (!name || price == null) {
    return res.status(400).json({ message: 'name, price 필수' });
  }
  const now = new Date().toISOString();
  const newItem = {
    id: Date.now(),
    name,
    description,
    price,
    tags,
    images,
    createdAt: now,
  };
  products.unshift(newItem);
  res.status(201).json(newItem);
});
// 수정
app.patch('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});
// 삭제
app.delete('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = products.length;
  products = products.filter((p) => p.id !== id);
  if (products.length === before)
    return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted', id });
});

// 헬스체크
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
