"use client"

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}


export default function Navbar() {
  return (
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-t from-[#1a1a2e] to-s[#2a154b] backdrop-blur-md text-white px-20 py-4 flex justify-between items-center shadow-md">
      {/* Left - Name */}
      <div className="text-lg font-semibold">
        Rafi Putra Fauzi
      </div>

      {/* Middle - Navigation Links */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-sm text-gray-300">
       <button onClick={() => scrollToSection("home")} className="hover:text-blue-500 transition">
        Home
       </button>
       <button onClick={() => scrollToSection("experience")} className="hover:text-blue-500 transition">
        Experience
       </button>
       <button onClick={() => scrollToSection("projects")} className="hover:text-blue-500 transition">
        Project
       </button>

      </div>

      {/* Right - Social Media Icons */}
      <div className="flex gap-4 text-gray-300">
        <a href="https://instagram.com/raf.putr" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
          <FaInstagram size={18} />
        </a>
        <a href="https://linkedin.com/in/rafiputrafauzi" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
          <FaLinkedin size={18} />
        </a>
        <a href="https://github.com/rafuiyy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
          <FaGithub size={18} />
        </a>
      </div>
    </nav>
  )
}
