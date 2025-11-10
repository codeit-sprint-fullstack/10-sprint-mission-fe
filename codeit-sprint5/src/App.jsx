import './App.css';
import {Route, Routes, Navigate} from 'react-router';
import UsedMarket from './pages/UsedMarket';

const App = () => {
    // 디버깅용 로그 (필요시 주석 해제)
    // console.log('App 컴포넌트 렌더링');
    return (
        <Routes>
            <Route path="/" element={<UsedMarket />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
