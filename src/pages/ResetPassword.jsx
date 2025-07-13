import React, { useState, useRef, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'

const ResetPassword = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { backendUrl } = useContext(AppContent)
  const navigate = useNavigate()
  const inputsRef = useRef([])

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
      if (data.success) {
        toast.success(data.message)
        setStep(2)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
    setLoading(false)
  }

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {
        email,
        otp: otp.join(''),
        newPassword,
      })
      if (data.success) {
        toast.success(data.message)
        setTimeout(() => navigate('/login'), 1500)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
    setLoading(false)
  }

  // OTP input handlers
  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (!value) {
      const newOtp = [...otp]
      newOtp[idx] = ''
      setOtp(newOtp)
      return
    }
    const newOtp = [...otp]
    newOtp[idx] = value[0]
    setOtp(newOtp)
    if (idx < 5) {
      inputsRef.current[idx + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (otp[idx]) {
        const newOtp = [...otp]
        newOtp[idx] = ''
        setOtp(newOtp)
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus()
      }
    }
  }

  const handleOtpPaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (paste.length === 6) {
      setOtp(paste.split(''))
      setTimeout(() => inputsRef.current[5]?.focus(), 10)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 px-4">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 border border-blue-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 text-center">Reset Password</h2>
        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="px-4 py-3 rounded-xl border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white font-bold shadow-xl hover:from-blue-700 hover:to-pink-600 transition-all duration-200 text-lg tracking-wide disabled:opacity-60"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
            <input
              type="email"
              value={email}
              disabled
              className="px-4 py-3 rounded-xl border border-blue-200 bg-gray-100 text-gray-500 shadow"
            />
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => (inputsRef.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(e, idx)}
                  onKeyDown={e => handleOtpKeyDown(e, idx)}
                  onPaste={idx === 0 ? handleOtpPaste : undefined}
                  onFocus={e => e.target.select()}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl sm:text-3xl font-bold border-2 border-purple-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-150 shadow"
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              className="px-4 py-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow"
            />
            <button
              type="submit"
              disabled={loading || otp.some(d => !d)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold shadow-xl hover:from-purple-700 hover:to-red-600 transition-all duration-200 text-lg tracking-wide disabled:opacity-60"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        )}
        <p className="mt-4 text-center text-sm text-gray-500">
          {step === 1
            ? 'Enter your registered email to receive the OTP.'
            : 'Enter the OTP sent to your email and your new password.'}
        </p>
      </div>
    </div>
  )
}

export default ResetPassword