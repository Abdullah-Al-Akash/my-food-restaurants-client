import React, { useRef, useState } from "react";
import usePaymentDetails from "../../../hooks/usePaymentDetails";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDownload } from "react-icons/fa6";
import useUser from "../../../hooks/useUser";
import logo from "/logo.png";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

const PaymentHistory = () => {
  const { dUser } = useUser();
  const [paymentDetails] = usePaymentDetails();
  const [foods, setFoods] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});
  const axiosSecure = useAxiosSecure();
  const handleFoodDetails = async (detail, id) => {
    console.log(detail);
    setOrderDetail(detail);
    // Have to open modal:
    console.log(id);
    await axiosSecure(`/food-details/${id}`).then((res) => {
      console.log(res?.data);
      setFoods(res?.data);
      document.getElementById("my_modal_3").showModal();
    });
  };

  // Invoice Part:
  const captureRef = useRef();

   const handleDownloadImage = async () => {
    const element = captureRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2, // Better resolution
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "captured-image.png"; // ফাইলের নাম
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean-up
  };

  // Invoice Part Html to PDF:
  const contentRef = useRef();

  const handleDownload = () => {
    const element = contentRef.current;
    const options = {
      margin: 0.5,
      filename: "payment-receipt.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="">
      <SectionTitle
        heading={"Payment History"}
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
              <th className="md:text-xl">Status</th>
              <th className="md:text-xl">Details</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails
              .slice()
              .reverse()
              .map((payment, index) => {
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
                    <td className="font-semibold">{formattedDate}</td>
                    <td className="text-blue-500 font-semibold">
                      {payment.transactionId}
                    </td>
                    <td className="font-semibold text-green-500">
                      ${payment.price}
                    </td>
                    <td>
                      <span
                        className={`${
                          payment.status === "cooking"
                            ? "bg-red-100 text-red-600 font-semibold px-2 py-1 rounded-full"
                            : "bg-green-100 text-green-600 font-semibold px-2 py-1 rounded-full"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleFoodDetails(payment, payment._id)}
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
          {/* ---------------Downloaded Part-------------- */}
          <div ref={captureRef}  className="overflow-x-auto px-4 py-4">
            <img
              className="bg-black rounded-md w-[120px] mx-auto my-4"
              src={logo}
              alt=""
            />
            <div className="bg-orange-100 px-4 rounded-md border-dashed border-2 border-orange-300 py-4">
              <div className="py-1">
                <h3 className="font-semibold border-b-2 py-1 border-b-orange-200">
                  Customer Name
                </h3>
                <h3 className="">{dUser?.name}</h3>
              </div>
              <div className="py-1">
                <h3 className="font-semibold border-b-2 py-1 border-b-orange-200">
                  Customer Email
                </h3>
                <h3 className="pt-1">{dUser?.email}</h3>
              </div>
              <div className="py-1">
                <h3 className="font-semibold border-b-2 py-1 border-b-orange-200">
                  Transaction ID
                </h3>
                <h3 className="pt-1">{orderDetail?.transactionId}</h3>
              </div>
              <div className="py-1">
                <h3 className="font-semibold border-b-2 py-1 border-b-orange-200">
                  Order Date & Time
                </h3>
                <h3 className="pt-1">
                  {new Date(orderDetail?.date)
                    .toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace(",", "")}{" "}
                </h3>
              </div>
              <div className="py-1">
                <h3 className="font-semibold border-b-2 py-1 border-b-orange-200">
                  Order Status
                </h3>
                <h3 className="pt-1">{orderDetail?.status}</h3>
              </div>
              <div className="py-1">
                <h3 className="font-semibold border-b-2 py-1 border-b-orange-200">
                  Payment Status
                </h3>
                <h3 className="pt-1 text-green-400">Complete</h3>
              </div>
            </div>
            <h3 className="p-6 font-bold text-3xl text-center text-orange-500">
              Food Details
            </h3>
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
                {foods.map((food) => (
                  <tr key={food._id}>
                    <td>{food.name}</td>
                    <td>
                      <img
                        className="w-[60px] rounded-md"
                        src={food.image}
                        alt=""
                      />
                    </td>
                    <td>$ {food.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="divider"></div>
            <div className="flex justify-between px-8">
              <h3 className="font-semibold">Total Amount </h3>
              <h3 className="font-semibold pe-4">$ {orderDetail?.price}</h3>
            </div>
            <div className="flex justify-end mt-8">
              <div>
                <h3 className="font-semibold text-center">Abdullah Al Akash</h3>
                <span className="font-bold">
                  ----Received By----
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleDownloadImage}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Download as Image
          </button>
          <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Download PDF
      </button>
        </div>
      </dialog>
    </div>
  );
};

export default PaymentHistory;
