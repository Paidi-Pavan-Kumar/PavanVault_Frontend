import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'

const Header = () => {
  const { userData } = useContext(AppContent)
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4 sm:py-20 sm:px-8
      bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200
      rounded-2xl shadow-2xl mx-2 sm:mx-auto max-w-2xl border border-blue-200
      transition-all duration-300">
      <img
        src={assets.header_img}
        alt=""
        className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain mb-6 drop-shadow-xl bg-white rounded-full p-2 border-4 border-white shadow-lg transition-all duration-300"
      />
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold flex flex-wrap items-center gap-3 mb-3 text-blue-700 drop-shadow-lg">
        Welcome {userData ? userData.name : "Developer"}!
        <img
          src={assets.hand_wave}
          alt="wave"
          className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain animate-bounce"
        />
      </h1>
      <h2 className="text-base sm:text-xl md:text-2xl font-semibold mb-2 text-purple-700 drop-shadow">
        Glad to have you here on my MERN Auth site.
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-pink-700 mb-6 max-w-md bg-white/70 rounded-lg p-3 shadow transition-all duration-300">
        Explore my work, connect with me, or reach out for freelance opportunities. Let's build something great together!
      </p>
    </div>
  )
}

export default Header
