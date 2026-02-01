import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ProductsPage from "./pages/ProductsPage";
import FarmerDashboard from "./components/Farmer/FarmerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
