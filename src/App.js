import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />       {/* 메인 페이지 */}
        <Route path="./pages/Login" element={<Login />} /> 로그인 페이지
        {/* <Route path="/signup" element={<SignUp />} /> ← 회원가입 추가 시 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;