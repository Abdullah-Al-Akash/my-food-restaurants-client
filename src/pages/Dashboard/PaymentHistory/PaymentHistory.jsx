import React, { useState } from "react";
import usePaymentDetails from "../../../hooks/usePaymentDetails";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const [paymentDetails] = usePaymentDetails();
  const [foods, setFoods] = useState([]);
  const axiosSecure = useAxiosSecure();
  const handleFoodDetails = async (id) => {
    // Have to open modal:
    console.log(id);
    await axiosSecure(`/food-details/${id}`).then((res) => {
      setFoods(res?.data);
      document.getElementById("my_modal_3").showModal();
    });
  };
  return (
    <div className="">
      <SectionTitle
        heading={"Payment Details"}
        subHeading={"Fast Pay & Fast Eat"}
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="md:text-xl">Date</th>
              <th className="md:text-xl">Transaction ID</th>
              <th className="md:text-xl">Total</th>
              <th className="md:text-xl">Details</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.slice().reverse().map((payment, index) => {
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // Optional: Use 12-hour format with AM/PM
              }).format(new Date(payment.date));
              return (
                <tr className="bg-base-200" key={payment._id}>
                  <th>{index + 1}</th>
                  <td>{formattedDate}</td>
                  <td>{payment.transactionId}</td>
                  <td>${payment.price}</td>
                  <td>
                    <button
                      onClick={() => handleFoodDetails(payment._id)}
                      className="btn btn-sm normal-case btn-neutral"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Order Food Details Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th className="">Food Name</th>
                  <th className="">Image</th>
                  <th className="">Price</th>
                </tr>
              </thead>
              <tbody>
                {
                    foods.map(food => <tr key={food._id}>
                        <td>{food.name}</td>
                        <td>
                            <img className="w-[60px] rounded-md" src={food.image} alt="" />
                        </td>
                        <td>{food.price}</td>
                    </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PaymentHistory;
