import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutForm = ({ data }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    axiosSecure
      .post("/create-payment", {
        price: data,
      })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, data]);
  const handleSubmitPayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment Error", error);
    } else {
      console.log("Payment Method", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });
    if (confirmError) {
      console.log("Confirm Error", confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log("Success Payment ID:", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully done payment!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <form
      className="p-4 rounded-md bg-white shadow-sm"
      onSubmit={handleSubmitPayment}
    >
      <CardElement
        className="py-4 border px-2"
        options={{
          style: {
            base: {
              fontSize: "24px",
              border: "1px solid black",
              color: "black",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
      <button
        className="mt-4 text-2xl btn normal-case btn-neutral border-yellow-600 border-b-4 border-0 w-full"
        type="submit"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckOutForm;
