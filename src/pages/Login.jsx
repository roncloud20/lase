import React, { useState } from "react";
import Header from "../components/Header";
// import { useAuth } from "../context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // Capturing all user entries
  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const navigate = useNavigate();
  // const { login } = useAuth();

  // console.log(formData);
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false);

  // // Validate User Entry 
  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if(!formData.email.trim()) {
      newErrors.email = "Email address is required";
    }
    
    // Validate password
    if(!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  
    // console.log(newErrors);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const response =  await axios.post("http://lasestore.test/api/login", {
        email: formData.email,
        password: formData.password,
      })
      if(response.status === 200) {
        console.log(response);
        const {token, user } = response.data;
        // login(token, user);

        // const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      
        setErrors("");
        alert(response.data.message);
        if (user.role === "vendor") {
          navigate("/dashboard");
        } else if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate('/');
        }
      }
    } catch(error) {
      setErrors(error.response.data.errors);
      // alert(error.response.data.message);
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <form
          className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20"
          onSubmit={handleSubmit}
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Login Now
            </h2>
            <p className="text-gray-500 text-sm">Access your account</p>
          </div>

          <div className="space-y-4">

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="johndoe@email.com"
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'}  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{errors.email}</span>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'}  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                />
                <button
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <span className="text-red-500">{errors.password}</span>
            </div>

            <div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-lg duration-200 transform hover:scale-[1.01] shadow-md">
                Login
              </button>
            </div>

            <div>
                <p>You don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Click here to register</Link></p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
