import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import HomePage2 from './components/HomePage2/HomePage2';
import CoinDetails from './components/CoinDetails/CoinDetails';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Login from '../components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home2" element={<HomePage2 />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
