import { FaDeleteLeft } from "react-icons/fa6";
import useCarts from "../../../hooks/useCarts";
import { FaRemoveFormat } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [cart] = useCarts();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  return (
    <div>
      <div className="grid grid-cols-3 gap-8">
        <h3 className="md:text-3xl font-semibold">
          Total Items: {cart.length}
        </h3>
        <h3 className="md:text-3xl font-semibold">
          Total Price: ${totalPrice}
        </h3>
        <button className="btn normal-case btn-neutral border-yellow-600 border-b-4 border-0">
          Pay Now
        </button>
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
              <>
                <tr className="bg-base-200" key={item._id} >
                  <th>{index+1}</th>
                  <td>
                    <img className="rounded-md md:w-[100px]" src={item.image} alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td className="text-2xl text-red-400 hover:cursor-pointer"><MdDelete /></td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
