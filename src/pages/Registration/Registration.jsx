import img from "../../assets/others/authentication2.png";
import bgCover from "../../assets/others/authentication.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result?.user;
        console.log("User", user);
        user &&
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration Done",
            showConfirmButton: false,
            timer: 1500,
          });
        user && navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="md:hero-content min-h-screen"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      <div
        className={`hero-content shadow-2xl md:flex-row-reverse`}
        style={{ backgroundImage: `url(${bgCover})` }}
      >
        <div className="md:w-1/2 md:block hidden">
          <img src={img} alt="" />
        </div>
        <div className="md:w-1/2 w-full">
          <h3 className="text-center text-4xl font-bold mt-2">Registration</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Name</span>
              </label>
              <input
                {...register("name")}
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Email</span>
              </label>
              <input
                {...register("email")}
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">
                  Password
                </span>
              </label>

              <div className="relative">
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full pr-12" // padding for icon
                  required
                />

                {/* Eye icon inside input */}
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.password && (
                <span className="mt-1 text-red-600">
                  Password must be at least 6 characters
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <input
                className="btn btn-lg bg-orange-200 btn-primary hover:bg-orange-300 border-0 text-black"
                type="submit"
                value="Registration"
              />
            </div>
            <div className="form-control mt-6">
              <p className="text-center text-lg ">
                Already user?{" "}
                <span>
                  <Link
                    className="font-semibold underline text-yellow-600"
                    to="/login"
                  >
                    Login here
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
