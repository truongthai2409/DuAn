import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/Home"
import MainLayout from './MainLayout/MainLayout'
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import Inventory from "./pages/Inventory/Inventory";
import Profile from "./pages/Profile/Profile";
import LoginPage from "./pages/Login/Login";
// import PrivateRoute from "./pages/Login/PrivateRoute.js";
import RegesterPage from "./pages/Regester/Regester";
import OrderManagement from "./pages/OrderManagement/OrderManagement";
import CustomerManagement from "./pages/CustomerManagement/CustomerManagement";
import { Toaster } from 'sonner'
import { useAuth } from "./hooks/useAuth";

function App() {
  const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
  
    return user ? children : <Navigate to="/login" />;
  };
  return (
    <>
      {/* <AppRouter /> */}
      <Toaster />
      <Routes>
        <Route path="/register" element={<RegesterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="listOfProducts" element={<ProductManagement />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="listOfOrders" element={<OrderManagement />} />
          <Route path="listOfCustomers" element={<CustomerManagement />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
