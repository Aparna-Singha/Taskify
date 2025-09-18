import React from "react";
import { Link } from "react-router-dom";
import taskLogo from "../assets/task.jpg"; // your task/todo logo
// import heroImage from "../assets/hero-task.png"; // optional hero illustration

function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col">
      
      {/* Navbar */}
      <div className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <img src={taskLogo} alt="Taskify Logo" className="w-[50px] h-[50px] rounded-lg shadow-sm" />
          <span className="text-2xl font-bold text-gray-800">Taskify</span>
        </div>
        <div className="flex gap-4">
          <Link
            to="/signin"
            className="px-4 py-2 bg-white text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold shadow hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row flex-1 justify-center items-center gap-10 px-6 lg:px-20 py-12">
        {/* Left side */}
        <div className="flex flex-col gap-6 max-w-xl text-gray-800">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
            Organize. Track. Achieve. ✅
          </h1>
          <p className="text-lg md:text-xl text-gray-700 opacity-90">
            Welcome to <span className="font-bold">Taskify</span> — your personal productivity hub.  
            Manage tasks, stay focused, and get things done efficiently.
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-purple-500 text-white text-lg font-semibold rounded-xl shadow hover:opacity-90 transition active:scale-[.98]"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="px-6 py-3 bg-white text-gray-800 text-lg font-semibold rounded-xl shadow hover:bg-gray-100 transition active:scale-[.98]"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right side with image */}
        <div className="relative flex justify-center items-center">
          <div className="absolute w-[300px] h-[300px] bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
          {/* <img
            src={heroImage} // optional task/hero illustration
            alt="Taskify Hero"
            className="relative w-[350px] md:w-[400px] drop-shadow-2xl"
          /> */}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center text-gray-700 py-4 text-sm opacity-80">
        © {new Date().getFullYear()} Taskify — Organize your life efficiently ✅
      </div>
    </div>
  );
}

export default LandingPage;