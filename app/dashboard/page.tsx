'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Slider from '@/components/Slider';
import Header from '@/components/Header'

// Define types for our slide data
type SlideData = {
  tag: string;
  title: string;
  text: string;
  points: string;
  image: string;
};

// Define valid options for option changes
type OptionType = 'loss-prediction' | 'harvest-analytic';

const DashboardPage = () => {
  // State management
  const [activeOption, setActiveOption] = useState<OptionType>('loss-prediction');
  const [, setCurrentSlide] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [autoSlideInterval, setAutoSlideInterval] = useState<NodeJS.Timeout | null>(null);
  const [isPaused,] = useState<boolean>(false);

  // Effect to detect system color scheme
  useEffect(() => {
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

  // Quest/challenge slides data
  const slides: SlideData[] = [
    {
      tag: "DAILY QUEST",
      title: "Harvest Hero",
      text: "Log your daily harvest report and points",
      points: "50 pts",
      image: "/img/hero.png"
    },
    {
      tag: "WEEKLY CHALLENGE",
      title: "Storage Master",
      text: "Optimize your storage facilities and reduce waste",
      points: "100 pts",
      image: "/img/storage.png"
    },
    {
      tag: "SPECIAL EVENT",
      title: "Market Connect",
      text: "Connect with new buyers and expand your network",
      points: "150 pts",
      image: "/img/market-access.jpeg"
    }
  ];


  // Initialize auto-sliding
  useEffect(() => {
    // Setup the auto-sliding interval
    const startAutoSlide = () => {
      if (autoSlideInterval) clearInterval(autoSlideInterval);

      const interval = setInterval(() => {
        if (!isPaused) {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }
      }, 5000); // Change slide every 5 seconds

      setAutoSlideInterval(interval);
    };

    startAutoSlide();

    // Cleanup function
    return () => {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    };
  }, [isPaused, slides.length]); // Restart interval when pause state changes or slides change

  // Update handleSlideChange for dots navigation

  const handleOptionChange = (option: OptionType): void => {
    setActiveOption(option);
  };

  // Dynamic theme classes based on dark/light mode
  const themeClasses = {
    container: darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
    card: darkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-sm',
    lightBg: darkMode ? 'bg-gray-700' : 'bg-gray-50',
    header: darkMode ? 'text-white' : 'text-gray-900',
    subtext: darkMode ? 'text-gray-300' : 'text-gray-600',
    lightText: darkMode ? 'text-gray-400' : 'text-gray-500',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    buttonSecondary: darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    chartBar: darkMode ? 'bg-green-500' : 'bg-green-400',
  };

  return (
    <div className={`w-full min-h-screen font-sora ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="dashboard-container flex flex-col p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        {/* ===== HEADER SECTION ===== */}
        <Header title="Dashboard" />

        {/* ===== DASHBOARD CONTENT ===== */}
        <div className="dashboard-content flex flex-col lg:flex-row space-y-4 sm:space-y-6 lg:space-y-0 lg:space-x-6">
          {/* ===== LEFT COLUMN ===== */}
          <div className="dashboard-left flex-1 flex flex-col space-y-4 sm:space-y-6">
            {/* Welcome Card */}
            <div className={`welcome ${themeClasses.lightBg} p-3 sm:p-4 rounded-lg`}>
              <div className="name">
                <h2 className="text-xl sm:text-2xl leading-tight font-bold font-sora">Welcome, Adebayo Farm</h2>
              </div>
              <div className="text">
                <p className={`${themeClasses.subtext} text-xs sm:text-sm leading-snug font-light font-sora`}>Complete your daily quest to reach the next level</p>
              </div>
            </div>

            {/* ===== SLIDER SECTION ===== */}
            <div className="w-full">
              <Slider slides={slides} />
            </div>

            {/* ===== ANALYTICS SECTION ===== */}
            <div className={`left-bottom ${themeClasses.card} px-3 py-4 sm:px-4 sm:py-6 flex flex-col border border-[#F2F2F2] gap-4 sm:gap-6 rounded-lg`}>
              {/* Analytics Option Tabs */}
              <div className="option-button mb-2 sm:mb-4">
                <div className="options flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4">
                  <div
                    className={`loss-prediction whitespace-nowrap text-xs sm:text-sm bg-white border border-[#F2F2F2] cursor-pointer px-2 sm:px-3 py-1.5 sm:py-2 gap-2 rounded-full font-sora ${activeOption === 'loss-prediction'
                      ? 'bg-[#E8F5F0] text-[#2E6650] font-medium'
                      : themeClasses.buttonSecondary
                      }`}
                    onClick={() => handleOptionChange('loss-prediction')}
                  >
                    <p>Loss Prediction</p>
                  </div>

                  <div
                    className={`harvest whitespace-nowrap text-xs sm:text-sm cursor-pointer bg-white border border-[#F2F2F2] px-2 sm:px-3 py-1.5 sm:py-2 gap-2 rounded-full font-sora ${activeOption === 'harvest-analytic'
                      ? 'bg-[#E8F5F0] text-[#2E6650] font-medium'
                      : themeClasses.buttonSecondary
                      }`}
                    onClick={() => handleOptionChange('harvest-analytic')}
                  >
                    <p>Harvest Analytic</p>
                  </div>
                </div>
              </div>

              {/* Option Display Content */}
              <div className="option-dis">
                {/* Loss Prediction View */}
                {activeOption === 'loss-prediction' && (
                  <div className={`loss-pred ${darkMode ? 'bg-red-900' : 'bg-red-50'} border-l-[4px] border-red-600 p-3 sm:p-4 rounded-lg`}>
                    <div className="flex items-start">
                      <div className="temperature-icon mr-3 sm:mr-4 flex-shrink-0">
                        <Image src="/icons/high-temp.png" alt="temperature" width={32} height={32} className="w-8 h-8 sm:w-9 sm:h-9" />
                      </div>

                      <div className="text-area flex-1 min-w-0">
                        <div className={`text-1 flex justify-between font-sora`}>
                          <div className='font-semibold text-sm sm:text-base leading-tight font-sora text-[#564C4C]' ><p>Tomato</p></div>
                          <div className='font-thin text-xs leading-tight font-sora text-[#000000]'><p>Updated 2hrs ago</p></div>
                        </div>

                        <div className={`text-2 text-xs sm:text-sm font-light leading-tight ${darkMode ? 'text-red-200' : 'text-[#828282]'} font-sora`}>
                          <p>Risk Level: High (25% Loss Prediction)</p>
                        </div>

                        <div className={`text-2 text-xs sm:text-sm font-light leading-tight ${darkMode ? 'text-red-200' : 'text-[#828282]'} font-sora`}>
                          <p>Main Factor: Temperature</p>
                        </div>

                        <div className={`text-area-2 bg-[#fff] mt-2 sm:mt-3 ${themeClasses.card} px-2 py-2 sm:px-3 sm:py-3 gap-2 sm:gap-3 border border-[#FDE5E5] rounded-md`}>
                          <div className="top text-[10px] sm:text-xs leading-tight text-[#828282] font-extralight font-sora">
                            <p>Recommendation</p>
                          </div>

                          <div className={`bottom text-xs sm:text-sm ${themeClasses.subtext} font-sora`}>
                            <p>Transport during cooler hours</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Harvest Analytics View */}
                {activeOption === 'harvest-analytic' && (
                  <div className={`harvest-analytic ${darkMode ? 'bg-green-900' : 'bg-green-50'} p-3 sm:p-4 rounded-lg`}>
                    {/* Chart Container */}
                    <div className="chart-container h-32 sm:h-40">
                      <div className="flex h-full justify-between">
                        {[0.3, 0.7, 0.9, 0.5, 0.6, 0.8, 0.4].map((height, index) => (
                          <div key={index} className="flex flex-col items-center justify-end h-full w-full">
                            <div
                              className={`${themeClasses.chartBar} w-2 sm:w-4 rounded-t-md`}
                              style={{ height: `${height * 100}%` }}
                            />
                            <div className={`text-[10px] sm:text-xs ${themeClasses.lightText} mt-1 font-sora`}>
                              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chart Legend */}
                    <div className="mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className={`text-xs sm:text-sm ${themeClasses.subtext} font-sora`}>Weekly harvest report</div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mr-1"></div>
                          <span className="text-[10px] sm:text-xs font-sora">Yams</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full mr-1"></div>
                          <span className="text-[10px] sm:text-xs font-sora">Cassava</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="dashboard-right w-full lg:w-72 xl:w-80 flex flex-col space-y-4 sm:space-y-6">
            {/* ===== LEVEL PROGRESS SECTION ===== */}
            <div className={`level-div ${themeClasses.card} p-3 sm:p-4 rounded-lg flex flex-col`}>
              <div className="level mb-2">
                <p className={`text-[10px] sm:text-xs leading-tight font-light ${themeClasses.lightText} font-sora`}>MY LEVEL</p>
              </div>

              {/* Progress Bar */}
              <div className={`level-slider relative h-3 sm:h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full mb-3 sm:mb-4`}>
                <div className="absolute top-0 left-0 h-full w-1/2 bg-[#E8B800] rounded-full"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white border-2 border-yellow-400 rounded-full"></div>
              </div>

              {/* Level Indicators */}
              <div className="level-bottom flex justify-between items-center">
                <div className="harvest-hero text-center">
                  <div className="number font-light mb-1 text-[10px] sm:text-xs leading-tight font-sora">
                    <p>1,500</p>
                  </div>
                  <div className={`text-[8px] sm:text-[10px] leading-tight font-thin ${themeClasses.subtext} font-sora`}>
                    <p>Harvest Hero</p>
                  </div>
                </div>

                <div className="harvest-lord text-center">
                  <div className="number font-light mb-1 text-[10px] sm:text-xs leading-tight font-sora">
                    <p>3000</p>
                  </div>
                  <div className={`text-[8px] sm:text-[10px] leading-tight font-thin ${themeClasses.subtext} font-sora`}>
                    <p>Harvest Lord</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== ACHIEVEMENTS SECTION ===== */}
            <div className={`achievement-div ${themeClasses.card} p-3 sm:p-4 rounded-lg`}>
              <div className="achievement-header mb-2 sm:mb-3">
                <p className={`text-[10px] sm:text-xs leading-tight font-light ${themeClasses.lightText} font-sora`}>ACHIEVEMENT</p>
              </div>

              {/* Achievement Items */}
              <div className="achievement-content flex flex-col space-y-2 sm:space-y-3">
                {/* Achievement 1 */}
                <div className="first-achievement flex items-center">
                  <div className="img mr-2 sm:mr-3 flex-shrink-0">
                    <Image src="/icons/harvest-hero.png" alt="achievement" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div className="text min-w-0">
                    <div><p className="font-semibold mb-1 text-xs sm:text-sm leading-tight text-[#828282] font-sora">Harvest Hero</p></div>
                    <div><p className={`font-light text-[10px] sm:text-xs leading-tight text-[#828282] ${themeClasses.subtext} font-sora`}>Logged 10 Harvest</p></div>
                  </div>
                </div>

                {/* Achievement 2 */}
                <div className="second-achievement flex items-center">
                  <div className="img mr-2 sm:mr-3 flex-shrink-0">
                    <Image src="/icons/data-cham.png" alt="achievement" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div className="text min-w-0">
                    <div><p className="font-semibold mb-1 text-xs sm:text-sm leading-tight text-[#828282] font-sora">Data Champion</p></div>
                    <div><p className={`font-light text-[10px] sm:text-xs leading-tight text-[#828282] ${themeClasses.subtext} font-sora`}>Consistent for 7 days</p></div>
                  </div>
                </div>

                {/* Achievement 3 */}
                <div className="third-achievement flex items-center">
                  <div className="img mr-2 sm:mr-3 flex-shrink-0">
                    <Image src="/icons/heart-storage.png" alt="achievement" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div className="text min-w-0">
                    <div><p className="font-semibold mb-1 text-xs sm:text-sm leading-tight text-[#828282] font-sora">Heart of State Storage</p></div>
                    <div><p className={`font-light text-[10px] sm:text-xs leading-tight text-[#828282] ${themeClasses.subtext} font-sora`}>Best storage facilities</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== ACTIVITY SECTION ===== */}
            <div className={`activity-div ${themeClasses.card} p-3 sm:p-4 rounded-lg`}>
              <div className="activity-header mb-2 sm:mb-3">
                <p className={`text-[10px] sm:text-xs leading-tight font-light ${themeClasses.lightText} font-sora`}>MY ACTIVITY</p>
              </div>

              {/* Activity Grid */}
              <div className="activity-content grid grid-cols-2 gap-2 sm:gap-3">
                {/* Total Points */}
                <div className={`activity ${themeClasses.lightBg} p-2 sm:p-3 rounded-lg`}>
                  <div><p className={`text-[10px] sm:text-xs font-extralight leading-tight text-[#333] ${themeClasses.subtext} font-sora`}>Total Points</p></div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div><Image src="/icons/Coin.png" alt="points" width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                    <div><p className="font-normal text-xs sm:text-sm leading-tight font-sora">2100</p></div>
                  </div>
                </div>

                {/* Quests Joined */}
                <div className={`activity ${themeClasses.lightBg} p-2 sm:p-3 rounded-lg`}>
                  <div><p className={`text-[10px] sm:text-xs font-extralight leading-tight text-[#333] ${themeClasses.subtext} font-sora`}>Quest joined</p></div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div><Image src="/icons/magic-star.png" alt="quests" width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                    <div><p className="font-normal text-xs sm:text-sm leading-tight font-sora">3</p></div>
                  </div>
                </div>

                {/* League */}
                <div className={`activity ${themeClasses.lightBg} p-2 sm:p-3 rounded-lg`}>
                  <div><p className={`text-[10px] sm:text-xs font-extralight leading-tight text-[#333] ${themeClasses.subtext} font-sora`}>League</p></div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div><Image src="/icons/Leaderboard.png" alt="league" width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                    <div><p className="font-normal text-xs sm:text-sm leading-tight font-sora truncate">Harvester&apos;s L</p></div>
                  </div>
                </div>

                {/* Current Streak */}
                <div className={`activity ${themeClasses.lightBg} p-2 sm:p-3 rounded-lg`}>
                  <div><p className={`text-[10px] sm:text-xs font-extralight leading-tight ${themeClasses.subtext} font-sora`}>Current streak</p></div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div><Image src="/icons/Streak_On.png" alt="streak" width={16} height={16} className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                    <div><p className="font-normal text-xs sm:text-sm leading-tight font-sora">3</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage