'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`transition-all duration-300 flex-1 bg-white ${
          collapsed ? 'ml-20' : 'ml-[282px]'
        }`}
      >
        {children}
      </main>
    </div>
  )
}