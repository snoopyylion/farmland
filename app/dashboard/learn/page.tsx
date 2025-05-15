'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'

// Define learning content types
type LearningModule = {
  id: string;
  title: string;
  description: string;
  duration: string;
  points: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  image: string;
  tags: string[];
};

type LearningArticle = {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
};

const LearnPage = () => {
  // State management
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'modules' | 'articles'>('modules');
  const [activeFilter, setActiveFilter] = useState<string>('all');

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

  // Sample learning modules data
  const learningModules: LearningModule[] = [
    {
      id: "module-1",
      title: "Introduction to Post-Harvest Handling",
      description: "Learn the basics of proper post-harvest handling techniques to minimize crop losses.",
      duration: "30 mins",
      points: 100,
      difficulty: "Beginner",
      progress: 75,
      image: "/img/post-harvest.png",
      tags: ["storage", "basics", "handling"]
    },
    {
      id: "module-2",
      title: "Advanced Storage Techniques",
      description: "Explore advanced methods to preserve crops and extend shelf life.",
      duration: "45 mins",
      points: 150,
      difficulty: "Intermediate",
      progress: 25,
      image: "/img/storage.png",
      tags: ["storage", "advanced", "preservation"]
    },
    {
      id: "module-3",
      title: "Understanding Climate-Smart Agriculture",
      description: "Learn how to adapt farming practices to changing climate conditions.",
      duration: "60 mins",
      points: 200,
      difficulty: "Advanced",
      progress: 0,
      image: "/img/climate-smart.webp",
      tags: ["climate", "adaptation", "farming"]
    },
    {
      id: "module-4",
      title: "Market Access Strategies",
      description: "Discover techniques to improve market access and get better prices for your produce.",
      duration: "40 mins",
      points: 125,
      difficulty: "Intermediate",
      progress: 0,
      image: "/img/market-access.jpeg",
      tags: ["market", "business", "pricing"]
    }
  ];

  // Sample learning articles data
  const learningArticles: LearningArticle[] = [
    {
      id: "article-1",
      title: "5 Ways to Reduce Tomato Spoilage During Transport",
      summary: "Practical tips to minimize tomato losses when transporting to markets.",
      readTime: "5 mins",
      author: "Dr. Adesina",
      date: "May 12, 2025",
      image: "/img/tomato-transport.jpeg",
      tags: ["tomato", "transport", "storage"]
    },
    {
      id: "article-2",
      title: "New Research on Yam Storage Methods",
      summary: "Recent findings on innovative yam storage techniques to extend shelf life.",
      readTime: "8 mins",
      author: "Prof. Okonkwo",
      date: "May 8, 2025",
      image: "/img/yam-storage.jpg",
      tags: ["yam", "research", "storage"]
    },
    {
      id: "article-3",
      title: "Weather Patterns and Crop Loss: What to Expect This Season",
      summary: "Analysis of weather forecasts and potential impact on post-harvest losses.",
      readTime: "6 mins",
      author: "Climate Watch Team",
      date: "May 5, 2025",
      image: "/img/weather-crops.jpeg",
      tags: ["weather", "climate", "forecast"]
    },
    {
      id: "article-4",
      title: "Government Announces New Support Program for Storage Facilities",
      summary: "Details about the new government initiative to help farmers improve storage infrastructure.",
      readTime: "4 mins",
      author: "Policy Update Team",
      date: "May 3, 2025",
      image: "/img/govt-program.jpeg",
      tags: ["policy", "funding", "storage"]
    }
  ];

  // Filter content based on active filter
  const filteredModules = activeFilter === 'all' 
    ? learningModules 
    : learningModules.filter(module => module.tags.includes(activeFilter));

  const filteredArticles = activeFilter === 'all'
    ? learningArticles
    : learningArticles.filter(article => article.tags.includes(activeFilter));

  // All unique tags for filtering
  const allTags = Array.from(new Set([
    ...learningModules.flatMap(module => module.tags),
    ...learningArticles.flatMap(article => article.tags)
  ]));

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
    moduleCard: darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50',
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className={`w-full font-sora ${themeClasses.container}`}>
      <div className="dashboard-container flex flex-col p-4 max-w-7xl mx-auto">
        {/* ===== HEADER SECTION ===== */}
        <div className="header flex justify-between items-center mb-6 px-4 py-2">
          <div className="header-text w-full font-sora text-[20px] leading-[100%] font-semibold flex items-center">
            Learn
          </div>

          <div className="ranking flex items-center gap-[24px] space-x-4">
            {/* Streak and points display */}
            <div className="thundercoin flex items-center space-x-4">
              <div className="thunder3 flex items-center space-x-2">
                <div className="img">
                  <Image src="/icons/Streak_On.png" alt="streak" width={24} height={24} priority />
                </div>
                <div className="number font-semibold leading-[100%] text-[20px] font-sora">
                  3
                </div>
              </div>

              <div className="coin-num flex items-center space-x-2">
                <div className="img">
                  <Image src="/icons/Coin.png" alt="coin" width={24} height={24} priority />
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
                  <Image src="/icons/notification.png" alt="notification" width={24} height={24} priority />
                </div>
                <div className="number absolute -top-[2px] -left-[-9px] bg-[#920E0E] text-white text-[8px] font-medium leading-[120%] rounded-full w-4 h-4 flex items-center justify-center font-sora">
                  3
                </div>
              </div>

              <div className="user">
                <Image src="/icons/user.png" alt="user" width={32} height={32} className="rounded-full" priority />
              </div>
            </div>
          </div>
        </div>

        {/* ===== LEARNING PROGRESS SECTION ===== */}
        <div className={`${themeClasses.card} p-6 rounded-lg border ${themeClasses.border} mb-6`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1 font-sora">Your Learning Journey</h2>
              <p className={`text-sm ${themeClasses.subtext}`}>Keep learning to earn more points and badges</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <div className="mr-4">
                <div className="text-xs text-gray-500 mb-1">Modules Completed</div>
                <div className="flex items-center">
                  <div className="mr-2">
                    <Image src="/icons/module-complete.png" alt="Modules" width={20} height={20} priority />
                  </div>
                  <span className="font-medium">1/4</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Points Earned</div>
                <div className="flex items-center">
                  <div className="mr-2">
                    <Image src="/icons/Coin.png" alt="Points" width={20} height={20} priority />
                  </div>
                  <span className="font-medium">250</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Overall Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500">Overall Progress</span>
              <span className="text-xs font-medium">25%</span>
            </div>
            <div className={`h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}>
              <div className="h-full bg-[#2E6650] rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          
          {/* Next Recommended Module */}
          <div className={`mt-6 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Recommended Next:</h3>
              <span className={`text-xs px-2 py-1 ${getDifficultyColor('Intermediate')} rounded-full`}>Intermediate</span>
            </div>
            <p className="font-medium mb-1">Advanced Storage Techniques</p>
            <p className={`text-sm ${themeClasses.subtext} mb-3`}>Continue where you left off (25% complete)</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image src="/icons/clock.png" alt="Duration" width={16} height={16} className="mr-1" priority />
                <span className="text-xs text-gray-500">45 mins</span>
              </div>
              <button className="bg-[#2E6650] text-white px-4 py-1 rounded-full text-sm">
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* ===== CONTENT SECTION ===== */}
        <div className={`${themeClasses.card} rounded-lg border ${themeClasses.border}`}>
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'modules'
                  ? 'border-b-2 border-[#2E6650] text-[#2E6650] dark:text-green-400'
                  : `${themeClasses.subtext}`
              }`}
            >
              Learning Modules
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'articles'
                  ? 'border-b-2 border-[#2E6650] text-[#2E6650] dark:text-green-400'
                  : `${themeClasses.subtext}`
              }`}
            >
              Articles
            </button>
          </div>

          {/* Filter Tags */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  activeFilter === 'all'
                    ? 'bg-[#E8F5F0] text-[#2E6650] font-medium'
                    : themeClasses.buttonSecondary
                }`}
              >
                All
              </button>
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                    activeFilter === tag
                      ? 'bg-[#E8F5F0] text-[#2E6650] font-medium'
                      : themeClasses.buttonSecondary
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Content Display */}
          <div className="p-4">
            {/* Modules Tab Content */}
            {activeTab === 'modules' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredModules.length > 0 ? (
                  filteredModules.map((module, index) => (
                    <div
                      key={index}
                      className={`${themeClasses.moduleCard} border ${themeClasses.border} rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md`}
                    >
                      <div className="h-40 relative bg-gray-200 dark:bg-gray-700">
                        <Image
                          src={module.image}
                          alt={module.title}
                          layout="fill"
                          objectFit="cover"
                          className="opacity-90"
                          priority
                        />
                        <div className="absolute bottom-2 left-2">
                          <span className={`text-xs px-2 py-1 ${getDifficultyColor(module.difficulty)} rounded-full`}>
                            {module.difficulty}
                          </span>
                        </div>
                        {module.progress > 0 && (
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300 dark:bg-gray-600">
                            <div
                              className="h-full bg-[#2E6650]"
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{module.title}</h3>
                          <div className="flex items-center text-xs ml-2">
                            <Image src="/icons/Coin.png" alt="Points" width={16} height={16} className="mr-1" priority />
                            <span>{module.points} pts</span>
                          </div>
                        </div>
                        <p className={`text-sm ${themeClasses.subtext} mb-3`}>{module.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Image src="/icons/clock.png" alt="Duration" width={16} height={16} className="mr-1" priority />
                            <span className="text-xs text-gray-500">{module.duration}</span>
                          </div>
                          <button className={`${
                            module.progress > 0 
                              ? 'bg-[#2E6650] text-white' 
                              : themeClasses.buttonSecondary
                          } px-3 py-1 rounded-full text-xs`}>
                            {module.progress > 0 ? 'Continue' : 'Start'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center p-8">
                    <Image src="/icons/empty-state.png" alt="No modules found" width={80} height={80} priority />
                    <p className="mt-4 text-center font-medium">No modules found</p>
                    <p className={`mt-2 text-sm ${themeClasses.subtext} text-center`}>
                      Try changing your filter or check back later for new content
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Articles Tab Content */}
            {activeTab === 'articles' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, index) => (
                    <div
                      key={index}
                      className={`${themeClasses.moduleCard} border ${themeClasses.border} rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md`}
                    >
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="w-16 h-16 mr-3 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden relative flex-shrink-0">
                            <Image
                              src={article.image}
                              alt={article.title}
                              layout="fill"
                              objectFit="cover"
                              priority
                            />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1 line-clamp-2">{article.title}</h3>
                            <p className={`text-xs ${themeClasses.subtext} mb-2`}>
                              By {article.author} • {article.date}
                            </p>
                          </div>
                        </div>
                        <p className={`text-sm ${themeClasses.subtext} mt-2 mb-3 line-clamp-2`}>
                          {article.summary}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Image src="/icons/clock.png" alt="Read time" width={16} height={16} className="mr-1" priority />
                            <span className="text-xs text-gray-500">{article.readTime} read</span>
                          </div>
                          <button className={`${themeClasses.buttonSecondary} px-3 py-1 rounded-full text-xs`}>
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center p-8">
                    <Image src="/icons/empty-state.png" alt="No articles found" width={80} height={80} priority />
                    <p className="mt-4 text-center font-medium">No articles found</p>
                    <p className={`mt-2 text-sm ${themeClasses.subtext} text-center`}>
                      Try changing your filter or check back later for new content
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===== UPCOMING WEBINARS ===== */}
        <div className={`${themeClasses.card} p-4 rounded-lg border ${themeClasses.border} mt-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Upcoming Webinars</h2>
            <button className="text-sm text-[#2E6650] dark:text-green-400 font-medium">View All</button>
          </div>
          
          <div className={`p-4 border ${themeClasses.border} rounded-lg flex flex-col md:flex-row gap-4 items-center`}>
            <div className="w-full md:w-1/4">
              <div className="bg-[#E8F5F0] dark:bg-green-900/30 text-[#2E6650] dark:text-green-300 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold">18</div>
                <div className="text-sm">May</div>
              </div>
            </div>
            <div className="w-full md:w-2/4">
              <h3 className="font-medium mb-1">Modern Storage Solutions for Small-Scale Farmers</h3>
              <p className={`text-sm ${themeClasses.subtext}`}>
                Learn about affordable and efficient storage solutions from industry experts
              </p>
              <div className="flex items-center mt-2">
                <Image src="/icons/clock.png" alt="Time" width={16} height={16} className="mr-1" priority />
                <span className="text-xs text-gray-500">2:00 PM - 3:30 PM</span>
              </div>
            </div>
            <div className="w-full md:w-1/4 flex justify-end">
              <button className="bg-[#2E6650] text-white px-4 py-2 rounded-full text-sm">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnPage