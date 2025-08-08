"use client"

import { useState } from "react"
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"
import { HiMenu, HiX } from "react-icons/hi"

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-t from-[#1a1a2e] to-[#2a154b] backdrop-blur-md text-white px-6 md:px-20 py-4 flex justify-between items-center shadow-md">
      {/* Left - Name */}
      <div className="text-lg font-semibold">Rafi Putra Fauzi</div>

      {/* Middle - Navigation Links (desktop) */}
      <div className="hidden md:flex gap-6 text-sm text-gray-300">
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

      {/* Right - Social Media Icons (desktop) */}
      <div className="hidden md:flex gap-4 text-gray-300">
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

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1a1a2e] flex flex-col items-center gap-4 py-4 md:hidden shadow-lg">
          <button onClick={() => { scrollToSection("home"); setMenuOpen(false) }} className="hover:text-blue-500 transition">
            Home
          </button>
          <button onClick={() => { scrollToSection("experience"); setMenuOpen(false) }} className="hover:text-blue-500 transition">
            Experience
          </button>
          <button onClick={() => { scrollToSection("projects"); setMenuOpen(false) }} className="hover:text-blue-500 transition">
            Project
          </button>
          <div className="flex gap-4 text-gray-300 mt-2">
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
        </div>
      )}
    </nav>
  )
}
