'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import clsx from 'clsx'

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

const navLinks = [
  { label: 'Dashboard', icon: '/img/dashboard.png', path: '/dashboard' },
  { label: 'Data Quest', icon: '/img/dataquest.png', path: '/dashboard/data-quest' },
  { label: 'Leaderboard', icon: '/img/Shape.png', path: '/dashboard/leaderboard' },
  { label: 'Loss Prediction', icon: '/img/Info.png', path: '/dashboard/loss-pred' },
  { label: 'Learn', icon: '/img/teacher.png', path: '/dashboard/learn' },
]

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const pathname = usePathname()
  
  const toggleSidebar = () => setCollapsed(!collapsed)
  
  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 h-dvh bg-[#132A21] text-pink-100 shadow-lg items-center flex flex-col justify-between transition-all duration-300 z-50',
        collapsed ? 'w-20' : 'w-[282px]'
      )}
    >
      {/* Logo + Toggle */}
      <div>
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <div className="relative w-[236px] h-[36px]">
              <Image fill src="/img/logo-white.png" alt="logo" className="object-contain" />
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-pink-100 hover:text-gray-800 focus:outline-none"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="mt-4">
          <ul className="space-y-2 px-2">
            {navLinks.map(({ label, icon, path }) => (
              <li key={label}>
                <Link
                  href={path}
                  className={clsx(
                    'flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 transition',
                    pathname === path &&
                      'bg-white/10 border-[0.5px] border-white/20 text-pink-100 font-semibold'
                  )}
                >
                  <Image src={icon} alt={label} width={20} height={20} />
                  {!collapsed && <span className="ml-3">{label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Logout Button */}
      <Link href="/" className="p-4">
        <div className={clsx(
          "flex items-center p-[8px] rounded-md gap-[12px] justify-center cursor-pointer border-[0.5px] border-[#fff]/10 hover:bg-red-100 transition",
          collapsed ? "w-full" : "w-[234px]"
        )}>
          <Image src="/img/login.png" alt="Logout" width={20} height={20} />
          {!collapsed && <span className="text-[#FFCDCD] font-medium leading-[100%] font-sora text-[14px]">Log Out</span>}
        </div>
      </Link>
    </aside>
  )
}

export default Sidebar