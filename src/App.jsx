import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MarketPage from './pages/MarketPage.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MarketPage />} />
      </Routes>
      <Footer />
    </>
  );
}
