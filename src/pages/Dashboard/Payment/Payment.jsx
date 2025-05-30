import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckOutForm from "./checkOutForm";

const Payment = ({ data, onClose }) => {
  // For Stripe:
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    // Start the animation when modal mounts
    const timeout = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-lg p-6 shadow-lg transform transition-all duration-300 w-[90%] sm:w-[80%] md:w-[500px]
    ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
      >
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <Elements stripe={stripePromise}>
          <CheckOutForm data={data}></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};
export default Payment;

