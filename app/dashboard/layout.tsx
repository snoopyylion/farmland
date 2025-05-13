'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  const sidebarWidth = collapsed ? '5rem' : '16rem' // Tailwind w-20 = 5rem, w-64 = 16rem

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="transition-all duration-300 p-4 bg-white min-h-screen w-full"
        style={{ marginLeft: sidebarWidth }}
      >
        {children}
      </main>
    </div>
  )
}
