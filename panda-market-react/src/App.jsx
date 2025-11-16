import "./index.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SecondhandMarket from "./pages/SecondhandMarket.jsx";
import Home from "./pages/Home.jsx";
import Registration from "./pages/Registration.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProductDetailPage from "./pages/ProductDetail.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} /> {/* 랜딩페이지 */}
        <Route path="/items" element={<SecondhandMarket />} />{" "}
        {/* 중고 마켓 페이지 */}
        <Route path="/registration" element={<Registration />} />{" "}
        {/* 상품 등록 페이지 */}
        <Route path="/items/:id" element={<ProductDetail />} />{" "}
        {/* 상세 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/items" element={<ProductDetailPage />} />
        <Route path="/privacy" element={<div>준비 중(´ゝз・`)ﾉ⌒☆</div>} />
        <Route path="/faq" element={<div>준비 중(´ゝз・`)ﾉ⌒☆</div>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
