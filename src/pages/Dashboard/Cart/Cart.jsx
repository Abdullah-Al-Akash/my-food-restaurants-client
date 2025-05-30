import useCarts from "../../../hooks/useCarts";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Payment from "../Payment/Payment";
import { useState } from "react";

const Cart = () => {
  const [cart, refetch] = useCarts();
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  // Handle Payment:
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const handlePayNow = () => {
    setPaymentData({ totalPrice: 50 });
    setShowModal(true); // Open modal
  };

  const onClose = () => {
    setShowModal(false)
  }

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `Your item has been deleted`,
              showConfirmButton: false,
              timer: 1000,
            });
            refetch();
          }
        });
      }
    });
  };
  
  return (
    <div>
      <div className="grid grid-cols-3 gap-8">
        <h3 className="md:text-3xl font-semibold">
          Total Items: {cart.length}
        </h3>
        <h3 className="md:text-3xl font-semibold">
          Total Price: ${totalPrice}
        </h3>
        <button
          disabled={!totalPrice}
          onClick={handlePayNow}
          className="btn normal-case btn-neutral border-yellow-600 border-b-4 border-0"
        >
          Pay Now
        </button>
        {showModal && (
          <Payment data={totalPrice} onClose={onClose} />
        )}
      </div>
      {/* Table */}
      <div className="overflow-x-auto py-8">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="md:text-xl">Item Image</th>
              <th className="md:text-xl">Item Name</th>
              <th className="md:text-xl">Price</th>
              <th className="md:text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart?.map((item, index) => (
              <tr className="bg-base-200" key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    className="rounded-md md:w-[100px]"
                    src={item.image}
                    alt=""
                  />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td className="text-3xl text-red-400 hover:cursor-pointer">
                  <MdDelete onClick={() => handleDelete(item._id)}></MdDelete>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
