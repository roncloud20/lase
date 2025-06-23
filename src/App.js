import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EmailVerify from "./pages/EmailVerify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/email-verify" element={<EmailVerify/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
