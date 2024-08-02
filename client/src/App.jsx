import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from 'sonner'
import './i18n/i18n'
import MainLayout from './MainLayout/MainLayout'
import HomePage from "./pages/Home"
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import Inventory from "./pages/Inventory/Inventory";
import Profile from "./pages/Profile/Profile";
import LoginPage from "./pages/Login/Login";
import RegesterPage from "./pages/Regester/Regester";
import OrderManagement from "./pages/OrderManagement/OrderManagement";
import CustomerManagement from "./pages/CustomerManagement/CustomerManagement";
import PrivateRoute from "./config/routing/PrivateRoute";
import CustomerCare from "./pages/CustomerCare/CustomerCare";
import Develop from "./pages/Develop/Develop";

function App() {
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
          <Route path="customerCare" element={<CustomerCare />} />
          <Route path="salesReport" element={<Develop />} />
          <Route path="performanceAnalysis" element={<Develop />} />
          <Route path="export-import-warehouse" element={<Develop />} />
          <Route path="warehouseInventory" element={<Develop />} />
          <Route path="shippingIntegration" element={<Develop />} />
          <Route path="notification" element={<Develop />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
