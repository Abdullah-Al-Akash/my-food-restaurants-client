import { MdDelete } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const ManageItems = () => {
  const [menu, loader, refetch] = useMenu();
  const [selectedItem, setSelectedItem] = useState({});
  const axiosSecure = useAxiosSecure();
  const handleDeleteItem = (id) => {
    console.log(id);
    // Delete Item:
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/item/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Deleted Item",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  };

  const handleUpdateItem = (item) => {
    setSelectedItem(item);
    // Update the item:
    document.getElementById("my_modal_3").showModal();
    console.log(selectedItem);
  };
  return (
    <div>
      <SectionTitle
        heading={"Manage Items"}
        subHeading={"---Hurry Up---"}
      ></SectionTitle>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setSelectedItem("")}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          {selectedItem && (
            <div className="form-control p-4">
              <label className="input-group input-group-sm">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Type here"
                  defaultValue={selectedItem?.name}
                  className="input input-bordered input-md w-full"
                />
              </label>
              <div className="input-group mt-2 flex">
                <div>
                  <select className="select select-bordered">
                    <option disabled selected>
                      Select category
                    </option>
                    <option>T-shirts</option>
                    <option>Mugs</option>
                  </select>
                </div>
                <div className="ms-2 flex-shrink-1">
                  <label className="input-group input-group-sm">
                    <span>Price</span>
                    <input
                      type="text"
                      placeholder="Type here"
                      defaultValue={selectedItem?.price}
                      className="input input-bordered input-md w-full"
                    />
                  </label>
                </div>
              </div>
              <div>
                <h3 className="mt-2 mb-1">Recipe Details</h3>
                <textarea className="textarea textarea-warning w-full" placeholder="" defaultValue={selectedItem.recipe}></textarea>
              </div>
              <input className="btn btn-lg bg-orange-200 btn-primary hover:bg-orange-300 border-0 text-black mt-2" type="submit" value="Update Item" />
            </div>
          )}
        </div>
      </dialog>
      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th className="md:text-xl">Item Image</th>
            <th className="md:text-xl">Item Name</th>
            <th className="md:text-xl">Price</th>
            <th className="md:text-xl">Update</th>
            <th className="md:text-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {menu?.map((item, index) => (
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
              <td className="text-3xl text-green-400 hover:cursor-pointer">
                <FaEdit onClick={() => handleUpdateItem(item)}></FaEdit>
              </td>
              <td className="text-3xl text-red-400 hover:cursor-pointer">
                <MdDelete onClick={() => handleDeleteItem(item._id)}></MdDelete>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageItems;
