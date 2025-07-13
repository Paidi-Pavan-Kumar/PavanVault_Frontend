import React, {  useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();

  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContent);

  const [state, setState] = useState("sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async(e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true
      if(state === "sign up") {
        const {data} = await axios.post(backendUrl + "/api/auth/register", {
          name, email, password
        }) 

        if(data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(backendUrl + "/api/auth/login", {
          email, password
        }) 

        if(data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message)
        }
      }
    } catch(error) {
        toast.error(data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 px-4 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-56 h-56 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-30 blur-2xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tr from-yellow-400 via-pink-400 to-blue-400 rounded-full opacity-30 blur-2xl z-0"></div>
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 relative z-10 border border-blue-200">
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt=""
          className="mx-auto mb-6 w-24 h-24 object-contain cursor-pointer transition-transform hover:scale-110 drop-shadow-lg"
        />
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 mb-2 text-center drop-shadow-lg">
            {state === "sign up" ? "Create Account" : "Login"}
          </h2>

          <form onSubmit = {onSubmitHandler} className="flex flex-col gap-5">
            {state === "sign up" ? (
              <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3 shadow">
                <img src={assets.person_icon} alt="" className="w-6 h-6" />
                <input
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="flex-1 bg-transparent outline-none text-blue-700 placeholder-blue-400 font-semibold"
                />
              </div>
            ) : null}

            <div className="flex items-center gap-2 bg-purple-50 rounded-xl px-4 py-3 shadow">
              <img src={assets.mail_icon} alt="" className="w-6 h-6" />
              <input
                type="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent outline-none text-purple-700 placeholder-purple-400 font-semibold"
              />
            </div>

            <div className="flex items-center gap-2 bg-pink-50 rounded-xl px-4 py-3 shadow">
              <img src={assets.lock_icon} alt="" className="w-6 h-6" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-1 bg-transparent outline-none text-pink-700 placeholder-pink-400 font-semibold"
              />
            </div>

            <p
              onClick={() => navigate("/reset-password")}
              className="text-sm text-blue-500 hover:underline cursor-pointer text-right font-semibold"
            >
              Forgot Password?
            </p>
            <button type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white font-bold shadow-xl hover:from-blue-700 hover:to-pink-600 transition-all duration-200 text-lg tracking-wide"
            >
              {state}
            </button>
          </form>

          {state === "sign up" ? (
            <p className="mt-6 text-center text-sm text-gray-700">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline transition-colors duration-200"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="mt-6 text-center text-sm text-gray-700">
              Don't have an account?{" "}
              <span
                onClick={() => setState("sign up")}
                className="text-purple-600 font-semibold cursor-pointer hover:underline transition-colors duration-200"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
