'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'

// Define crop risk data type
type CropRiskData = {
  crop: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  lossPercentage: number;
  mainFactor: string;
  recommendation: string;
  lastUpdated: string;
  icon: string;
};

const LossPredictionPage = () => {
  // State management
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  // Sample crop risk data
  const cropRiskData: CropRiskData[] = [
    {
      crop: "Tomato",
      riskLevel: "High",
      lossPercentage: 25,
      mainFactor: "Temperature",
      recommendation: "Transport during cooler hours",
      lastUpdated: "2hrs ago",
      icon: "/icons/high-temp.png"
    },
    {
      crop: "Cassava",
      riskLevel: "Medium",
      lossPercentage: 15,
      mainFactor: "Humidity",
      recommendation: "Improve storage ventilation",
      lastUpdated: "4hrs ago",
      icon: "/icons/humidity.png"
    },
    {
      crop: "Yam",
      riskLevel: "Low",
      lossPercentage: 5,
      mainFactor: "Storage",
      recommendation: "Maintain current conditions",
      lastUpdated: "1hr ago",
      icon: "/icons/storage.png"
    },
    {
      crop: "Maize",
      riskLevel: "Medium",
      lossPercentage: 12,
      mainFactor: "Pest",
      recommendation: "Apply organic pesticides",
      lastUpdated: "5hrs ago",
      icon: "/icons/pest.png"
    }
  ];

  // Filter crops based on selection
  const filteredCrops = selectedCrop === 'all' 
    ? cropRiskData 
    : cropRiskData.filter(crop => crop.crop.toLowerCase() === selectedCrop);

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
    inputBg: darkMode ? 'bg-gray-800' : 'bg-white',
  };

  // Risk level background colors
  const getRiskBgColor = (risk: string) => {
    if (darkMode) {
      return risk === 'High' ? 'bg-red-900' : risk === 'Medium' ? 'bg-yellow-900' : 'bg-green-900';
    } else {
      return risk === 'High' ? 'bg-red-50' : risk === 'Medium' ? 'bg-yellow-50' : 'bg-green-50';
    }
  };

  // Risk level border colors
  const getRiskBorderColor = (risk: string) => {
    return risk === 'High' ? 'border-red-600' : risk === 'Medium' ? 'border-yellow-600' : 'border-green-600';
  };

  // Risk level text colors
  const getRiskTextColor = (risk: string) => {
    if (darkMode) {
      return risk === 'High' ? 'text-red-200' : risk === 'Medium' ? 'text-yellow-200' : 'text-green-200';
    } else {
      return risk === 'High' ? 'text-red-700' : risk === 'Medium' ? 'text-yellow-700' : 'text-green-700';
    }
  };

  return (
    <div className={`w-full min-h-screen font-sora ${themeClasses.container}`}>
      <div className="dashboard-container flex flex-col p-2 sm:p-4 max-w-7xl mx-auto">
        {/* ===== HEADER SECTION ===== */}
        <header className="header flex flex-wrap justify-between items-center mb-4 sm:mb-6 px-2 sm:px-4 py-2 sticky top-0 z-10 bg-inherit backdrop-blur-sm">
          <div className="header-text w-auto font-sora text-base sm:text-lg md:text-xl lg:text-[20px] leading-[100%] font-semibold">
            Loss Prediction
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Desktop view */}
          <div className="ranking hidden md:flex items-center gap-[24px] space-x-4">
            {/* Streak and points display */}
            <div className="thundercoin flex items-center space-x-4">
              <div className="thunder3 flex items-center space-x-2">
                <div className="img">
                  <Image src="/icons/Streak_On.png" alt="streak" width={24} height={24} />
                </div>
                <div className="number font-semibold leading-[100%] text-lg md:text-[20px] font-sora">
                  3
                </div>
              </div>

              <div className="coin-num flex items-center space-x-2">
                <div className="img">
                  <Image src="/icons/Coin.png" alt="coin" width={24} height={24} />
                </div>
                <div className="number font-semibold leading-[100%] text-lg md:text-[20px] font-sora">
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
        </header>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full py-4 px-2 rounded-lg mb-4 space-y-4 border-b border-gray-200 dark:border-gray-700">
            <div className="thundercoin flex items-center justify-around">
              <div className="thunder3 flex items-center space-x-2">
                <Image src="/icons/Streak_On.png" alt="streak" width={24} height={24} />
                <span className="number font-semibold leading-[100%] text-lg font-sora">3</span>
              </div>

              <div className="coin-num flex items-center space-x-2">
                <Image src="/icons/Coin.png" alt="coin" width={24} height={24} />
                <span className="number font-semibold leading-[100%] text-lg font-sora">2.1k</span>
              </div>
            </div>
            
            <div className="alertuser flex items-center justify-around">
              <div className="alert flex items-center space-x-2 relative">
                <Image src="/icons/notification.png" alt="notification" width={24} height={24} />
                <div className="number absolute -top-[2px] -left-[-9px] bg-[#920E0E] text-white text-[8px] font-medium leading-[120%] rounded-full w-4 h-4 flex items-center justify-center font-sora">
                  3
                </div>
              </div>

              <div className="user">
                <Image src="/icons/user.png" alt="user" width={32} height={32} className="rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* ===== MAIN CONTENT ===== */}
        <main className="dashboard-content flex flex-col space-y-4 sm:space-y-6">
          {/* Farm Risk Overview Card */}
          <section className={`${themeClasses.card} p-3 sm:p-4 md:p-6 rounded-lg border ${themeClasses.border}`}>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-sora">Farm Risk Overview</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} p-3 sm:p-4 rounded-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-red-600 dark:text-red-400">High Risk</h3>
                  <span className="bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-200 text-xs font-medium px-2 py-1 rounded-full">1 crop</span>
                </div>
                <p className={`text-xs sm:text-sm ${themeClasses.subtext}`}>Immediate action needed</p>
              </div>
              
              <div className={`${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} p-3 sm:p-4 rounded-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-yellow-600 dark:text-yellow-400">Medium Risk</h3>
                  <span className="bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-200 text-xs font-medium px-2 py-1 rounded-full">2 crops</span>
                </div>
                <p className={`text-xs sm:text-sm ${themeClasses.subtext}`}>Monitor closely</p>
              </div>
              
              <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} p-3 sm:p-4 rounded-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-green-600 dark:text-green-400">Low Risk</h3>
                  <span className="bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full">1 crop</span>
                </div>
                <p className={`text-xs sm:text-sm ${themeClasses.subtext}`}>Maintain current practices</p>
              </div>
            </div>
            
            {/* Risk factor chart */}
            <div className="mb-3 sm:mb-4">
              <h3 className="text-xs sm:text-sm font-medium mb-2 font-sora">Main Risk Factors</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <div className="w-24 sm:w-32 text-xs text-gray-500 truncate mr-2">Temperature</div>
                  <div className="flex-1 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: '65%' }}></div>
                  </div>
                  <div className="w-8 sm:w-10 text-xs text-right ml-2">65%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 sm:w-32 text-xs text-gray-500 truncate mr-2">Humidity</div>
                  <div className="flex-1 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: '40%' }}></div>
                  </div>
                  <div className="w-8 sm:w-10 text-xs text-right ml-2">40%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 sm:w-32 text-xs text-gray-500 truncate mr-2">Storage</div>
                  <div className="flex-1 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '25%' }}></div>
                  </div>
                  <div className="w-8 sm:w-10 text-xs text-right ml-2">25%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 sm:w-32 text-xs text-gray-500 truncate mr-2">Pests</div>
                  <div className="flex-1 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '15%' }}></div>
                  </div>
                  <div className="w-8 sm:w-10 text-xs text-right ml-2">15%</div>
                </div>
              </div>
            </div>
          </section>

          {/* Filter Section */}
          <section className={`${themeClasses.card} p-3 sm:p-4 rounded-lg border ${themeClasses.border}`}>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3">
              <div className="font-medium mb-2 sm:mb-0">Filter by:</div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => setSelectedCrop('all')} 
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${selectedCrop === 'all' ? 
                    'bg-[#E8F5F0] text-[#2E6650] font-medium' : 
                    themeClasses.buttonSecondary}`}
                >
                  All Crops
                </button>
                {cropRiskData.map((crop, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedCrop(crop.crop.toLowerCase())} 
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${selectedCrop === crop.crop.toLowerCase() ? 
                      'bg-[#E8F5F0] text-[#2E6650] font-medium' : 
                      themeClasses.buttonSecondary}`}
                  >
                    {crop.crop}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Crop Risk Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredCrops.map((crop, index) => (
              <article 
                key={index} 
                className={`${getRiskBgColor(crop.riskLevel)} border-l-[4px] ${getRiskBorderColor(crop.riskLevel)} p-3 sm:p-4 rounded-lg`}
              >
                <div className="flex items-start">
                  <div className="risk-icon mr-3 sm:mr-4 flex-shrink-0">
                    <Image src={crop.icon} alt={crop.mainFactor} width={32} height={32} className="w-7 h-7 sm:w-9 sm:h-9" />
                  </div>

                  <div className="text-area flex-1 min-w-0">
                    <div className="text-1 flex justify-between items-center font-sora mb-1">
                      <div className='font-semibold text-sm sm:text-base leading-[100%] font-sora text-[#564C4C] dark:text-gray-200 truncate mr-2'>
                        <p>{crop.crop}</p>
                      </div>
                      <div className='flex-shrink-0 font-thin text-[9px] sm:text-[10px] leading-[100%] font-sora text-[#000000] dark:text-gray-300'>
                        <p>Updated {crop.lastUpdated}</p>
                      </div>
                    </div>

                    <div className={`text-2 text-xs sm:text-sm font-light leading-[150%] ${getRiskTextColor(crop.riskLevel)} font-sora`}>
                      <p>Risk Level: {crop.riskLevel} ({crop.lossPercentage}% Loss Prediction)</p>
                    </div>

                    <div className={`text-2 text-xs sm:text-sm font-light leading-[150%] ${getRiskTextColor(crop.riskLevel)} font-sora`}>
                      <p>Main Factor: {crop.mainFactor}</p>
                    </div>

                    <div className={`text-area-2 ${themeClasses.card} mt-2 sm:mt-3 px-2 sm:px-3 py-2 sm:py-3 gap-[12px] border-[1px] border-[#FDE5E5] rounded-md`}>
                      <div className="top text-[10px] sm:text-[12px] leading-[100%] text-[#828282] font-extralight font-sora mb-1">
                        <p>Recommendation</p>
                      </div>

                      <div className={`bottom text-xs sm:text-sm ${themeClasses.subtext} font-sora`}>
                        <p>{crop.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* AI Assistant */}
          <section className={`${themeClasses.card} p-3 sm:p-4 rounded-lg border ${themeClasses.border} mt-4 sm:mt-6`}>
            <div className="flex items-center mb-3">
              <div className="mr-2 sm:mr-3 flex-shrink-0">
                <Image src="/icons/ai-assistant.webp" alt="AI Assistant" width={24} height={24} className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="font-medium text-base sm:text-lg">Loss Prevention Assistant</h3>
            </div>
            
            <div className={`${themeClasses.lightBg} p-2 sm:p-3 rounded-lg mb-3`}>
              <p className="text-xs sm:text-sm mb-2">I see you have a high-risk tomato crop. Would you like recommendations to reduce temperature-related losses?</p>
              <div className="flex gap-2">
                <button className="px-2 sm:px-3 py-1 bg-[#2E6650] text-white rounded-full text-xs sm:text-sm">Yes, help me</button>
                <button className={`px-2 sm:px-3 py-1 ${themeClasses.buttonSecondary} rounded-full text-xs sm:text-sm`}>No thanks</button>
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask about loss prevention..." 
                className={`w-full p-2 sm:p-3 ${themeClasses.inputBg} border ${themeClasses.border} rounded-full pr-10 sm:pr-12 text-sm`}
              />
              <button className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-[#2E6650] text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                <span className="text-base sm:text-lg">→</span>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default LossPredictionPage