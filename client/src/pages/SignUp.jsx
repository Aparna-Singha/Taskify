import React, { useState } from "react";
import logo from "../assets/task.jpg"; // Taskify logo
// import heroImage from "../assets/hero-task.png"; // optional illustration
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../apiCalls/authCalls.js";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function SignUp() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (!name || !userName || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    const user = { name, userName, email, password };

    try {
      const response = await signUp(user);
      console.log("Sign Up Successful", response);

      // Save token to localStorage if returned
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      dispatch(setUserData(response));
      navigate("/home");

      // Clear form
      setName("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error during sign up", error);
      alert("Sign Up Failed. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
      <div className="w-[95%] lg:max-w-[60%] h-[650px] rounded-2xl flex justify-center items-center overflow-hidden shadow-lg">
        
        {/* LEFT (Form) */}
        <div className="w-full lg:w-1/2 h-full bg-white flex flex-col items-center justify-center px-6 sm:px-10 gap-5 rounded-l-2xl shadow-md">
          <div className="flex flex-col items-center gap-2 mb-4">
            <img src={logo} alt="Taskify Logo" className="w-[80px] h-[80px]" />
            <h2 className="text-2xl font-bold text-gray-800">Sign Up for Taskify</h2>
            <p className="text-gray-500 text-sm text-center">
              Create your account and start managing your tasks efficiently
            </p>
          </div>

          {/* Inputs */}
          <div className="w-full flex flex-col items-center gap-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-[95%] h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              className="w-[95%] h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-[95%] h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[95%] h-[44px] px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            className="w-[70%] h-[44px] mt-4 rounded-lg font-semibold bg-purple-500 text-white hover:opacity-90 active:scale-[0.98] transition shadow-md"
          >
            Sign Up
          </button>

          {/* Footer */}
          <p className="text-gray-500 text-sm mt-3 text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-gray-800 font-medium underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* RIGHT (illustration panel) */}
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

export default SignUp;