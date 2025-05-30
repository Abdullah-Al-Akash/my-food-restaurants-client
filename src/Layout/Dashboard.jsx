import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react"; // or use any icon you like
import { FaBook, FaHome, FaListAlt, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { FaCalendar, FaList } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const{user} = useAuth();
  const email = user?.email;
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin] = useAdmin(email);
  const activeClass = ({ isActive }) =>
    `flex items-center gap-2 text-xl px-4 py-2 rounded transition-colors duration-200
       ${
         isActive
           ? "bg-green-100 font-semibold text-green-800"
           : "text-black hover:text-green-800 hover:bg-green-50"
       }`;
  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-orange-300 p-6 z-40 transform transition-transform duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:flex`}
      >
        {/* <h2 className="text-2xl font-bold mb-4">My Menu</h2> */}
        <ul className="space-y-4 fixed">
          {isAdmin ? (
            <>
              <li onClick={handleClose}>
                <NavLink to="/dashboard/admin-home" className={activeClass}>
                  <FaHome />
                  <span>Admin Home</span>
                </NavLink>
              </li>
              <li onClick={handleClose}>
                <NavLink to="/dashboard/add-items" className={activeClass}>
                  <FaUtensils></FaUtensils>
                  <span>Add Items</span>
                </NavLink>
              </li>
              <li onClick={handleClose}>
                <NavLink to="/dashboard/manage-items" className={activeClass}>
                  <FaListAlt></FaListAlt>
                  <span>Manage Items</span>
                </NavLink>
              </li>
              {/* <li onClick={handleClose}>
                <NavLink to="/dashboard/payment-history" className={activeClass}>
                  <FaBook></FaBook>
                  <span>Payment History</span>
                </NavLink>
              </li> */}
              <li onClick={handleClose}>
                <NavLink to="/dashboard/all-users" className={activeClass}>
                  <FaUsers></FaUsers>
                  <span>All Users</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li onClick={handleClose}>
                <NavLink to="/" className={activeClass}>
                  <FaHome />
                  <span>User Home</span>
                </NavLink>
              </li>
              <li onClick={handleClose}>
                <NavLink to="/dashboard/reservation" className={activeClass}>
                  <FaCalendar></FaCalendar>
                  <span>Reservation</span>
                </NavLink>
              </li>
              <li onClick={handleClose}>
                <NavLink to="/dashboard/cart" className={activeClass}>
                  <FaShoppingCart />
                  <span>My Cart</span>
                </NavLink>
              </li>
              <li onClick={handleClose}>
                <NavLink to="/dashboard/payment-history" className={activeClass}>
                  <FaList></FaList>
                  <span>Payment History</span>
                </NavLink>
              </li>
            </>
          )}
          {/* Divider */}
          <div className="divider"></div>
          <li onClick={handleClose}>
            <NavLink to="/" className={activeClass}>
              <FaHome></FaHome>
              <span>Home</span>
            </NavLink>
          </li>
          <li onClick={handleClose}>
            <NavLink to="/" className={activeClass}>
              <FaList></FaList>
              <span>Menu</span>
            </NavLink>
          </li>
          <li onClick={handleClose}>
            <NavLink to="/order/salads" className={activeClass}>
              <FaHome></FaHome>
              <span>Order Now</span>
            </NavLink>
          </li>
          <li onClick={handleClose}>
            <NavLink to="/" className={activeClass}>
              <FaSearch></FaSearch>
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Hamburger */}
        <button className="md:hidden mb-4" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
