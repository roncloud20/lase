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
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/itemview" element={<ItemView />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<AdminUsers/>} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/forget-password" element={<ForgetPassword/>}/>
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/users/edit" element={<AdminEditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
