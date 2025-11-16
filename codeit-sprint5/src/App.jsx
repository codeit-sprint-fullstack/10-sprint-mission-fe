import './App.css';
import {Route, Routes, Navigate} from 'react-router';
import Landing from './pages/Landing';
import UsedMarket from './pages/UsedMarket';
import ProductCreate from './pages/ProductCreate';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/items" element={<UsedMarket />} />
            <Route path="/registration" element={<ProductCreate />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
