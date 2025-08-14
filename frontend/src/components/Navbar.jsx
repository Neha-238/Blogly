import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      {/* Buttons wrapper */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-[#5044e5] text-white px-6 py-2.5"
        >
          {token && token !== "null" && token !== "" ? "Dashboard" : "Login"}
          <img src={assets.arrow} className="w-3" alt="arrow" />
        </button>

        <button
          onClick={() => navigate("/admin/signup")}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-[#5044e5] text-white px-6 py-2.5"
        >
          Signup
          <img src={assets.arrow} className="w-3" alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
