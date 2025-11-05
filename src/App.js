import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />       
        <Route path="./pages/Login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;