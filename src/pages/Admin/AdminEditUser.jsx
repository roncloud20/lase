import AdminSidebar from "../../components/Admin/AdminSidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import icon from "../../assets/icon.png";

export default function AdminEditUser() {
  const [user, setUser] = useState([]);
  const [searchParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState("");
  const id = searchParams.get("id");
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://lasestore.test/api/getuser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setErrorMsg("");
        setUser(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error.response.data.message);
        setErrorMsg(error.response.data.message);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <AdminSidebar>
        <>
          {errorMsg ? (
            <p className="text-center text-red-600 text-3xl font-bold">
              {errorMsg}
            </p>
          ) : (
            <>
              <h1 className=" text-center text-2xl font-bold mb-4 dark:text-white">
                Edit User
              </h1>
              <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    {/* Firstname */}
                  <div>
                    <label
                      for="firstname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      value={user.firstname}
                      required
                    />
                  </div>

                    {/* Lastname */}
                  <div>
                    <label
                      for="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Doe"
                      value={user.lastname}
                      required
                    />
                  </div>

                  {/* Phone number */}
                  <div>
                    <label
                      for="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="123-45-678"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      value={user.phone_number}
                      required
                    />
                  </div>
                
                    {/* Email Adress */}
                    <div className="mb-6">
                    <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com"
                        value={user.email}
                        required
                    />
                    </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    for="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </a>
                    .
                  </label>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </>
      </AdminSidebar>
    </>
  );
}
