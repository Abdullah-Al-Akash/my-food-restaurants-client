import { useRef, useState } from "react";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB; // <-- এখানে আপনার imgbb API key দিন

const UserHome = () => {
  const { dUser, refetch } = useUser();
  const [profilePic, setProfilePic] = useState("A"); // default pic
  const fileInputRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  // imgbb তে ছবি আপলোডের জন্য ফাংশন
  async function uploadToImgbb(base64Image) {
    const formData = new FormData();
    formData.append("key", IMGBB_API_KEY);
    // base64 থেকে header অংশ বাদ দিয়ে শুধু ডাটা পাঠাচ্ছি
    formData.append("image", base64Image.split(",")[1]);

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) return data?.data?.url;
    else throw new Error("Image upload failed");
  }

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // ছবির ফাইল সিলেক্ট করলে এই ফাংশন রান হবে
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = ev.target.result;

        try {
          // imgbb তে আপলোড
          const url = await uploadToImgbb(base64);
          if (url) {
            const res = await axiosSecure.patch(`/user/${dUser?._id}`, {
              photo: url,
            });

            refetch();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Profile Picture Changed Successfully!😍",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          setProfilePic(url); // আপডেট ইউজারের প্রোফাইল পিক
          // আপনি refetch() কল করতে পারেন যদি ইউজার ডেটা আপডেট চান সার্ভার থেকে
        } catch (error) {
          console.error(error);
          alert("Image upload failed!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div>
        <h3 className="py-4 text-2xl md:text-5xl text-center font-bold ">
          Welcome Back <br />
        </h3>
        <h3 className="text-orange-600 text-2xl md:text-5xl text-center font-bold pb-4">
          {dUser?.name ? dUser.name : "back"}
        </h3>{" "}
      </div>
      {/* ----------------User Details---------------------- */}
      <div className="flex justify-center py-4">
        <div>
          <div
            className="relative w-24 h-24 cursor-pointer mx-auto"
            onClick={handleImageClick}
          >
            {dUser?.photo || profilePic !== "A" ? (
              <img
                src={dUser?.photo}
                alt="User Profile"
                className="w-full h-full rounded-full object-cover border-2 border-yellow-500"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-yellow-200 object-cover border-2 border-yellow-500 text-yellow-500 flex justify-center items-center">
                <h3 className="text-5xl font-bold">{dUser?.name?.charAt(0)}</h3>
              </div>
            )}
            {/* Camera Icon Overlay */}
            <div className="absolute bottom-0 right-0 bg-gray-800 bg-opacity-70 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7h4l3-3h4l3 3h4v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11a3 3 0 100 6 3 3 0 000-6z"
                />
              </svg>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="py-8 bg-yellow-50 w-96 px-8 my-8 border-2 border-orange-400 border-dashed rounded-md">
            <h3 className="text-center font-bold text-3xl pb-4">About</h3>
            <div className="">
              <h3 className="font-semibold text-gray-400 text-lg border-b-2 py-1">User Name </h3>
              <h3 className="font-semibold text-xl  py-1">{dUser?.name}</h3>
              <h3 className="font-semibold text-gray-400 text-lg border-b-2 py-1">Email</h3>
              <h3 className="font-semibold text-xl  py-1">{dUser?.email}</h3>
              <h3 className="font-semibold text-gray-400 text-lg border-b-2 py-1">Role</h3>
              <h3 className="font-semibold text-xl py-1 text-orange-400">{dUser?.role}</h3>
              <h3 className="font-semibold text-gray-400 text-lg border-b-2 py-1">ID</h3>
              <h3 className="font-semibold text-xl py-1">{dUser?._id}</h3>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
