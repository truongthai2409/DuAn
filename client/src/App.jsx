import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home"
import MainLayout from './MainLayout/MainLayout'
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import Inventory from "./pages/Inventory/Inventory";

function App() {

  return (
    <>
      {/* <AppRouter /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="listOfProducts" element={<ProductManagement />} />
          <Route path="inventory" element={<Inventory />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
