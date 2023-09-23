import logo from './logo.svg';
import './App.css';
import Header from './Component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import AlertShow from './Component/Alert';

function App() {
    return (
        <BrowserRouter>
            <div
                style={{
                    backgroundColor: '#14161a',
                    color: 'white',
                    minHeight: '100vh',
                }}
            >
                <Header></Header>

                <Routes>
                    <Route path="/" element={<HomePage />} exact></Route>
                    <Route path="/coins/:id" element={<CoinPage />}></Route>
                </Routes>
                <AlertShow />
            </div>
        </BrowserRouter>
    );
}

export default App;
