'use client'

import Image from 'next/image'
import React, { useState } from 'react'

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
        <div className="header flex justify-between items-center mb-6 px-4 py-2">
          <div className="header-text w-full flex items-center">
            <h1 className="font-sora text-[20px] leading-[100%] font-semibold">Leaderboard</h1>
          </div>

          <div className="ranking flex items-center gap-[24px] space-x-4">
            {/* Streak and points display */}
            <div className="thundercoin flex items-center space-x-4">
              <div className="thunder3 flex items-center space-x-2">
                <div className="img">
                  <Image src="/icons/Streak_On.png" alt="streak" width={24} height={24} />
                </div>
                <div className="number font-semibold leading-[100%] text-[20px] font-sora">
                  {currentUser?.streak}
                </div>
              </div>

              <div className="coin-num flex items-center space-x-2">
                <div className="img">
                  <Image src="/icons/Coin.png" alt="coin" width={24} height={24} />
                </div>
                <div className="number font-semibold leading-[100%] text-[20px] font-sora">
                  {currentUser?.points !== undefined
                    ? `${(currentUser.points / 1000).toFixed(1)}k`
                    : '0k'}
                </div>
              </div>
            </div>

            {/* Notification and user profile */}
            <div className="alertuser flex items-center space-x-4">
              <div className="alert flex items-center space-x-2 relative">
                <div className="img">
                  <Image src="/icons/notification.png" alt="notification" width={24} height={24} />
                </div>
                <div className="number absolute -top-[2px] -left-[-9px] bg-[#920E0E] text-white text-[8px] font-medium leading-[120%] rounded-full w-4 h-4 flex items-center justify-center font-sora">
                  3
                </div>
              </div>

              <div className="user">
                <Image src="/icons/user.png" alt="user" width={32} height={32} className="rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ===== TIMEFRAME FILTER ===== */}
        <div className="filter-section mb-6">
          <div className="tabs-container">
            <div className="options flex space-x-4 mb-4">
              <button
                className={`px-[10px] py-[8px] gap-[8px] rounded-full cursor-pointer font-sora border ${timeframe === 'weekly' ? themeClasses.buttonActive : themeClasses.buttonInactive}`}
                onClick={() => setTimeframe('weekly')}
              >
                This Week
              </button>
              <button
                className={`px-[10px] py-[8px] gap-[8px] rounded-full cursor-pointer font-sora border ${timeframe === 'monthly' ? themeClasses.buttonActive : themeClasses.buttonInactive}`}
                onClick={() => setTimeframe('monthly')}
              >
                This Month
              </button>
              <button
                className={`px-[10px] py-[8px] gap-[8px] rounded-full cursor-pointer font-sora border ${timeframe === 'all-time' ? themeClasses.buttonActive : themeClasses.buttonInactive}`}
                onClick={() => setTimeframe('all-time')}
              >
                All Time
              </button>
            </div>

            <div className="options flex space-x-4">
              <button
                className={`px-[10px] py-[8px] gap-[8px] rounded-full cursor-pointer font-sora border ${category === 'global' ? themeClasses.buttonActive : themeClasses.buttonInactive}`}
                onClick={() => setCategory('global')}
              >
                Global
              </button>
              <button
                className={`px-[10px] py-[8px] gap-[8px] rounded-full cursor-pointer font-sora border ${category === 'regional' ? themeClasses.buttonActive : themeClasses.buttonInactive}`}
                onClick={() => setCategory('regional')}
              >
                Regional
              </button>
              <button
                className={`px-[10px] py-[8px] gap-[8px] rounded-full cursor-pointer font-sora border ${category === 'friends' ? themeClasses.buttonActive : themeClasses.buttonInactive}`}
                onClick={() => setCategory('friends')}
              >
                Friends
              </button>
            </div>
          </div>
        </div>

        {/* ===== TOP 3 FARMERS ===== */}
        <div className="top-farmers mb-8">
          <h2 className={`text-xl font-semibold mb-4 ${themeClasses.header}`}>Top Farmers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboardData.slice(0, 3).map((farmer, index) => (
              <div
                key={farmer.id}
                className={`${themeClasses.card} p-4 rounded-lg border ${themeClasses.border} flex flex-col items-center`}
              >
                <div className={`rank-badge w-8 h-8 rounded-full flex items-center justify-center mb-2 
                  ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                      'bg-amber-900 bg-opacity-20 text-amber-800'}`}
                >
                  {index + 1}
                </div>
                <div className="avatar mb-2 relative">
                  <Image
                    src={farmer.avatar || "/icons/user.png"}
                    alt={farmer.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div className="streak-badge absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-1">
                      <Image src="/icons/Streak_On.png" alt="streak" width={14} height={14} />
                      <span className="text-xs font-medium">{farmer.streak}</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-md mb-1">{farmer.name}</h3>
                <p className={`text-sm ${themeClasses.subtext} mb-2`}>{farmer.farm_type}</p>
                <div className="stats flex items-center justify-center space-x-4">
                  <div className="points flex items-center">
                    <Image src="/icons/Coin.png" alt="points" width={16} height={16} className="mr-1" />
                    <span className="text-sm font-medium">{farmer.points}</span>
                  </div>
                  <div className="quests flex items-center">
                    <Image src="/icons/check.png" alt="completed quests" width={16} height={16} className="mr-1" />
                    <span className="text-sm">{farmer.completedQuests}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== FULL LEADERBOARD ===== */}
        <div className={`leaderboard-table ${themeClasses.card} rounded-lg border ${themeClasses.border} overflow-hidden`}>
          <div className={`table-header p-4 border-b ${themeClasses.cardHeader} flex justify-between items-center`}>
            <h2 className="text-lg font-semibold">Leaderboard Rankings</h2>
            <div className="search-input relative">
              <input
                type="text"
                placeholder="Search farmers..."
                className={`pl-8 pr-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-200'} border`}
              />
              <div className="absolute left-2 top-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className={`${themeClasses.tableHeader}`}>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Farmer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Region</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Farm Type</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Streak</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Quests</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Points</th>
                </tr>
              </thead>
              <tbody className={`${themeClasses.tableBg}`}>
                {leaderboardData.slice(0, 8).map((entry) => (
                  <tr
                    key={entry.id}
                    className={`border-b ${themeClasses.tableRow} ${entry.id === 'current' ? themeClasses.userHighlight : ''}`}
                  >
                    <td className="px-4 py-3 text-left">
                      <div className="text-sm font-medium">{entry.rank}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 relative">
                          <Image
                            src={entry.avatar || "/icons/usericon.png"}
                            alt={entry.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <div className="ml-3">
                          <div className={`text-sm font-medium ${entry.id === 'current' ? 'font-semibold text-[#2E6650]' : ''}`}>
                            {entry.name}
                            {entry.id === 'current' && " (You)"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{entry.region}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{entry.farm_type}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-sm flex items-center justify-end">
                        <Image src="/icons/Streak_On.png" alt="streak" width={14} height={14} className="mr-1" />
                        {entry.streak}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-sm">{entry.completedQuests}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-sm font-medium flex items-center justify-end">
                        <Image src="/icons/Coin.png" alt="points" width={14} height={14} className="mr-1" />
                        {entry.points}
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Show ellipsis if current user is not in top 8 */}
                {currentUser && currentUser.rank > 8 && (
                  <tr className={`border-b ${themeClasses.tableRow}`}>
                    <td colSpan={7} className="px-4 py-3 text-center">
                      <div className="text-sm">. . .</div>
                    </td>
                  </tr>
                )}

                {/* Always show current user row if not in top 8 */}
                {currentUser && currentUser.rank > 8 && (
                  <tr className={`border-b ${themeClasses.tableRow} ${themeClasses.userHighlight}`}>
                    <td className="px-4 py-3 text-left">
                      <div className="text-sm font-medium">{currentUser.rank}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <Image
                            src={currentUser.avatar || "/icons/user.png"}
                            alt={currentUser.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-[#2E6650]">{currentUser.name} (You)</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{currentUser.region}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{currentUser.farm_type}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-sm flex items-center justify-end">
                        <Image src="/icons/Streak_On.png" alt="streak" width={14} height={14} className="mr-1" />
                        {currentUser.streak}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-sm">{currentUser.completedQuests}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-sm font-medium flex items-center justify-end">
                        <Image src="/icons/Coin.png" alt="points" width={14} height={14} className="mr-1" />
                        {currentUser.points}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== REWARDS SECTION ===== */}
        <div className="rewards-section mt-8 mb-6">
          <h2 className={`text-xl font-semibold mb-4 ${themeClasses.header}`}>Leaderboard Rewards</h2>
          <div className={`${themeClasses.card} p-4 rounded-lg border ${themeClasses.border}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`reward-card p-4 rounded-lg border ${themeClasses.border} bg-yellow-50 dark:bg-gray-700`}>
                <div className="flex items-center mb-3">
                  <div className="mr-3 bg-yellow-100 p-2 rounded-full">
                    <Image src="/icons/Coin.png" alt="First Place" width={24} height={24} />
                  </div>
                  <h3 className="font-semibold">1st Place</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    500 bonus points
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Exclusive &quot;Champion Farmer&quot; badge
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Feature on community spotlight
                  </li>
                </ul>
              </div>

              <div className={`reward-card p-4 rounded-lg border ${themeClasses.border} bg-gray-50 dark:bg-gray-700`}>
                <div className="flex items-center mb-3">
                  <div className="mr-3 bg-gray-200 p-2 rounded-full">
                    <Image src="/icons/Coin.png" alt="Second Place" width={24} height={24} />
                  </div>
                  <h3 className="font-semibold">2nd Place</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    300 bonus points
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    &quot;Silver Producer&quot; badge
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Early access to new features
                  </li>
                </ul>
              </div>

              <div className={`reward-card p-4 rounded-lg border ${themeClasses.border} bg-amber-50 dark:bg-gray-700`}>
                <div className="flex items-center mb-3">
                  <div className="mr-3 bg-amber-100 p-2 rounded-full">
                    <Image src="/icons/Coin.png" alt="Third Place" width={24} height={24} />
                  </div>
                  <h3 className="font-semibold">3rd Place</h3>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    150 bonus points
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    &quot;Bronze Cultivator&quot; badge
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Exclusive digital resources
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className={`text-sm ${themeClasses.subtext} mb-4`}>Top 10 farmers each week receive special achievement badges and bonus points!</p>
              <button className="bg-[#2E6650] hover:bg-[#1D5540] text-white font-medium py-2 px-6 rounded-lg">
                View All Rewards
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage