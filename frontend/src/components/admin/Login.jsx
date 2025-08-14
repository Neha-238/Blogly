// import React, { useState } from "react";
// import { toast } from "react-hot-toast";

// import { useAppContext } from "../../context/AppContext";

// const Login = () => {
//   const { axios, setToken } = useAppContext();

//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const response = await axios.post(...);
//       // const data = response.data;

//       const { data } = await axios.post("/api/admin/login", {
//         email,
//         password,
//       });

//       if (data.success) {
//         setToken(data.token);
//         localStorage.setItem("token", data.token);
//         axios.defaults.headers.common["Authorization"] = data.token;
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-full max-w-sm p-6 max-md:m-6 border-[#5044e5]/30 shadow-xl shadow-[#5044e5]/15 rounded-lg">
//         <div className="flex flex-col items-center justify-center">
//           <div className="w-full py-6 text-center">
//             <h1 className="text-3xl font-bold">
//               <span className="text-[#5044e5]">Admin</span> Login
//             </h1>
//             <p className="font-light">
//               Enter your credentials tto access the admin panel
//             </p>
//           </div>

//           {/* Login form */}
//           <form
//             onSubmit={handleSubmit}
//             className="mt-6 w-full sm:mx-w-md text-gray-600"
//           >
//             {/* Email */}
//             <div className="flex flex-col">
//               <label>Email</label>
//               <input
//                 onChange={(e) => setemail(e.target.value)}
//                 value={email}
//                 type="email"
//                 placeholder="your email id"
//                 required
//                 className="border-b-2 border-gray-300 p-2 outline-none mb-6"
//               />
//             </div>

//             {/* password */}
//             <div className="flex flex-col">
//               <label>Password</label>
//               <input
//                 onChange={(e) => setpassword(e.target.value)}
//                 value={password}
//                 type="password"
//                 placeholder="your password"
//                 required
//                 className="border-b-2 border-gray-300 p-2 outline-none mb-6"
//               />
//             </div>

//             {/* submit button */}

//             <button
//               type="submit"
//               className="w-full py-3 font-medium bg-[#5044e5] text-white rounded cursor-pointer hover:bg-[#5044e5]/90"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        // Optional: navigate to dashboard after login
        navigate("/admin");
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
              <span className="text-[#5044e5]">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>

          {/* Login form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:mx-w-md text-gray-600"
          >
            {/* Email */}
            <div className="flex flex-col">
              <label>Email</label>
              <input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                type="email"
                placeholder="your email id"
                required
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            {/* password */}
            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                type="password"
                placeholder="your password"
                required
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            {/* submit button */}
            <button
              type="submit"
              className="w-full py-3 font-medium bg-[#5044e5] text-white rounded cursor-pointer hover:bg-[#5044e5]/90"
            >
              Login
            </button>
          </form>

          {/* Link to signup */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/admin/signup")}
              className="text-[#5044e5] font-semibold cursor-pointer"
            >
              Signup
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
