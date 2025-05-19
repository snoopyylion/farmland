'use client'

import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mainMargin, setMainMargin] = useState(collapsed ? '5rem' : '282px')
  
  // Update margin based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      
      if (width < 640) { // sm
        setMainMargin(collapsed ? '3rem' : '220px')
      } else if (width < 768) { // md
        setMainMargin(collapsed ? '3.5rem' : '250px')
      } else if (width < 1024) { // lg
        setMainMargin(collapsed ? '4rem' : '282px')
      } else { // xl and above
        setMainMargin(collapsed ? '5rem' : '282px')
      }
    }
    
    // Set initial margin
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [collapsed])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="transition-all duration-300 flex-1 bg-white"
        style={{ marginLeft: mainMargin }}
      >
        {children}
      </main>
    </div>
  )
}