import React from "react";
import Main from "./pages/Main";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Market from "./pages/Market/Market"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />       
        <Route path="./pages/login/Login" element={<Login />} /> 
        <Route path="./pages/signup/SignUp" element={<SignUp />} /> 
        <Route path="./pages/Market/Market" element={<Market />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;