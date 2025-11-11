import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Market from "./pages/Market"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />       
        <Route path="./pages/Login" element={<Login />} /> 
        {/* <Route path="/signup" element={<SignUp />} />  */}
        {/* <Route path="/Market" element={<Market />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;