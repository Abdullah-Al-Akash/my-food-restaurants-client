import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProvider";
import img from "../../assets/others/authentication2.png";
import bgCover from "../../assets/others/authentication.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [captchaErr, setCaptchaErr] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  
  useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const captcha = form.captcha.value;
    const isValid = validateCaptcha(captcha);
    if (isValid) {
      setCaptchaErr("");
      loginUser(email, password)
        .then((result) => {
          const user = result?.user;
          user &&
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully Login",
              showConfirmButton: false,
              timer: 1500,
            });
            user && navigate(from, {replace: true});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCaptchaErr("Captcha does not match");
    }
  };
  return (
    <div
      className="md:hero-content min-h-screen"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      <div
        className={`hero-content shadow-2xl`}
        style={{ backgroundImage: `url(${bgCover})` }}
      >
        <div className="md:w-1/2 md:block hidden">
          <img src={img} alt="" />
        </div>
        <div className="md:w-1/2 w-full">
          <h3 className="text-center text-4xl font-bold mt-2">Login</h3>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Email</span>
              </label>
              <input
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
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-lg">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                name="captcha"
                placeholder="Type the captcha"
                className="input input-bordered"
                required
              />
              <span className="text-red-600">{captchaErr}</span>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-lg bg-orange-200 btn-primary hover:bg-orange-300 border-0 text-black"
                type="submit"
                value="Login"
              />
            </div>
            <div className="form-control mt-6">
              <p className="text-center text-lg ">
                New here?{" "}
                <span>
                  <Link
                    to="/registration"
                    className="font-semibold underline text-yellow-600"
                  >
                    Create a New Account
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

export default Login;
