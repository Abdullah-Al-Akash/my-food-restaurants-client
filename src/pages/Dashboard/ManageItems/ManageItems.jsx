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

  // Final Update Content:
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const recipe = form.recipe.value;

    const updatedItem = { name, category, price, recipe };
    console.log(updatedItem);

    try {
      const res = await axiosSecure.patch(
        `/item/${selectedItem._id}`,
        updatedItem
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Item Updated!",
          timer: 1500,
          showConfirmButton: false,
        });
        form.reset();
        document.getElementById("my_modal_3").close();
        refetch();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
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
            <form
              onSubmit={handleUpdateSubmit}
              className="form-control p-4 space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block mb-1 text-sm font-semibold">Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={selectedItem?.name}
                  placeholder="Enter item name"
                  className="w-full p-3 text-base border-2 border-orange-100 rounded-lg focus:outline-none focus:border-orange-300"
                />
              </div>

              {/* Category and Price */}
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                {/* Category */}
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-semibold">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={selectedItem?.category}
                    className="w-full p-3 text-base border-2 border-orange-100 rounded-lg focus:outline-none focus:border-orange-300"
                  >
                    <option disabled>Select category</option>
                    <option value="salad">Salad</option>
                    <option value="pizza">Pizza</option>
                    <option value="dessert">Dessert</option>
                    <option value="drinks">Drinks</option>
                    <option value="soup">Soup</option>
                  </select>
                </div>

                {/* Price */}
                <div className="flex-1 mt-4 md:mt-0">
                  <label className="block mb-1 text-sm font-semibold">
                    Price
                  </label>
                  <input
                    name="price"
                    type="text"
                    defaultValue={selectedItem?.price}
                    placeholder="Enter price"
                    className="w-full p-3 text-base border-2 border-orange-100 rounded-lg focus:outline-none focus:border-orange-300"
                  />
                </div>
              </div>

              {/* Recipe */}
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Recipe Details
                </label>
                <textarea
                  name="recipe"
                  rows="4"
                  defaultValue={selectedItem?.recipe}
                  placeholder="Enter recipe details"
                  className="w-full p-3 text-base border-2 border-orange-100 rounded-lg focus:outline-none focus:border-orange-300"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-lg bg-orange-200 hover:bg-orange-300 border-0 text-black w-full normal-case"
              >
                Update Item
              </button>
            </form>
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
