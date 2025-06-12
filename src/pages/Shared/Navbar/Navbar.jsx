import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaCartPlus } from "react-icons/fa6";
import useCarts from "../../../hooks/useCarts";
import useAdmin from "../../../hooks/useAdmin";
import logo from "../../../assets/logo.png";
import useUser from "../../../hooks/useUser";

import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const { user, logOut, loading } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [cart] = useCarts();
  const { dUser } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  // For User Menu
  // ----------------------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown open/close
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle click on item — close dropdown
  const handleItemClick = () => setIsOpen(false);
  // -----------------------------------------------------
  const handleLogout = () => {
    logOut();
  };
  const navOptions = (
    <>
      <li>
        <Link
          onClick={closeDrawer}
          to="/"
          className={`text-xl text-white hover:text-yellow-400 ${
            location.pathname === "/" ? "text-yellow-400" : ""
          } focus:!bg-transparent hover:!bg-transparent`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          onClick={closeDrawer}
          to="/menu"
          className={`text-xl text-white hover:text-yellow-400 active:text-yellow-400 ${
            location.pathname === "/menu" ? "text-yellow-400" : ""
          } focus:!bg-transparent hover:!bg-transparent`}
        >
          Menu
        </Link>
      </li>
      {dUser?.role === "admin" ? (
        ""
      ) : (
        <>
          <li>
            <Link
              onClick={closeDrawer}
              to="/order/salads"
              className={`text-xl text-white hover:text-yellow-400 active:text-yellow-400 ${
                location.pathname === "/order/salads" ? "text-yellow-400" : ""
              } focus:!bg-transparent hover:!bg-transparent`}
            >
              Order Food
            </Link>
          </li>
          <li>
            <Link
              onClick={closeDrawer}
              to="/dashboard/cart"
              className={`text-xl text-white hover:text-yellow-400 active:text-yellow-400 ${
                location.pathname === "/dashoard/cart" ? "text-yellow-400" : ""
              } focus:!bg-transparent hover:!bg-transparent mt-1`}
            >
              <button className="flex justify-center items-center">
                <FaCartPlus />
                <div className="badge badge-warning ms-2">{cart.length}</div>
              </button>
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 bg-black max-w-screen-xl font-bold">
        <div className="navbar-start">
          <div className="dropdown">
            <div className="relative md:hidden">
              {/* Hamburger */}
              <button
                onClick={toggleDrawer}
                className="lg:hidden p-3 text-xl text-orange-400 focus:outline-none z-50"
              >
                {drawerOpen ? <FaTimes /> : <FaBars />}
              </button>

              {/* Drawer Overlay */}
              {drawerOpen && (
                <div
                  onClick={closeDrawer}
                  className="fixed inset-0 bg-black bg-opacity-40 z-40"
                ></div>
              )}

              {/* Drawer */}
              <div
                className={`fixed top-0 left-0 w-64 h-full bg-black bg-opacity-70 shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
                  drawerOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:static lg:shadow-none lg:bg-transparent lg:w-auto lg:h-auto`}
              >
                <ul className="menu p-4 space-y-2 text-lg font-medium lg:flex lg:space-y-0 lg:space-x-6 lg:p-0">
                  {navOptions}
                </ul>
              </div>
            </div>
          </div>
          <Link to="/" className="">
            <img className="w-[200px]" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {loading ? (
            <span className="loading loading-spinner text-warning me-8"></span>
          ) : user ? (
            //-----------------User Dropdown-------------------------
            <div className="flex items-center">
              <div className="pe-4 md:hidden">
                <Link to="/dashboard/cart">
                  <button className="flex justify-center items-center text-white text-xl">
                    <FaCartPlus />
                    <div className="badge badge-warning ms-2">
                      {cart.length}
                    </div>
                  </button>
                </Link>
              </div>
              <div className="dropdown dropdown-end" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="avatar"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  <div className="avatar online">
                    <div className="w-12 rounded-full bg-yellow-50">
                      {dUser?.photo ? (
                        <img src={dUser?.photo || ""} />
                      ) : (
                        <div className="flex items-center justify-center mt-1">
                          <h3 className="text-3xl text-yellow-500">
                            {dUser?.name.charAt(0)}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
                {isOpen && (
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link
                        to={`${
                          isAdmin
                            ? "dashboard/admin-home"
                            : "dashboard/user-home"
                        }`}
                        onClick={handleItemClick}
                        className="mt-2 justify-between"
                        href="#"
                      >
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    {dUser?.role === "admin" ? (
                      ""
                    ) : (
                      //Here Need to add admin Menu  Task1
                      <>
                        <li>
                          <Link
                            to="/dashboard/cart"
                            className="mt-2"
                            onClick={handleItemClick}
                          >
                            My cart
                            <div className="badge badge-warning ms-2">
                              {cart.length}
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/payment-history"
                            className="mt-2"
                            onClick={handleItemClick}
                          >
                            History
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link to="/" className="mt-2" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            //-------------------------User DropDown---------------------
            // <button
            //   onClick={handleLogout}
            //   className="btn normal-case btn-neutral border-yellow-600 border-b-4 border-0 text-xl"
            // >
            //   Logout
            // </button>

            <Link
              to="login"
              className="btn btn-sm btn-neutral normal-case border-yellow-600 border-b-2 border-0 text-md font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
