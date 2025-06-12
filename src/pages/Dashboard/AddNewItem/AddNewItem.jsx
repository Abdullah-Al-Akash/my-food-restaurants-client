import { useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddNewItem = () => {
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB;
  const fileInputRef = useRef(null);
  const axiosSecure = useAxiosSecure();

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
  const handleAddItem = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const recipe = form.recipe.value;
    const category = form.category.value;
    const price = form.price.value;
    const imageFile = form.image.files[0];

    // Convert image to base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    try {
      const base64Image = await toBase64(imageFile);
      const imageUrl = await uploadToImgbb(base64Image); // ✅ ImgBB upload
      console.log("Uploaded image URL:", imageUrl);

      const newItem = {
        name,
        recipe,
        category,
        price: parseFloat(price),
        image: imageUrl,
      };
      console.log(newItem);
      // ✅ Post to your backend
      const res = await axiosSecure.post("/menu", newItem);
      console.log("Item posted:", res.data);
      if (res?.data?.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Item added successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
        e.target.reset();
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  return (
    <form onSubmit={handleAddItem} className="form-control p-4 space-y-4">
      {/* Name */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <div className="flex-1 mt-4 md:mt-0">
          <label className="block mb-1 text-sm font-semibold">Item Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter Name"
            className="w-full p-3 text-base border-2 border-orange-100 rounded-lg focus:outline-none focus:border-orange-300"
            required
          />
        </div>
        <div className="flex-1 mt-4 md:mt-0">
          <label className="block mb-1 text-sm font-semibold">
            Select Image
          </label>
          <input
            name="image"
            type="file"
            placeholder="Select Image"
            className="w-full p-3 text-base border-2 border-orange-100 rounded-lg focus:outline-none focus:border-orange-300"
            required
          />
        </div>
      </div>

      {/* Category and Price */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        {/* Category */}
        <div className="flex-1">
          <label className="block mb-1 text-sm font-semibold">Category</label>
          <select
            name="category"
            className="w-full p-3 text-base border-2 border-orange-100 rounded-lg focus:outline-none focus:border-orange-300"
            required
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
          <label className="block mb-1 text-sm font-semibold">Price</label>
          <input
            name="price"
            type="number"
            placeholder="Enter price"
            className="w-full p-3 text-base border-2 border-orange-100 rounded-lg focus:outline-none focus:border-orange-300"
            required
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
          placeholder="Enter recipe details"
          className="w-full p-3 text-base border-2 border-orange-100 rounded-lg focus:outline-none focus:border-orange-300"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-lg bg-orange-200 hover:bg-orange-300 border-0 text-black w-full normal-case"
      >
        Add Item <FaPlusCircle />
      </button>
    </form>
  );
};

export default AddNewItem;
