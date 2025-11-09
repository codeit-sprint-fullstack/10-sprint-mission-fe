import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <nav className="menu">
    <h1>판다마켓</h1>
    <ul>
      <li>자유게시판</li>
      <li>중고마켓</li>
      <li>로그인</li>
    </ul>
  </nav>
  <main className= "main-content">
    <ul>
      <li>베스트 상품</li>
      <li>상품 목록</li>
    </ul>
      </main>

      <footer className="footer">
        푸터 영역
      </footer>
    </>
);

reportWebVitals()