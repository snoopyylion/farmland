'use client'

import Header from '@/components/Header';
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

// Define types for quests data
type QuestData = {
  id: string;
  type: 'daily' | 'weekly' | 'special';
  title: string;
  description: string;
  points: number;
  progress?: number;
  deadline?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
};

const DataQuestPage = () => {
  // State management
  const [selectedTab, setSelectedTab] = useState<'active' | 'completed'>('active');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Effect to detect system color scheme
  useEffect(() => {
    // Check if user prefers dark mode
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent): void => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Track window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup functions
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Quest data
  const quests: QuestData[] = [
    {
      id: '1',
      type: 'daily',
      title: 'Harvest Hero',
      description: 'Log your daily harvest report with details on crops harvested and their quantities.',
      points: 50,
      progress: 75,
      deadline: 'Today',
      difficulty: 'easy',
      completed: false
    },
    {
      id: '2',
      type: 'weekly',
      title: 'Storage Master',
      description: 'Optimize your storage facilities and reduce waste by implementing proper organization.',
      points: 100,
      progress: 50,
      deadline: '4 days left',
      difficulty: 'medium',
      completed: false
    },
    {
      id: '3',
      type: 'special',
      title: 'Market Connect',
      description: 'Connect with new buyers and expand your network by attending a local market event.',
      points: 150,
      progress: 25,
      deadline: '1 week left',
      difficulty: 'hard',
      completed: false
    },
    {
      id: '4',
      type: 'daily',
      title: 'Weather Watcher',
      description: 'Record today\'s weather conditions including temperature, humidity, and rainfall.',
      points: 30,
      difficulty: 'easy',
      completed: true
    },
    {
      id: '5',
      type: 'weekly',
      title: 'Crop Rotation',
      description: 'Plan your next crop rotation schedule based on soil health analysis.',
      points: 120,
      difficulty: 'medium',
      completed: true
    }
  ];

  const activeQuests = quests.filter(quest => !quest.completed);
  const completedQuests = quests.filter(quest => quest.completed);
  
  // Dynamic theme classes based on dark/light mode
  const themeClasses = {
    container: darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
    card: darkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-sm',
    lightBg: darkMode ? 'bg-gray-700' : 'bg-gray-50',
    header: darkMode ? 'text-white' : 'text-gray-900',
    subtext: darkMode ? 'text-gray-300' : 'text-gray-600',
    lightText: darkMode ? 'text-gray-400' : 'text-gray-500',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    buttonActive: 'bg-[#E8F5F0] text-[#2E6650] font-medium',
    buttonInactive: darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  };

  // Function to render difficulty badges
  const renderDifficultyBadge = (difficulty: 'easy' | 'medium' | 'hard') => {
    const badgeClass = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeClass[difficulty]}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };

  // Function to render quest type badges
  const renderQuestTypeBadge = (type: 'daily' | 'weekly' | 'special') => {
    const badgeClass = {
      daily: 'border-blue-300 text-blue-800',
      weekly: 'border-purple-300 text-purple-800',
      special: 'border-orange-300 text-orange-800'
    };

    // On smaller screens, make the badges more compact
    const displayText = windowWidth < 640 
      ? type.charAt(0).toUpperCase() + type.slice(1) 
      : (type === 'daily' ? 'DAILY QUEST' : type === 'weekly' ? 'WEEKLY CHALLENGE' : 'SPECIAL EVENT');

    return (
      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${badgeClass[type]}`}>
        {displayText}
      </span>
    );
  };

  return (
    <div className={`w-full font-sora ${themeClasses.container} min-h-screen`}>
      <div className="dashboard-container flex flex-col p-2 sm:p-4 max-w-full sm:max-w-7xl mx-auto">
        {/* ===== HEADER SECTION ===== */}
        <Header title="Data Quests" />

        {/* ===== QUEST STATS OVERVIEW ===== */}
        <div className={`stats-overview grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6`}>
          <div className={`stat-card ${themeClasses.card} rounded-lg p-2 sm:p-4 border ${themeClasses.border}`}>
            <div className="flex items-center">
              <div className="mr-2 sm:mr-3 bg-blue-100 p-1 sm:p-2 rounded-full">
                <Image src="/icons/data-cham.png" alt="Active Quests" width={16} height={16} className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className={`text-xs sm:text-sm ${themeClasses.subtext}`}>Active Quests</p>
                <p className="text-sm sm:text-base md:text-xl font-semibold">{activeQuests.length}</p>
              </div>
            </div>
          </div>
          
          <div className={`stat-card ${themeClasses.card} rounded-lg p-2 sm:p-4 border ${themeClasses.border}`}>
            <div className="flex items-center">
              <div className="mr-2 sm:mr-3 bg-green-100 p-1 sm:p-2 rounded-full">
                <Image src="/icons/Streak_On.png" alt="Current Streak" width={16} height={16} className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className={`text-xs sm:text-sm ${themeClasses.subtext}`}>Current Streak</p>
                <p className="text-sm sm:text-base md:text-xl font-semibold">3 days</p>
              </div>
            </div>
          </div>
          
          <div className={`stat-card ${themeClasses.card} rounded-lg p-2 sm:p-4 border ${themeClasses.border}`}>
            <div className="flex items-center">
              <div className="mr-2 sm:mr-3 bg-purple-100 p-1 sm:p-2 rounded-full">
                <Image src="/icons/Coin.png" alt="Points Earned" width={16} height={16} className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className={`text-xs sm:text-sm ${themeClasses.subtext}`}>Points This Week</p>
                <p className="text-sm sm:text-base md:text-xl font-semibold">450</p>
              </div>
            </div>
          </div>
          
          <div className={`stat-card ${themeClasses.card} rounded-lg p-2 sm:p-4 border ${themeClasses.border}`}>
            <div className="flex items-center">
              <div className="mr-2 sm:mr-3 bg-yellow-100 p-1 sm:p-2 rounded-full">
                <Image src="/icons/check.png" alt="Completed Quests" width={16} height={16} className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className={`text-xs sm:text-sm ${themeClasses.subtext}`}>Completed Quests</p>
                <p className="text-sm sm:text-base md:text-xl font-semibold">{completedQuests.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TABS NAVIGATION ===== */}
        <div className="tabs-container mb-4 sm:mb-6">
          <div className="option-button">
            <div className="options flex space-x-2 sm:space-x-4">
              <div
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer font-sora border ${selectedTab === 'active' ? themeClasses.buttonActive : themeClasses.buttonInactive}`}
                onClick={() => setSelectedTab('active')}
              >
                <p>Active Quests</p>
              </div>

              <div
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer font-sora border ${selectedTab === 'completed' ? themeClasses.buttonActive : themeClasses.buttonInactive}`}
                onClick={() => setSelectedTab('completed')}
              >
                <p>Completed Quests</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== QUESTS LIST ===== */}
        <div className="quests-container">
          {selectedTab === 'active' ? (
            <div className="active-quests">
              {activeQuests.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 sm:gap-4">
                  {activeQuests.map(quest => (
                    <div key={quest.id} className={`quest-card ${themeClasses.card} rounded-lg p-3 sm:p-4 border ${themeClasses.border}`}>
                      <div className="flex flex-col lg:flex-row justify-between">
                        <div className="quest-info flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {renderQuestTypeBadge(quest.type)}
                            <div className="ml-auto">
                              {renderDifficultyBadge(quest.difficulty)}
                            </div>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{quest.title}</h3>
                          <p className={`text-xs sm:text-sm ${themeClasses.subtext} mb-2 sm:mb-4`}>{quest.description}</p>
                          
                          {quest.progress !== undefined && (
                            <div className="mb-2 sm:mb-4">
                              <div className="flex justify-between text-xs sm:text-sm mb-1">
                                <span>Progress</span>
                                <span>{quest.progress}%</span>
                              </div>
                              <div className={`w-full h-1.5 sm:h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}>
                                <div 
                                  className="h-full bg-green-500 rounded-full" 
                                  style={{ width: `${quest.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Image src="/icons/Coin.png" alt="points" width={14} height={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                              <span className="text-xs sm:text-sm font-medium">{quest.points} pts</span>
                            </div>
                            {quest.deadline && (
                              <span className={`text-xs ${themeClasses.subtext}`}>
                                <i className="far fa-clock mr-1"></i> {quest.deadline}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="quest-actions mt-3 lg:mt-0 lg:ml-4 flex flex-row lg:flex-col justify-end gap-2">
                          <button className="bg-[#2E6650] hover:bg-[#1D5540] text-white font-medium text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg">
                            Start Quest
                          </button>
                          <button className={`${themeClasses.buttonInactive} font-medium text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg`}>
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`empty-state ${themeClasses.lightBg} p-4 sm:p-8 rounded-lg text-center`}>
                  <Image src="/icons/dataquest.png" alt="No active quests" width={48} height={48} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">No Active Quests</h3>
                  <p className={`text-xs sm:text-sm ${themeClasses.subtext} mb-3 sm:mb-4`}>You&apos;ve completed all available quests. Check back soon for new challenges!</p>
                  <button className="bg-[#2E6650] hover:bg-[#1D5540] text-white font-medium text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg">
                    Refresh Quests
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="completed-quests">
              {completedQuests.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 sm:gap-4">
                  {completedQuests.map(quest => (
                    <div key={quest.id} className={`quest-card ${themeClasses.card} rounded-lg p-3 sm:p-4 border ${themeClasses.border}`}>
                      <div className="flex flex-col lg:flex-row justify-between">
                        <div className="quest-info flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {renderQuestTypeBadge(quest.type)}
                            <div className="ml-auto">
                              {renderDifficultyBadge(quest.difficulty)}
                            </div>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{quest.title}</h3>
                          <p className={`text-xs sm:text-sm ${themeClasses.subtext} mb-2 sm:mb-4`}>{quest.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Image src="/icons/Coin.png" alt="points" width={14} height={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                              <span className="text-xs sm:text-sm font-medium">{quest.points} pts</span>
                            </div>
                            <span className="text-xs sm:text-sm text-green-500 font-medium flex items-center">
                              <Image src="/icons/check.png" alt="completed" width={14} height={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                              Completed
                            </span>
                          </div>
                        </div>
                        
                        <div className="quest-actions mt-3 lg:mt-0 lg:ml-4 flex justify-end">
                          <button className={`${themeClasses.buttonInactive} font-medium text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg`}>
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`empty-state ${themeClasses.lightBg} p-4 sm:p-8 rounded-lg text-center`}>
                  <Image src="/icons/dataquest.png" alt="No completed quests" width={48} height={48} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">No Completed Quests</h3>
                  <p className={`text-xs sm:text-sm ${themeClasses.subtext} mb-3 sm:mb-4`}>Complete quests to see them here. Start with some easy daily tasks!</p>
                  <button className="bg-[#2E6650] hover:bg-[#1D5540] text-white font-medium text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg">
                    View Active Quests
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DataQuestPage