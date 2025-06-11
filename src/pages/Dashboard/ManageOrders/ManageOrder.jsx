import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDesktop } from "react-icons/fa6";

const ManageOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });
  return (
    <div>
      <SectionTitle
        heading={"Order Details"}
        subHeading={"---Check Order---"}
      ></SectionTitle>

      <div className="overflow-x-auto pb-8">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
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
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // Optional: Use 12-hour format with AM/PM
                }).format(new Date(order.date));
                return (
                  <tr className="bg-base-200" key={order._id}>
                    <th>{index + 1}</th>
                    <td className="font-semibold">{order?.name || "Anounymous"}</td>
                    <td className="font-semibold">
                      {order.email}
                    </td>
                    <td className="font-semibold">
                      {formattedDate}
                    </td>
                    <td className="text-green-600 font-semibold">
                      {order?.transactionId}
                    </td>
                    <td className="text-yellow-600 font-semibold">
                      ${order?.price}
                    </td>
                    <td className={`${order?.status === "cooking" ? "text-red-500": order?.status === "pending" ? "text-yellow-500" : "text-green-500"}`}>
                      
                        {order?.status}
                    </td>
                    <td className="">
                        <FaDesktop className="text-2xl ms-4 text-yellow-600 hover:cursor-pointer"></FaDesktop>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrder;
