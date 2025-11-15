import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import MarketPage from "./pages/MarketPage/MarketPage";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Item from "./pages/item/Item";
import Privacy from "./pages/privacy/Privacy";
import Faq from "./pages/faq/Faq";
import RegistrationPage from "./pages/registration/RegistrationPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/items" element={<Item />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;