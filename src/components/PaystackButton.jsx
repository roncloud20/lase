import axios from "axios";
import { useEffect, useState } from "react";
const PaystackButton = ({
  amt,
  address_id,
  order_ref,
  email,
  onSuccess,
  onClose,
}) => {

  const paystackPublicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY; // initialize from env variables
  const user = JSON.parse(localStorage.getItem("user")); // get user info
  const authToken = localStorage.getItem("token"); // get auth token
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // get cart items

  // Function to create order items in the backend
  const res = async (data) => {
    const respo = await axios.post(
      "http://localhost:8000/api/create/order",
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("Order created:", respo.data);
  };

  // Load Paystack script
  useEffect(() => {
    // Load the Paystack script only once
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    console.log("address id in paystack button:", address_id);
  }, []);

  // Create order items when component mounts
  // useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://lasestore.test/api/allproduct");
      const produces = response.data.products;
      console.log("Produces", produces);
      console.log("Cart", cart);

      cart.forEach((item, index) => {
        const prod = produces.find(
          (items) => items.product_id === item.productID
        );
        let data = {
          product_id: prod.product_id,
          quantity: item.quantity,
          unit_price: prod.selling_price,
          cost_price: prod.selling_price * item.quantity,
          address_id: address_id,
          order_ref: order_ref,
        };
        res(data);
      });
    };

    // fetchData();
  // }, []);

  const completePayment = async (responseRef) => {
    fetchData();
    try {
      const result = await axios.post(
        "http://lasestore.test/api/processpayment",
        {
          order_ref: order_ref,
          total: amt,
          payment_ref: responseRef,
          customer_id: user.id,
          address_id: address_id,
          payment_method: "Paystack",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Payment processed:", result.data);
    } catch (error) {
      console.error("Error completing payment:", error);
    }
  };

  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key:
        paystackPublicKey || "pk_test_baecdbe89b4c293f6a4564d49843b1fcd8c937f9",
      email: email,
      amount: amt * 100,
      currency: "NGN",
      ref: order_ref,
      metadata: {
        orderRef: order_ref,
      },
      callback: (response) => {
        console.log(response);
        console.log(address_id);
        if (response.status === "success") {
          completePayment(response.reference);
        }

        onSuccess(response); // Pass full response to parent
      },
      onClose: (response) => {
        onClose(response);
        alert("Payment window closed.");
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={payWithPaystack}
      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
    >
      Pay with Paystack
    </button>
  );
};

export default PaystackButton;
