import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { auth } from "../../store/firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  const NAV_LINKS = [
    {
      title: "MemberShip",
      to: "membership",
    },
    {
      title: "Subscription Deduction",
      to: "subscription-deduction",
    },
    {
      title: "Saving Deduction",
      to: "saving-deduction",
    },
  ];
  const user = auth?.currentUser;

  return (
    <div className="flex ">
      <div className="w-[150px] bg-primary h-screen pt-16 p-4 fixed left-0 z-10">
        <nav>
          <ul>
            {NAV_LINKS.map((link) => (
              <li className="mb-4">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    " w-full rounded-3xl px-6 py-2 my-1 font-poppins font-semibold flex justify-between items-center hover:bg-white hover:text-primary transition-all duration-300 text-sm no-underline capitalize  " +
                    (isActive ? "bg-white text-primary" : "text-white ")
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="ml-[150px]">
        <div className="bg-white shadow-md h-16 w-full pl-[170px] p-4 fixed top-0 left-0 flex justify-between">
          <h4 className="text-primary">Hi {user?.email}</h4>
          <button
            className="text-primary font-semibold flex gap-1 items-center hover:bg-primary/10 p-3"
            onClick={handleLogout}
          >
            <MdOutlinePowerSettingsNew />
            Logout
          </button>
        </div>
        <div className="p-4 mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
