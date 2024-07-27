import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './components/About'
import Login from './pages/Login'
import Lazada from './pages/Lazada'
import Shopee from './pages/Shopee'
import PrivateRoute from "./config/routing/PrivateRoute";
import './i18n/i18n'
import { Toaster } from 'sonner'

function Popup() {
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
                <Route path="/shopee" element={<PrivateRoute><Shopee /></PrivateRoute>} />
                <Route path="/lazada" element={<PrivateRoute><Lazada /></PrivateRoute>} />
            </Routes>
        </>
    )
}

export default Popup