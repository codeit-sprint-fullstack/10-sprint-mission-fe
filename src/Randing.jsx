// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ItemSections } from "./components/common/ItemSection/ItemSection.jsx";
import ItemApp from "./components/App.jsx";
import MainHeader from "./components/common/MainHeader/MainHeader.jsx";
import Footer from "./components/common/Footer/Footer.jsx";
import RandingBanner from "./components/common/Randingbanner/RandingBanner.jsx";
import FooterIntro from "./components/common/FooterIntro/FooterIntro.jsx";
import RegisterPage from "./components/item/RegisterPage/RegisterPage.jsx";
import ItemDetail from "./components/item/ItemDetail/ItemDetail.jsx";

function RandingPage() {
    return (
        <div>
            <MainHeader />
            <main>
                <RandingBanner />
                <ItemSections />
            </main>
            <FooterIntro />
            <Footer />
        </div>
    );
}

function Randing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RandingPage />} />
                <Route path="/items" element={<ItemApp />} />
                <Route path="/registration" element={<RegisterPage />} />
                <Route path="/items/:id" element={<ItemDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Randing;
