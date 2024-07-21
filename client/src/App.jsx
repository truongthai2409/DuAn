import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/Home"
import MainLayout from './MainLayout/MainLayout'
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import Inventory from "./pages/Inventory/Inventory";
<<<<<<< HEAD
import Profile from "./pages/Profile/Profile";
import LoginPage from "./pages/Login/Login";
import RegesterPage from "./pages/Regester/Regester";
=======
import OrderManagement from "./pages/OrderManagement/OrderManagement";
import CustomerManagement from "./pages/CustomerManagement/CustomerManagement";
>>>>>>> Nguyen-Ba-Thanh

function App() {

  return (
    <>
      {/* <AppRouter /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegesterPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="listOfProducts" element={<ProductManagement />} />
          <Route path="inventory" element={<Inventory />}/>
<<<<<<< HEAD
          <Route path="profile" element={<Profile />}/>
=======
          <Route path="listOfOrders" element={<OrderManagement />}/>
          <Route path="listOfCustomers" element={<CustomerManagement />}/>
>>>>>>> Nguyen-Ba-Thanh
        </Route>
      </Routes>
    </>
  )
}

export default App
