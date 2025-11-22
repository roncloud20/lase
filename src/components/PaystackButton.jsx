import axios from "axios";
import { useEffect } from "react";
const PaystackButton = ({
  amt,
  address_id,
  order_ref,
  email,
  onSuccess,
  onClose,
}) => {
  const paystackPublicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const user = JSON.parse(localStorage.getItem("user"));
  const authToken = localStorage.getItem("token");

  // const amt = 5000; //amount in Naira
  useEffect(() => {
    // Load the Paystack script only once
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    console.log("address id in paystack button:", address_id);
  }, []);
  const payWithPaystack = () => {
    // const [action, setAction] = useState("");
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
          // useEffect(() => {
          const verifyPayment = async () => {
            const payment = await axios.post(
              "http://lasestore.test/api/processpayment",
              {
                order_ref: order_ref,
                total: amt,
                payment_ref: response.reference,
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

            verifyPayment();
            console.log("Payment verification response:", payment.data);
          };
          // });
        }
        // setAction(response);
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
