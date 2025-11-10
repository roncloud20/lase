import React, { useState } from "react";
import DashboardSideBar from "../components/DashboardSideBar";
import axios from "axios";
// import { Link } from "react-router-dom";

export default function AddAddress() {

  // Calling the token and user info
  const authToken = localStorage.getItem('token');
  // const user = JSON.parse(localStorage.getItem('user'));

  // Handle for entries
  const [formData, setFormData] = useState({
    address : "",
    city: "",
    state: "",
    country : "",
    postal_code : "",
    contact_name : "",
    contact_phone : "",

  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };

  // Declare Error state
  const [error, setError] = useState({
    address : "",
    city: "",
    state: "",
    country : "",
    postal_code : "",
    contact_name : "",
    contact_phone: "",
  });

  // Handle the last submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("postal_code", formData.postal_code);
    data.append("contact_name", formData.contact_name);
    data.append("contact_phone", formData.contact_phone);
    console.log(data);
    console.log(formData);

    try {
      const response =await axios.post("http://lasestore.test/api/address/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response);
      alert("Address Added Successfully");
      setFormData({
        address : "",
        city: "",
        state: "",
        country : "",
        postal_code : "",
        contact_name : "",
        contact_phone: "",
      });

      setError({
        address : "",
        city: "",
        state: "",
        country : "",
        postal_code : "",
        contact_name : "",
        contact_phone: "",
      });

    } catch (error) {
      console.log(error.response.data.errors);
      setError(error.response.data.errors);
    }
  }

  return (
    <>
      <div className="flex flex-row">
        <DashboardSideBar />
        <main className="ml-64 p-5 max-w-screen-lg flex-wrap h-screen grow">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <h1 className="text-3xl font-extrabold text-gray-900">
              Add Address
            </h1>

            

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={formData.address}
                className={`w-full px-4 py-3 rounded-lg border  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{error.address[0]}</span>
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                onChange={handleChange}
                placeholder="City"
                value={formData.city}
                className={`w-full px-4 py-3 rounded-lg border  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{error.city[0]}</span>
            </div>

            {/* State */}
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <input
                type="text"
                name="state"
                onChange={handleChange}
                placeholder="State"
                value={formData.state}
                className={`w-full px-4 py-3 rounded-lg border  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{error.state[0]}</span>
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                onChange={handleChange}
                placeholder="Country"
                value={formData.country}
                className={`w-full px-4 py-3 rounded-lg border  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{error.country[0]}</span>
            </div>

            {/* Postal Code */}
            <div>
              <label
                htmlFor="postal_code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Postal Code
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="postal_code"
                placeholder="Postal Code"
                rows="4"
                value={formData.postal_code}
                className={`w-full px-4 py-3 rounded-lg border  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">
                {error.postal_code[0]}
              </span>
            </div>

            {/* Contact Name */}
            <div>
              <label
                htmlFor="contact_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Name
              </label>
              <input
                type="text"
                name="contact_name"
                onChange={handleChange}
                placeholder="Contact Name"
                value={formData.contact_name}
                className={`w-full px-4 py-3 rounded-lg border  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{error.contact_name[0]}</span>
            </div>
            
            {/* Contact Phone */}
            <div>
              <label
                htmlFor="contact_phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Phone
              </label>
              <input
                type="text"
                name="contact_phone"
                onChange={handleChange}
                placeholder="Contact Phone"
                value={formData.contact_phone}
                className={`w-full px-4 py-3 rounded-lg border  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
              />
              <span className="text-red-500">{error.contact_phone[0]}</span>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-lg duration-200 transform hover:scale-[1.01] shadow-md"
              >
                Add New Address
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
