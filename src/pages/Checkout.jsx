import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchAddress = async () => {
      const response = await axios.get("http://lasestore.test/api/getaddress", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data);
      setAddresses(response.data.addresses);
    };

    fetchAddress();
  }, [authToken]);
  console.log(addresses);
  return (
    <>
      <Header />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Checkout
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {addresses.length === 0 ? (
                  <p className="text-gray-500">
                    No addresses found. Please add an address before proceeding
                    to checkout.
                  </p>
                ) : (
                  addresses.map((address) => (
                    <>
                      <div
                        key={address.id}
                        className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 sm:p-6 lg:p-8 mb-4 flex gap-4 items-center"
                      >
                        <input type="radio" name="address" value={address.id}/>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {address.address}, {address.city}, {address.state},{" "}
                          {address.country} - {address.postal_code} <br />
                          Contact: {address.contact_name || "N/A"} (
                          {address.contact_phone || "N/A"})
                        </h3>
                      </div>
                    </>
                  ))
                )}

                <div className="flex gap-4">
                    <Link
                      to="/add-address"
                      className="inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Add New Address
                    </Link>
                    <Link
                      to="/add-address"
                      className="inline-block rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white hover:bg-green-700"
                    >
                      Process to Payment
                    </Link>
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
