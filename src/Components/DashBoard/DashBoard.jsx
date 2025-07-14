import React, { use } from "react";
import Logo from "../Logo/Logo";
import DashNav from "./DashNav";
import { NavLink, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import AdminLink from "../../Routes/AdminLink";
import useUserRole from "../Hooks/UseUserRole";
import Context from "../Contexts/Context";
import {
  FaClipboardCheck,
  FaFirstOrder,
  FaHome,
  FaMotorcycle,
  FaOpenid,
  FaParachuteBox,
  FaTasks,
  FaWallet,
} from "react-icons/fa";
import RiderLink from "../../Routes/RiderLink";

// import useUserRole from "../Hooks/UseUserRole";

const DashBoard = () => {
  const { user } = use(Context);
  console.log(user);
  const data = useUserRole();
  console.log(data);
  return (
    <div>
      <div className="lg:w-9/12 mx-auto my-10">
        <div className="mb-10">
          <Logo></Logo>
        </div>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="lg:hidden">
              <div className="flex-none">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
            <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <NavLink to="/">
                  <FaHome></FaHome>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myparcels">
                  <FaParachuteBox></FaParachuteBox>
                  My Parcels
                </NavLink>
              </li>
              <RiderLink>
                <li>
                  <NavLink to="/dashboard/rider-tasks">
                    <FaTasks></FaTasks>Tasks
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/completed-deliveries"
                    className="flex items-center gap-2"
                  >
                    <FaClipboardCheck />
                    Completed Deliveries
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/total-earnings">
                    <FaWallet></FaWallet>
                    Total earnings
                  </NavLink>
                </li>
              </RiderLink>
              <AdminLink>
                <li>
                  <NavLink to="/dashboard/pendingriders">
                    <FaOpenid></FaOpenid>
                    Pending Riders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/activeriders">
                    <FaFirstOrder></FaFirstOrder>
                    Active Riders
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/admin-manager">
                    👑 Admin Manager
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/assign-rider">
                    <FaMotorcycle></FaMotorcycle> Assign Rider
                  </NavLink>
                </li>
              </AdminLink>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashBoard;
