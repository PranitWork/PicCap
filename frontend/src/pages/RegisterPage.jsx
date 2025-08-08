import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    console.log("Registering with:", form);
    // TODO: Add register logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Register on PicCap</h1>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={handleRegister}
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
