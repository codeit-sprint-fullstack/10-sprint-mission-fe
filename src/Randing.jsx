// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ItemApp from "./components/App.jsx";
import MainHeader from "./components/common/MainHeader/MainHeader.jsx";
import Footer from "./components/common/Footer/Footer.jsx";
import RandingBanner from "./components/common/Randingbanner/RandingBanner.jsx";
import { ItemSections } from "./components/common/ItemSection/ItemSection.jsx";
import FooterIntro from "./components/common/FooterIntro/FooterIntro.jsx";

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
            </Routes>
        </BrowserRouter>
    );
}

export default Randing;
