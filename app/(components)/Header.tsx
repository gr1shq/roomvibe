"use client"

import { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    // { name: "TikTok Picks", href: "/tiktok-picks" },
    { name: "Vibe Feed", href: "/vibefeed" },
    { name: "About", href: "/about" },
    { name: "Contact us", href: "/contact" }
  ]

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 backdrop-blur bg-[#100720] text-white z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
          <h1 className="text-2xl md:text-3xl font-bold font-outfit flex items-center">
  <span className="relative mr-2">
    {/* Logo container with subtle border */}
    <span className="block w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 relative overflow-hidden border border-white/20">
      {/* Vibe wave element - more pronounced */}
      <span className="absolute bottom-0 left-0 right-0 h-1/2 bg-white/20 backdrop-blur-[2px]">
        <span className="absolute -bottom-1 left-0 right-0 h-2 bg-white/40 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]"></span>
      </span>
      {/* Small accent dot */}
      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/80"></span>
    </span>
  </span>
  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
    RoomVibe
  </span>
</h1>          
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6 lg:gap-8">
                {navItems.map((item) => (
                  <li key={item.name} className="hover:text-[#9d92e2] transition-colors">
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`h-0.5 w-full bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`h-0.5 w-full bg-white transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`h-0.5 w-full bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-[#111111]/95 backdrop-blur-md transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden pt-20 px-6`}>
        <nav className="flex flex-col space-y-6 text-white">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-2xl font-medium hover:text-[#9d92e2] py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Header