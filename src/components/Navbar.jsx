import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets.js'
import { AppContent } from '../context/AppContext.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate()
  const {userData, backendUrl, setUserData, setIsLoggedIn} = useContext(AppContent);
  const logout = async() => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false)
      data.success && setUserData({})
      navigate('/')
    } catch (error) {
      toast.error(error.message);
    }
  }

  const sendVerificationOtp = async() => {
    try {
      axios.defaults.withCredentials = true;

      const {data} = await axios.post(backendUrl + "/api/auth/send-verify-otp");
      if(data.success) {
        navigate("/email-verify")
        toast.success(data.message);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  }
  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 sm:px-8 sm:py-4">
        <img src={assets.logo} alt="Logo" className="w-24 sm:w-32 object-contain" />
        {userData && userData.name ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-400 to-pink-400 text-white font-bold text-lg shadow-md border-2 border-white">
              {userData.name[0].toUpperCase()}
            </div>
            {/* Show Verify Email only if not verified */}
            {!userData.isAccountVerified && (
              <button onClick={sendVerificationOtp}
                className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-xs shadow hover:bg-yellow-200 transition"
              >
                Verify Email
              </button>
            )}
            {/* Always show Logout when logged in */}
            <button onClick={logout}
              className="px-4 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-xs shadow hover:bg-red-200 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-sm text-sm sm:text-base"
          >
            Login
            <img src={assets.arrow_icon} alt="" className="w-4 h-4" />
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
