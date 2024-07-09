import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './components/About'
// import { Link } from 'react-router-dom'
import Login from './pages/Login'
import Lazada from './pages/Lazada'
import Shopee from './pages/Shopee'

function Popup() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shopee" element={<Shopee />} />
            <Route path="/lazada" element={<Lazada />} />
        </Routes>
    )
}

export default Popup