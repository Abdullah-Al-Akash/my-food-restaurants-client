import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  FaHome,
  FaUtensils,
  FaBorderAll,
  FaListAlt,
  FaUsers,
  FaShoppingCart,
  FaList,
  FaSearch,
  FaUserAlt,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const email = user?.email;
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin] = useAdmin(email);

  const activeClass = ({ isActive }) =>
    `flex items-center gap-2 text-lg px-4 py-2 rounded transition-colors duration-200
    ${
      isActive
        ? "bg-orange-400 font-semibold"
        : "text-black  hover:bg-orange-400"
    }`;

  const closeDrawer = () => setIsOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-orange-300 p-6
          transform transition-transform duration-300 ease-in-out
          z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:flex md:flex-col
        `}
      >
        <nav className="flex flex-col space-y-4 overflow-y-auto h-full">
          {isAdmin ? (
            <>
              <NavLink
                to="/dashboard/admin-home"
                className={activeClass}
                onClick={closeDrawer}
              >
                <FaHome />
                <span>Admin Home</span>
              </NavLink>
              <NavLink
                to="/dashboard/add-item"
                className={activeClass}
                onClick={closeDrawer}
              >
                <FaUtensils />
                <span>Add Items</span>
              </NavLink>
              <NavLink
                to="/dashboard/manage-orders"
                className={activeClass}
                onClick={closeDrawer}
              >
                <FaBorderAll />
                <span>Manage Orders</span>
              </NavLink>
              <NavLink
                to="/dashboard/manage-items"
                className={activeClass}
                onClick={closeDrawer}
              >
                <FaListAlt />
                <span>Manage Items</span>
              </NavLink>
              <NavLink
                to="/dashboard/all-users"
                className={activeClass}
                onClick={closeDrawer}
              >
                <FaUsers />
                <span>All Users</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard/user-home"
                className={activeClass}
                onClick={closeDrawer}
              >
                <FaUserAlt />
                <span>My Profile</span>
              </NavLink>
              <NavLink
                to="/dashboard/cart"
                className={activeClass}
                onClick={closeDrawer}
              >
                <FaShoppingCart />
                <span>My Cart</span>
              </NavLink>
              <NavLink
                to="/dashboard/payment-history"
                className={activeClass}
                onClick={closeDrawer}
              >
                <FaList />
                <span>Payment History</span>
              </NavLink>
            </>
          )}

          <div className="border-t border-2 border-orange-400 my-4"></div>

          <NavLink to="/" className={activeClass} onClick={closeDrawer}>
            <FaHome />
            <span>Home</span>
          </NavLink>
          <NavLink to="/menu" className={activeClass} onClick={closeDrawer}>
            <FaList />
            <span>Menu</span>
          </NavLink>
          <NavLink
            to="/order/salads"
            className={activeClass}
            onClick={closeDrawer}
          >
            <FaBorderAll />
            <span>Order Now</span>
          </NavLink>
          <NavLink to="/" className={activeClass} onClick={closeDrawer}>
            <FaSearch />
            <span>Contact</span>
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto ">
        {/* Hamburger for mobile */}
        <div className="bg-orange-200 pt-4 ps-4">
          <button
            className="md:hidden mb-4 text-orange-600 font-bold"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={32} />}
          </button>
        </div>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
