import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCarts from "../../hooks/useCarts";

const FoodCard = ({ item }) => {
  const { name, recipe, image, price } = item;
  const[, refetch] = useCarts();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleAdToCart = (food) => {
    if (user && user?.email) {
      const cardItem = {
        foodId: food._id,
        email: user?.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/carts", cardItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added in cart`,
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
        }
      });
    } else {
      //Navigate to login:
      Swal.fire({
        title: "You are not logged in",
        text: "Please login",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  return (
    <div className="bg-[#f3f3f3] shadow-xl text-center relative">
      <figure>
        <img className="w-full rounded-sm" src={image} alt={name} />
      </figure>

      <p className="bg-black text-white px-4 py-2 rounded-md absolute top-0 right-0">
        ${price}
      </p>

      <div className="card-body">
        <h2 className="text-xl font-bold text-center">{name}</h2>
        <p className="text-gray-400">{recipe.slice(0, 70)}</p>
        <div className="card-actions justify-center items-center mt-4">
          <button
            onClick={() => handleAdToCart(item)}
            className="btn btn-outline text-yellow-600 bg-gray-200 border-yellow-600 border-b-2 border-0 text-xl hover:border-b-yellow-600 hover:text-yellow-600 normal-case"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
