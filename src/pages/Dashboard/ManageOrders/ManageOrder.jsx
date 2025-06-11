import React, { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDesktop } from "react-icons/fa6";
import Swal from "sweetalert2";

const ManageOrder = () => {
  const axiosSecure = useAxiosSecure();
  const [foodDetails, setFoodDetails] = useState([]);
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  //   Display Food Show:
  const handleShowFood = async (_id) => {
    await axiosSecure.get(`/food-details/${_id}`).then((res) => {
      setFoodDetails(res?.data);
      console.log(res.data);
      document.getElementById("my_modal_4").showModal();
    });
  };
  return (
    <div>
      <SectionTitle
        heading={"Order Details"}
        subHeading={"---Check Order---"}
      ></SectionTitle>

      <div className="overflow-x-auto pb-8">
        <table className="table w-full">
          <thead className="">
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Food Details</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .slice()
              .reverse()
              .map((order, index) => {
                const tx = order?.transactionId || "";
                const half = Math.ceil(tx.length / 2);
                const firstHalf = tx.slice(0, half);
                const secondHalf = tx.slice(half);
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // Optional: Use 12-hour format with AM/PM
                }).format(new Date(order.date));
                return (
                  <tr className={`${order?.status === "cooking" ? "bg-purple-100" : order?.status === "processing" ? "bg-orange-100" : "bg-green-100"}`} key={order._id}>
                    <th>{index + 1}</th>
                    <td className="font-semibold">
                      {order?.name || "Anounymous"}
                    </td>
                    <td className="font-semibold">{order.email}</td>
                    <td className="font-semibold">{formattedDate}</td>
                    <td className="text-green-600 font-semibold">
                      {firstHalf} {secondHalf}
                    </td>
                    <td className="text-yellow-600 font-semibold">
                      ${order?.price}
                    </td>
                    <td
                      className={`${
                        order?.status === "cooking"
                          ? "text-purple-500"
                          : order?.status === "processing"
                          ? "text-orange-400"
                          : "text-green-500"
                      }`}
                    >
                      <select
                        className="select select-bordered select-sm"
                        defaultValue={order?.status}
                        onChange={async (e) => {
                          const selectedStatus = e.target.value;
                          console.log("Selected status:", selectedStatus);
                          // You can do something with selectedStatus here
                          await axiosSecure
                            .patch(`/update-status/${order?._id}`, {
                              status: e.target.value,
                            })
                            .then((res) => {
                              if (res.data?.modifiedCount > 0) {
                                Swal.fire({
                                  position: "top-center",
                                  icon: "success",
                                  title: "Status Updated!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });
                              }
                              refetch();
                            });
                        }}
                      >
                        <option disabled>Select status</option>
                        <option>processing</option>
                        <option>delivered</option>
                        <option>cooking</option>
                      </select>
                    </td>
                    <td onClick={() => handleShowFood(order?._id)} className="">
                      <FaDesktop className="text-2xl ms-4 text-yellow-600 hover:cursor-pointer"></FaDesktop>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Food Details */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm bg-orange-300 hover:text-orange-600 hover:bg-orange-300 btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* ---------------Downloaded Part-------------- */}
          <div className="overflow-x-auto px-4 py-4">
            <h3 className="p-6 font-bold text-3xl text-center text-orange-500">
              Food Details
            </h3>
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th className="">Food Name</th>
                  <th className="">Fod Category</th>
                  <th className="">Image</th>
                  <th className="">Price</th>
                </tr>
              </thead>
              <tbody>
                {foodDetails?.map((food) => (
                  <tr key={food._id}>
                    <td className="">{food?.name}</td>
                    <td className="">{food?.category}</td>
                    <td className="">
                      <img
                        className="w-[80px] rounded-md"
                        src={food?.image}
                        alt=""
                      />
                    </td>
                    <td className="">${food?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageOrder;
