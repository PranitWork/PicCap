import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncregisteruser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";

const RegisterPage = () => {

  const {register, handleSubmit, reset} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const [error, setError] = useState("");

  const registerHandler = async (data) => {
    const result = await dispatch(asyncregisteruser(data));

    if (result.success) {
      setError("");
      setTimeout(() => navigate("/"), 1500); // Redirect after delay
    } else {
      setError(result.message);
      alert(error);
    }
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Register on PicCap</h1>

        <form method="post" className="space-y-4" onSubmit={handleSubmit(registerHandler)}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            {...register("username", { required: true })}
            required
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", { required: true })}
            required
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            {...register("password", { required: true })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-gray-900 font-semibold py-2 rounded hover:bg-gray-300 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
