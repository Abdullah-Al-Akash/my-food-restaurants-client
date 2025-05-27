import { MdDelete } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";

const ManageItems = () => {
  const [menu, loader] = useMenu();
  const handleDeleteItem = id => {
    // Delete Item:
  }

  const handleUpdateItem = id => {
    // Update the item:
  }
  return (
    <div>
      <SectionTitle
        heading={"Manage Items"}
        subHeading={"---Hurry Up---"}
      ></SectionTitle>

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
                <FaEdit onClick={() => handleUpdateItem(item._id)}></FaEdit>
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
