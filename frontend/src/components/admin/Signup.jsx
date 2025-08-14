import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/signup", {
        name, // now sending name
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Signup successful!");
        navigate("/admin/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border-[#5044e5]/30 shadow-xl shadow-[#5044e5]/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-[#5044e5]">Admin</span> Signup
            </h1>
            <p className="font-light">Create an account to get started</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:mx-w-md text-gray-600"
          >
            {/* Name */}
            <div className="flex flex-col">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                placeholder="Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                placeholder="Your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-medium bg-[#5044e5] text-white rounded cursor-pointer hover:bg-[#5044e5]/90"
            >
              Signup
            </button>
          </form>

          {/* Link to login */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/admin/login")}
              className="text-[#5044e5] font-semibold cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
