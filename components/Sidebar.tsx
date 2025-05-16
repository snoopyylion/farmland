'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

const navLinks = [
  { label: 'Dashboard', icon: '/img/dashboard.png', path: '/dashboard' },
  { label: 'Data Quest', icon: '/img/dataquest.png', path: '/dashboard/data-quest' },
  { label: 'Leaderboard', icon: '/icons/shape.png', path: '/dashboard/leaderboard' },
  { label: 'Loss Prediction', icon: '/icons/info.png', path: '/dashboard/loss-pred' },
  { label: 'Learn', icon: '/img/teacher.png', path: '/dashboard/learn' },
]

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const pathname = usePathname()
  const [iconSize, setIconSize] = useState(20)
  const [sidebarWidth, setSidebarWidth] = useState(collapsed ? '4rem' : '282px')
  
  // Handle responsive sizing based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      
      // Adjust icon size based on screen width
      if (width < 640) { // sm
        setIconSize(16)
        setSidebarWidth(collapsed ? '3rem' : '220px')
      } else if (width < 768) { // md
        setIconSize(18)
        setSidebarWidth(collapsed ? '3.5rem' : '250px')
      } else if (width < 1024) { // lg
        setIconSize(20)
        setSidebarWidth(collapsed ? '4rem' : '282px')
      } else { // xl and above
        setIconSize(22)
        setSidebarWidth(collapsed ? '5rem' : '282px')
      }
    }
    
    // Set initial sizes
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [collapsed])
  
  const toggleSidebar = () => setCollapsed(!collapsed)
  
  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 h-dvh bg-[#132A21] text-pink-100 shadow-lg items-center flex flex-col justify-between transition-all duration-300 z-50'
      )}
      style={{ width: sidebarWidth }}
    >
      {/* Logo + Toggle */}
      <div className="w-full">
        <div className="p-2 sm:p-3 md:p-4 flex items-center justify-between">
          {!collapsed && (
            <div className="relative w-[70%] h-[24px] sm:h-[28px] md:h-[32px] lg:h-[36px]">
              <Image fill src="/img/logo-white.png" alt="logo" className="object-contain" />
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-pink-100 hover:text-gray-400 focus:outline-none text-sm sm:text-base md:text-lg"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="mt-2 sm:mt-3 md:mt-4 w-full">
          <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 px-1 sm:px-1.5 md:px-2 w-full">
            {navLinks.map(({ label, icon, path }) => (
              <li key={label}>
                <Link
                  href={path}
                  className={clsx(
                    'flex items-center p-1.5 sm:p-2 rounded-md cursor-pointer hover:bg-gray-500 hover:border-[0.5px] border-white/20 transition',
                    pathname === path &&
                      'bg-white/10 border-[0.5px] border-white/20 text-pink-100 font-semibold'
                  )}
                >
                  <Image 
                    src={icon} 
                    alt={label} 
                    width={iconSize} 
                    height={iconSize} 
                    className="min-w-4"
                  />
                  {!collapsed && (
                    <span className="ml-2 sm:ml-2.5 md:ml-3 text-xs sm:text-sm md:text-base whitespace-nowrap">
                      {label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Logout Button */}
      <Link href="/" className="p-2 sm:p-3 md:p-4 w-full">
        <div className={clsx(
          "flex items-center p-1.5 sm:p-2 rounded-md gap-1.5 sm:gap-2 md:gap-[12px] justify-center cursor-pointer border-[0.5px] border-[#fff]/10 hover:bg-red-100 transition",
          collapsed ? "w-[80%] mx-auto" : "w-[90%] mx-auto"
        )}>
          <Image 
            src="/img/login.png" 
            alt="Logout" 
            width={iconSize} 
            height={iconSize} 
          />
          {!collapsed && (
            <span className="text-[#FFCDCD] font-medium leading-[100%] font-sora text-xs sm:text-sm md:text-[14px]">
              Log Out
            </span>
          )}
        </div>
      </Link>
    </aside>
  )
}

export default Sidebar