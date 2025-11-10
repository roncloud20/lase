import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ItemView from "./pages/ItemView";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import EmailVerify from "./pages/EmailVerify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminEditUser from "./pages/Admin/AdminEditUser";
import ForgetPassword from "./pages/ForgetPassword";
import ChangePassword from "./pages/ChangePassword";
import AdminProductsList from "./pages/Admin/AdminProductsList";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/itemview" element={<ItemView />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<AdminUsers/>} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/admin/users/edit" element={<AdminEditUser />} />
          <Route path="/admin/products" element={<AdminProductsList/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
