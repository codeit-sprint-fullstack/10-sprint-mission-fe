import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "././styles/App.css";
import Nav from "./components/common/Nav";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Market from "./pages/Market";

function App() {
  const location = useLocation();
  const hideLayoutPath = ["/login", "/signup"];
  const hideLayout = hideLayoutPath.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Nav />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
