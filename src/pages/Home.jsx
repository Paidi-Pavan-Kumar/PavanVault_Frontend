import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100">
      <Navbar />
      <div className="pt-24 flex flex-col items-center">
        <Header />
        <div className="mt-8 w-full max-w-2xl bg-white/80 rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4">
            Hi, I'm Paidi Pavan Kumar
          </h1>
          <p className="text-lg sm:text-xl text-purple-700 mb-4">
            Full Stack Developer | Freelancer | MERN Specialist
          </p>
          <ul className="text-base text-pink-600 mb-6 list-disc list-inside text-left mx-auto max-w-md">
            <li>🚀 Building modern web apps with React, Node.js, Express & MongoDB</li>
            <li>💼 Available for freelance projects and collaborations</li>
            <li>🛠️ REST APIs, Authentication, Dashboards, SaaS, and more</li>
            <li>🎨 Clean UI/UX with Tailwind CSS & Material UI</li>
            <li>📈 Helping startups and businesses go digital</li>
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-green-400 to-green-600 text-white font-bold shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-lg"
              onClick={() => window.open('https://wa.me/919182240596?text=Hi%20Pavan%2C%20I%20am%20interested%20in%20your%20freelance%20services!', '_blank')}
            >
              Contact on WhatsApp
            </button>
            <button
              className="px-6 py-3 rounded-full bg-white border border-blue-400 text-blue-700 font-bold shadow hover:bg-blue-50 transition-all duration-200 text-lg"
              onClick={() => window.open('mailto:paidipavanchowdary3@gmail.com', '_blank')}
            >
              Email Me
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/paidi-pavan-kumar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/Paidi-Pavan-Kumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold shadow hover:bg-gray-200 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.589 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a
              href="https://leetcode.com/Paidi_Pavan_Kumar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 font-semibold shadow hover:bg-yellow-100 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32"><path d="M19.443 27.313c-1.313 0-2.563-.5-3.531-1.469l-7.25-7.25c-.719-.719-.719-1.875 0-2.594.719-.719 1.875-.719 2.594 0l7.25 7.25c.469.469 1.25.469 1.719 0 .469-.469.469-1.25 0-1.719l-7.25-7.25c-1.656-1.656-1.656-4.344 0-6 .813-.813 1.906-1.25 3-1.25s2.188.438 3 1.25l7.25 7.25c.719.719.719 1.875 0 2.594-.719.719-1.875.719-2.594 0l-7.25-7.25c-.469-.469-1.25-.469-1.719 0-.469.469-.469 1.25 0 1.719l7.25 7.25c1.656 1.656 1.656 4.344 0 6-.813.813-1.906 1.25-3 1.25z"/></svg>
              LeetCode
            </a>
            <a
              href="mailto:paidipavanchowdary3@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-500 font-semibold shadow hover:bg-red-100 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-11.99-7.065v14h24v-14l-12.01 7.065zm11.99-9.065h-23.98l11.99 7.065 11.99-7.065z"/></svg>
              Email
            </a>
          </div>
          <div className="mt-8 text-gray-600 text-sm">
            <p>
              <span className="font-semibold">Let's connect!</span> Reach out for freelance work, collaborations, or just to say hi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
