import React, { useState, useRef, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const EmailVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const { backendUrl, getUserData, isLoggedIn, userData } = useContext(AppContent)
  const navigate = useNavigate()
  const inputsRef = useRef([])


  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (!value) {
      // If the input is cleared, clear the box and don't move focus
      const newOtp = [...otp]
      newOtp[idx] = ''
      setOtp(newOtp)
      return
    }
    const newOtp = [...otp]
    newOtp[idx] = value[0]
    setOtp(newOtp)
    // Always move to next input if not last box
    if (idx < 5) {
      inputsRef.current[idx + 1].focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (otp[idx]) {
        const newOtp = [...otp]
        newOtp[idx] = ''
        setOtp(newOtp)
      } else if (idx > 0) {
        inputsRef.current[idx - 1].focus()
      }
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (paste.length === 6) {
      setOtp(paste.split(''))
      setTimeout(() => inputsRef.current[5].focus(), 10)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp: otp.join('') })
      if (data.success) {
        toast.success(data.message)
        getUserData && getUserData()
        setTimeout(() => navigate('/'), 1500)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/")
  }, [isLoggedIn, userData]);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 px-4">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 border border-blue-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 text-center">Verify Your Email</h2>
        <p className="text-purple-700 text-center mb-6">
          Enter the 6-digit OTP sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => (inputsRef.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                onPaste={idx === 0 ? handlePaste : undefined}
                onFocus={e => e.target.select()}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl sm:text-3xl font-bold border-2 border-purple-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-150 shadow"
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={loading || otp.some(d => !d)}
            className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white font-bold shadow-xl hover:from-blue-700 hover:to-pink-600 transition-all duration-200 text-lg tracking-wide disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-700">
          Didn't receive the OTP?{' '}
          <span
            onClick={sendVerificationOtp}
            className="text-blue-600 font-semibold cursor-pointer hover:underline transition-colors duration-200"
          >
            Resend OTP
          </span>
        </p>
      </div>
    </div>
  )
}

export default EmailVerify