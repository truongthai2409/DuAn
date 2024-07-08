import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/Home"
import MainLayout from './MainLayout/MainLayout'
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import Inventory from "./pages/Inventory/Inventory";
import Profile from "./pages/Profile/Profile";
import LoginPage from "./pages/Login/Login";

function App() {

  return (
    <>
      {/* <AppRouter /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="listOfProducts" element={<ProductManagement />} />
          <Route path="inventory" element={<Inventory />}/>
          <Route path="profile" element={<Profile />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
