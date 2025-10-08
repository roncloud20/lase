import React, { useState } from "react";
import Header from "../components/Header";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function ChangePassword() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState({
    password: "",
    confirmed: "",

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
    if(!formData.confirmed.trim()) {
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
      const response =  await axios.post("http://lasestore.test/api/changepassword", {
        confirmed: formData.confirmed,
        password: formData.password,
        email: email,
        token: token,
      })
      if(response.status === 200) {
        console.log(response);
        
        navigate('/login');
        
      }
    } catch(error) {
      setErrors(error.response.data.errors);
      console.log(errors);
      setMsg(error.response.data.message);
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
              Change Password
            </h2>
            <p className="text-gray-500 text-sm">Enter a new password</p>
            <span className="text-red-500">{msg}</span>
          </div>

          <div className="space-y-4">
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
              <label
                htmlFor="confirmed"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="confirmed"
                  onChange={handleChange}
                  value={formData.confirmed}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.confirmed ? 'border-red-500' : 'border-gray-200'}  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
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
                Change Password
              </button>
            </div>

            <div className="flex gap-5 text-sm">
                <Link to="/register" className="text-blue-600 hover:underline">Click here to register</Link>
                <Link to="/forget-password" className="text-blue-600 hover:underline">Click here to change password</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
