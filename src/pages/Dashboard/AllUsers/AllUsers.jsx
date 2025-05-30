import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleDeleteUser = (id) => {
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
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `Account has been deleted`,
              showConfirmButton: false,
              timer: 1000,
            });
            refetch();
          }
        });
      }
    });
  };

  //   Make Admin:
  const handleMaketoAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/admin/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `Admin Done!`,
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
      <SectionTitle
        heading={"Manage Users"}
        subHeading={"---How Many??---"}
      ></SectionTitle>
      <div className="flex justify-between m-4">
        <h3 className="text-2xl font-semibold">All Users</h3>
        <h3 className="text-2xl font-semibold">Total Users: {users.length}</h3>
      </div>
      <div className="overflow-x-auto py-8">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="md:text-xl">Name</th>
              <th className="md:text-xl">Email</th>
              <th className="md:text-xl">Role</th>
              <th className="md:text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user, index) => (
              <tr key={user._id} className="bg-base-200">
                <th>{index + 1}</th>
                <td className="text-lg font-semibold">{user.name}</td>
                <td className="text-lg font-semibold">{user.email}</td>
                <td className="text-3xl text-green-400 hover:cursor-pointer">
                  {user?.role == "admin" ? (
                    <>
                      <span className="text-xl text-green-700 font-semibold bg-green-200 text-center px-2 py-1 rounded-md">
                        Admin
                      </span>
                    </>
                  ) : (
                    <FaUsers
                      onClick={() => {
                        handleMaketoAdmin(user._id);
                      }}
                    ></FaUsers>
                  )}
                </td>
                <td className="text-3xl text-red-400 hover:cursor-pointer">
                  <MdDelete
                    onClick={() => handleDeleteUser(user._id)}
                  ></MdDelete>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
