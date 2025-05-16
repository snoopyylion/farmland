'use client'

import Header from '@/components/Header';
import Image from 'next/image'
import React, { useState } from 'react'
import TopFarmers from '@/components/TopFarmerCard';
import Leaderboard from '@/components/Leaderboard';
import LeaderboardRewards from '@/components/LeaderboardRewards';
import FilterSection from '@/components/FilterSection';

// Define types for leaderboard data
type LeaderboardEntry = {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  completedQuests: number;
  region: string;
  farm_type: string;
};

type LeaderboardTimeframe = 'weekly' | 'monthly' | 'all-time';
type LeaderboardCategory = 'global' | 'regional' | 'friends';

const LeaderboardPage = () => {
  // State management
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>('weekly');
  const [category, setCategory] = useState<LeaderboardCategory>('global');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Effect to detect system color scheme
  React.useEffect(() => {
    // Check if user prefers dark mode
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent): void => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup function
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Sample leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      name: 'Emma Johnson',
      avatar: '/icons/usericon.png',
      points: 3750,
      streak: 14,
      completedQuests: 42,
      region: 'Midwest',
      farm_type: 'Organic Crops'
    },
    {
      id: '2',
      rank: 2,
      name: 'Marcus Chen',
      avatar: '/icons/usericon.png',
      points: 3240,
      streak: 12,
      completedQuests: 38,
      region: 'West Coast',
      farm_type: 'Dairy'
    },
    {
      id: '3',
      rank: 3,
      name: 'Sarah Williams',
      avatar: '/icons/usericon.png',
      points: 3150,
      streak: 10,
      completedQuests: 36,
      region: 'Northeast',
      farm_type: 'Mixed Farming'
    },
    {
      id: '4',
      rank: 4,
      name: 'James Taylor',
      avatar: '/icons/usericon.png',
      points: 2980,
      streak: 8,
      completedQuests: 33,
      region: 'Southeast',
      farm_type: 'Livestock'
    },
    {
      id: '5',
      rank: 5,
      name: 'Olivia Garcia',
      avatar: '/icons/usericon.png',
      points: 2850,
      streak: 9,
      completedQuests: 32,
      region: 'Southwest',
      farm_type: 'Urban Farming'
    },
    {
      id: '6',
      rank: 6,
      name: 'Michael Brown',
      avatar: '/icons/usericon.png',
      points: 2720,
      streak: 7,
      completedQuests: 30,
      region: 'Midwest',
      farm_type: 'Vineyard'
    },
    {
      id: '7',
      rank: 7,
      name: 'Sofia Rodriguez',
      avatar: '/icons/usericon.png',
      points: 2610,
      streak: 6,
      completedQuests: 29,
      region: 'West Coast',
      farm_type: 'Organic Crops'
    },
    {
      id: '8',
      rank: 8,
      name: 'Alex Kim',
      avatar: '/icons/usericon.png',
      points: 2480,
      streak: 5,
      completedQuests: 27,
      region: 'Northeast',
      farm_type: 'Specialty Crops'
    },
    {
      id: 'current',
      rank: 24,
      name: 'You',
      avatar: '/icons/user.png',
      points: 2100,
      streak: 3,
      completedQuests: 21,
      region: 'Midwest',
      farm_type: 'Mixed Farming'
    }
  ];

  // Get the current user's entry
  const currentUser = leaderboardData.find(entry => entry.id === 'current');

  // Dynamic theme classes based on dark/light mode
  const themeClasses = {
    container: darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
    card: darkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-sm',
    cardHeader: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    lightBg: darkMode ? 'bg-gray-800' : 'bg-gray-50',
    tableBg: darkMode ? 'bg-gray-800' : 'bg-white',
    tableHeader: darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700',
    tableRow: darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50',
    header: darkMode ? 'text-white' : 'text-gray-900',
    subtext: darkMode ? 'text-gray-300' : 'text-gray-600',
    lightText: darkMode ? 'text-gray-400' : 'text-gray-500',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    buttonActive: 'bg-[#E8F5F0] text-[#2E6650] font-medium',
    buttonInactive: darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    highlight: darkMode ? 'bg-gray-700' : 'bg-[#E8F5F0]',
    userHighlight: 'bg-[#E8F5F0] border-l-4 border-[#2E6650]'
  };

  return (
    <div className={`w-full font-sora min-h-screen ${themeClasses.container}`}>
      <div className="dashboard-container flex flex-col p-4 max-w-7xl mx-auto">
        {/* ===== HEADER SECTION ===== */}
        <Header title='Leaderboard' />

        {/* ===== TIMEFRAME FILTER ===== */}
        <FilterSection timeframe={timeframe} setTimeframe={setTimeframe} category={category} setCategory={setCategory} themeClasses={themeClasses} />

        {/* ===== TOP 3 FARMERS ===== */}
        <TopFarmers leaderboardData={leaderboardData} themeClasses={themeClasses} />

        {/* ===== FULL LEADERBOARD ===== */}
        <Leaderboard
          leaderboardData={leaderboardData}
          currentUser={currentUser}
          themeClasses={themeClasses}
          darkMode={darkMode}
        />

        {/* ===== REWARDS SECTION ===== */}
        <LeaderboardRewards themeClasses={themeClasses} />
      </div>
    </div>
  )
}

export default LeaderboardPage