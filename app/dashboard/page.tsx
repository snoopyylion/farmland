'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Slider from '@/components/Slider';

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
  const [isPaused, setIsPaused] = useState<boolean>(false);

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
      image: "/img/hero.png"
    },
    {
      tag: "SPECIAL EVENT",
      title: "Market Connect",
      text: "Connect with new buyers and expand your network",
      points: "150 pts",
      image: "/img/hero.png"
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

  // Handle slider interactions
  const handleSliderInteraction = () => {
    setIsPaused(true);

    // Use a cleanup timeout to resume auto-sliding
    const timeoutId = setTimeout(() => {
      setIsPaused(false);
    }, 8000);

    return () => clearTimeout(timeoutId);
  };

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
    <div className={`w-full font-sora ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="dashboard-container flex flex-col p-4 max-w-7xl mx-auto">
        {/* ===== HEADER SECTION ===== */}
        <div className="header flex justify-between items-center mb-6 px-4 py-2">
          <div className="header-text w-[113px] h-[25px] font-sora text-[20px] leading-[100%] font-semibold">
            Dashboard
          </div>

          <div className="ranking flex items-center gap-[24px] space-x-4">
            {/* Streak and points display */}
            <div className="thundercoin flex items-center space-x-4">
              <div className="thunder3 flex items-center space-x-2">
                <div className="img">
                  <Image src="/icons/Streak_On.png" alt="streak" width={24} height={24} />
                </div>
                <div className="number font-semibold leading-[100%] text-[20px] font-sora">
                  3
                </div>
              </div>

              <div className="coin-num flex items-center space-x-2">
                <div className="img">
                  <Image src="/icons/Coin.png" alt="coin" width={24} height={24} />
                </div>
                <div className="number font-semibold leading-[100%] text-[20px] font-sora">
                  2.1k
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

        {/* ===== DASHBOARD CONTENT ===== */}
        <div className="dashboard-content flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* ===== LEFT COLUMN ===== */}
          <div className="dashboard-left flex-1 flex flex-col space-y-6">
            {/* Welcome Card */}
            <div className={`welcome ${themeClasses.lightBg} p-4 rounded-lg`}>
              <div className="name">
                <h2 className="w-[342px] h-[36px] text-[24px] leading-[150%] font-bold font-sora">Welcome, Adebayo Farm</h2>
              </div>
              <div className="text">
                <p className={`${themeClasses.subtext} w-[342px] h-[21px] text-[14px] leading-[150%] font-light font-sora`}>Complete your daily quest to reach the next level</p>
              </div>
            </div>

            {/* ===== SLIDER SECTION ===== */}
            <div>
              <Slider slides={slides} />
            </div>


            {/* ===== ANALYTICS SECTION ===== */}
            <div className={`left-bottom ${themeClasses.card} px-4 py-6 flex flex-col border-[1px] border-[#F2F2F2] gap-[24px] rounded-lg`}>
              {/* Analytics Option Tabs */}
              <div className="option-button mb-4">
                <div className="options flex space-x-4">
                  <div
                    className={`loss-prediction bg-white border-[1px] border-[#F2F2F2] cursor-pointer px-[10px] py-[8px] gap-[8px] rounded-full font-sora ${activeOption === 'loss-prediction'
                      ? 'bg-[#E8F5F0] text-[#2E6650] font-medium'
                      : themeClasses.buttonSecondary
                      }`}
                    onClick={() => handleOptionChange('loss-prediction')}
                  >
                    <p>Loss Prediction</p>
                  </div>

                  <div
                    className={`harvest cursor-pointer bg-white border-[1px] border-[#F2F2F2] px-[10px] py-[8px] gap-[8px] rounded-full font-sora ${activeOption === 'harvest-analytic'
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
                  <div className={`loss-pred ${darkMode ? 'bg-red-900' : 'bg-red-50'} border-l-[4px] border-red-600 p-4 rounded-lg`}>
                    <div className="flex items-start">
                      <div className="temperature-icon mr-4">
                        <Image src="/icons/high-temp.png" alt="temperature" width={36} height={36} />
                      </div>

                      <div className="text-area flex-1">
                        <div className={`text-1 flex justify-between font-sora`}>
                          <div className='font-semibold text-[16px] leading-[100%] font-sora text-[#564C4C]' ><p>Tomato</p></div>
                          <div className='font-thin text-[10px] leading-[100%] font-sora text-[#000000]'><p>Updated 2hrs ago</p></div>
                        </div>

                        <div className={`text-2 text-[14px] font-light leading-[100%] text-[#828282] ${darkMode ? 'text-red-200' : 'text-[#828282]'} font-sora`}>
                          <p>Risk Level: High (25% Loss Prediction)</p>
                        </div>

                        <div className={`text-2 w-[179px] h-[14px] text-[14px] font-light leading-[100%] text-[#828282] ${darkMode ? 'text-red-200' : 'text-[#828282]'} font-sora`}>
                          <p>Main Factor: Temperature</p>
                        </div>

                        <div className={`text-area-2 bg-[#fff] mt-3 ${themeClasses.card} px-[12px] py-[12px] gap-[12px] border-[1px] border-[#FDE5E5] rounded-md`}>
                          <div className="top text-[12px] leading-[100%] text-[#828282] font-extralight font-sora">
                            <p>Recommendation</p>
                          </div>

                          <div className={`bottom text-sm ${themeClasses.subtext} font-sora`}>
                            <p>Transport during cooler hours</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Harvest Analytics View */}
                {activeOption === 'harvest-analytic' && (
                  <div className={`harvest-analytic ${darkMode ? 'bg-green-900' : 'bg-green-50'} p-4 rounded-lg`}>
                    {/* Chart Container */}
                    <div className="chart-container h-40">
                      <div className="flex h-full justify-between">
                        {[0.3, 0.7, 0.9, 0.5, 0.6, 0.8, 0.4].map((height, index) => (
                          <div key={index} className="flex flex-col items-center justify-end h-full w-full">
                            <div
                              className={`${themeClasses.chartBar} w-4 rounded-t-md`}
                              style={{ height: `${height * 100}%` }}
                            />
                            <div className={`text-xs ${themeClasses.lightText} mt-1 font-sora`}>
                              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chart Legend */}
                    <div className="mt-2 flex justify-between items-center">
                      <div className={`text-sm ${themeClasses.subtext} font-sora`}>Weekly harvest report</div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-400 rounded-full mr-1"></div>
                          <span className="text-xs font-sora">Yams</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                          <span className="text-xs font-sora">Cassava</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="dashboard-right w-full md:w-80 flex flex-col space-y-6">
            {/* ===== LEVEL PROGRESS SECTION ===== */}
            <div className={`level-div ${themeClasses.card} p-4 rounded-lg flex flex-col`}>
              <div className="level mb-2">
                <p className={`text-[12px] leading-[100%] font-light ${themeClasses.lightText} font-sora`}>MY LEVEL</p>
              </div>

              {/* Progress Bar */}
              <div className={`level-slider relative h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full mb-4`}>
                <div className="absolute top-0 left-0 h-full w-1/2 bg-[#E8B800] rounded-full"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-yellow-400 rounded-full"></div>
              </div>

              {/* Level Indicators */}
              <div className="level-bottom flex justify-between items-center">
                <div className="harvest-hero text-center">
                  <div className="number font-light mb-1 text-[12px] leading-[100%] font-sora">
                    <p>1,500</p>
                  </div>
                  <div className={`text-[10px] leading-[100%] font-thin  ${themeClasses.subtext} font-sora`}>
                    <p>Harvest Hero</p>
                  </div>
                </div>

                <div className="harvest-lord text-center">
                  <div className="number font-light mb-1 text-[12px] leading-[100%] font-sora">
                    <p>3000</p>
                  </div>
                  <div className={`text-[10px] leading-[100%] font-thin ${themeClasses.subtext} font-sora`}>
                    <p>Harvest Lord</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== ACHIEVEMENTS SECTION ===== */}
            <div className={`achievement-div ${themeClasses.card} p-4 rounded-lg`}>
              <div className="achievement-header mb-3">
                <p className={`text-[12px] leading-[100%] font-light ${themeClasses.lightText} font-sora`}>ACHIEVEMENT</p>
              </div>

              {/* Achievement Items */}
              <div className="achievement-content flex flex-col space-y-3">
                {/* Achievement 1 */}
                <div className="first-achievement flex items-center">
                  <div className="img mr-3">
                    <Image src="/icons/harvest-hero.png" alt="achievement" width={40} height={40} />
                  </div>
                  <div className="text">
                    <div><p className="font-semibold mb-1 text-[14px] leading-[100%] text-[#828282] font-sora">Harvest Hero</p></div>
                    <div><p className={`font-light text-[12px] leading-[100%] text-[#828282] ${themeClasses.subtext} font-sora`}>Logged 10 Harvest</p></div>
                  </div>
                </div>

                {/* Achievement 2 */}
                <div className="second-achievement flex items-center">
                  <div className="img mr-3">
                    <Image src="/icons/data-cham.png" alt="achievement" width={40} height={40} />
                  </div>
                  <div className="text">
                    <div><p className="font-semibold mb-1 text-[14px] leading-[100%] text-[#828282] font-sora">Data Champion</p></div>
                    <div><p className={`font-light text-[12px] leading-[100%] text-[#828282] ${themeClasses.subtext} font-sora`}>Consistent for 7 days</p></div>
                  </div>
                </div>

                {/* Achievement 3 */}
                <div className="third-achievement flex items-center">
                  <div className="img mr-3">
                    <Image src="/icons/heart-storage.png" alt="achievement" width={40} height={40} />
                  </div>
                  <div className="text">
                    <div><p className="font-semibold mb-1 text-[14px] leading-[100%] text-[#828282] font-sora">Heart of State Storage</p></div>
                    <div><p className={`font-light text-[12px] leading-[100%] text-[#828282] ${themeClasses.subtext} font-sora`}>Best storage facilities</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== ACTIVITY SECTION ===== */}
            <div className={`activity-div ${themeClasses.card} p-4 rounded-lg`}>
              <div className="activity-header mb-3">
                <p className={`text-[12px] leading-[100%] font-light ${themeClasses.lightText} font-sora`}>MY ACTIVITY</p>
              </div>

              {/* Activity Grid */}
              <div className="activity-content grid grid-cols-2 gap-3">
                {/* Total Points */}
                <div className={`activity ${themeClasses.lightBg} p-3 rounded-lg`}>
                  <div><p className={`text-[12px] font-extralight leading-[100%] text-[#333] ${themeClasses.subtext} font-sora`}>Total Points</p></div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div><Image src="/icons/Coin.png" alt="points" width={24} height={24} /></div>
                    <div><p className="font-normal text-[14px] leading-[100%] font-sora">2100</p></div>
                  </div>
                </div>

                {/* Quests Joined */}
                <div className={`activity ${themeClasses.lightBg} p-3 rounded-lg`}>
                  <div><p className={`text-[12px] font-extralight leading-[100%] text-[#333] ${themeClasses.subtext} font-sora`}>Quest joined</p></div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div><Image src="/icons/magic-star.png" alt="quests" width={24} height={24} /></div>
                    <div><p className="font-normal text-[14px] leading-[100%] font-sora">3</p></div>
                  </div>
                </div>

                {/* League */}
                <div className={`activity ${themeClasses.lightBg} p-3 rounded-lg`}>
                  <div><p className={`text-[12px] font-extralight leading-[100%] text-[#333] ${themeClasses.subtext} font-sora`}>League</p></div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div><Image src="/icons/Leaderboard.png" alt="league" width={24} height={24} /></div>
                    <div><p className="font-normal text-[14px] leading-[100%] font-sora">Harvester&apos;s L</p></div>
                  </div>
                </div>

                {/* Current Streak */}
                <div className={`activity ${themeClasses.lightBg} p-3 rounded-lg`}>
                  <div><p className={`text-xs ${themeClasses.subtext} font-sora`}>Current streak</p></div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div><Image src="/icons/Streak_On.png" alt="streak" width={20} height={20} /></div>
                    <div><p className="font-normal text-[14px] leading-[100%] font-sora">3</p></div>
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