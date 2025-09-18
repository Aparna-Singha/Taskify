import React, { useState } from "react";
import logo from "../assets/task.jpg"; // your Taskify logo
// import heroImage from "../assets/hero-task.png"; // optional illustration
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../apiCalls/authCalls.js";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (!userName || !password) {
      alert("Please fill all the fields");
      return;
    }

    const user = { userName, password };

    try {
      const response = await signIn(user);
      console.log("Sign In Successful", response);

      // Save token to localStorage for persistence
      localStorage.setItem("token", response.token);

      dispatch(setUserData(response));
      navigate("/home");

      setUserName("");
      setPassword("");
    } catch (error) {
      console.error("Error during sign in", error);
      alert("Sign In Failed. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
      <div className="w-[95%] lg:max-w-[60%] h-[600px] rounded-2xl flex justify-center items-center overflow-hidden shadow-lg">
        
        {/* LEFT (form) */}
        <div className="w-full lg:w-1/2 h-full bg-white flex flex-col items-center justify-center px-6 sm:px-10 gap-5 rounded-l-2xl shadow-md">
          
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <img src={logo} alt="Taskify Logo" className="w-[80px] h-[80px] object-contain" />
            <h2 className="text-2xl font-bold text-gray-800">Sign in to Taskify</h2>
            <p className="text-gray-500 text-sm text-center">Manage your tasks efficiently and stay productive</p>
          </div>

          {/* Inputs */}
          <div className="w-full flex flex-col items-center gap-3">
            <input
              type="text"
              placeholder="Username"
              className="w-[95%] h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[95%] h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot password */}
          <div className="w-[95%] text-right mt-1 text-sm text-purple-500 cursor-pointer hover:underline">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            className="w-[95%] h-[44px] mt-4 rounded-lg font-semibold bg-purple-500 text-white hover:opacity-90 active:scale-[0.98] transition shadow-md"
          >
            Sign In
          </button>

          {/* Footer */}
          <p className="text-gray-500 text-sm mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gray-800 font-medium underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* RIGHT (promo / illustration panel) */}
        <div className="md:w-1/2 h-full hidden lg:flex flex-col items-center justify-center bg-purple-500/10 backdrop-blur-md rounded-r-2xl">
          {/* <img
            src={heroImage} 
            alt="Taskify Hero"
            className="w-[60%] drop-shadow-lg"
          /> */}
          <p className="mt-4 text-gray-700 text-center px-4">
            Organize. Track. Achieve. ✅ Taskify helps you stay on top of your tasks every day.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;