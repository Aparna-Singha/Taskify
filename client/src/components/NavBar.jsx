import React from "react";
import taskLogo from "../assets/task.jpg"; // Your task logo
import { useSelector } from "react-redux";
import useCurrentUser from "../hooks/useCurrentUser.jsx";

function Navbar() {
  useCurrentUser();
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[60px] bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={taskLogo}
          alt="Taskify Logo"
          className="w-[40px] h-[40px] rounded-md"
        />
        <h1 className="text-xl font-bold text-gray-800">Taskify</h1>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">
          {userData?.user?.name || "Guest"}
        </span>
        <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold">
          {userData?.user?.name?.charAt(0).toUpperCase() || "G"}
        </div>
      </div>
    </div>
  );
}

export default Navbar;