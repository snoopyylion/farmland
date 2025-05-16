'use client'

import Header from '@/components/Header';
import LearningProgress from '@/components/LearningProgress';
import UpcomingWebinar from '@/components/UpcomingWebinar';
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
  const [screenSize, setScreenSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');

  // Effect to detect system color scheme and screen size
  useEffect(() => {
    // Check if user prefers dark mode
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent): void => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Function to handle screen size changes
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setScreenSize('xs');
      } else if (width < 640) {
        setScreenSize('sm');
      } else if (width < 768) {
        setScreenSize('md');
      } else if (width < 1024) {
        setScreenSize('lg');
      } else if (width < 1280) {
        setScreenSize('xl');
      } else {
        setScreenSize('2xl');
      }
    };

    // Set initial screen size
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleResize);
    };
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

  // Get grid columns based on screen size
  const getGridColumns = () => {
    switch (screenSize) {
      case 'xs':
        return 'grid-cols-1';
      case 'sm':
        return 'grid-cols-1';
      case 'md':
        return 'grid-cols-1';
      case 'lg':
        return 'grid-cols-2';
      case 'xl':
      case '2xl':
        return 'grid-cols-2 xl:grid-cols-3';
      default:
        return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
    }
  };

  // Get padding based on screen size
  const getPadding = () => {
    switch (screenSize) {
      case 'xs':
        return 'p-2';
      case 'sm':
        return 'p-3';
      case 'md':
        return 'p-4';
      case 'lg':
        return 'p-5';
      case 'xl':
      case '2xl':
        return 'p-6';
      default:
        return 'p-3 sm:p-4 md:p-5 lg:p-6';
    }
  };

  // Get gap based on screen size
  const getGap = () => {
    switch (screenSize) {
      case 'xs':
        return 'gap-2';
      case 'sm':
        return 'gap-2.5';
      case 'md':
        return 'gap-3';
      case 'lg':
        return 'gap-4';
      case 'xl':
      case '2xl':
        return 'gap-5';
      default:
        return 'gap-2 sm:gap-3 md:gap-4 lg:gap-5';
    }
  };

  return (
    <div className={`w-full min-h-screen font-sora ${themeClasses.container}`}>
      <div className={`dashboard-container flex flex-col p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 max-w-7xl mx-auto`}>
        {/* ===== HEADER SECTION ===== */}
        <Header title="Learn" />

        {/* ===== LEARNING PROGRESS SECTION ===== */}
        <LearningProgress
          darkMode={darkMode}
          themeClasses={themeClasses}
          modulesCompleted={{ completed: 1, total: 4 }}
          pointsEarned={250}
          overallProgress={25}
          nextModule={{
            title: "Advanced Storage Techniques",
            difficulty: "Intermediate",
            progress: 25,
            duration: "45 mins",
          }}
          getDifficultyColor={getDifficultyColor}
        />

        {/* ===== CONTENT SECTION ===== */}
        <div className={`${themeClasses.card} rounded-lg border ${themeClasses.border} mt-3 sm:mt-4 md:mt-5 lg:mt-6`}>
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('modules')}
              className={`flex-1 sm:flex-none px-3 xs:px-4 sm:px-6 py-2 sm:py-3 text-xs xs:text-sm font-medium ${activeTab === 'modules'
                ? 'border-b-2 border-[#2E6650] text-[#2E6650] dark:text-green-400'
                : `${themeClasses.subtext}`
                } transition-colors`}
              aria-label="View learning modules"
            >
              Learning Modules
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex-1 sm:flex-none px-3 xs:px-4 sm:px-6 py-2 sm:py-3 text-xs xs:text-sm font-medium ${activeTab === 'articles'
                ? 'border-b-2 border-[#2E6650] text-[#2E6650] dark:text-green-400'
                : `${themeClasses.subtext}`
                } transition-colors`}
              aria-label="View articles"
            >
              Articles
            </button>
          </div>

          {/* Filter Tags */}
          <div className="p-2 xs:p-3 sm:p-4 md:p-5 border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-thin">
            <div className="flex space-x-1.5 xs:space-x-2 md:space-x-3 min-w-max">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 rounded-full text-xs whitespace-nowrap ${activeFilter === 'all'
                  ? 'bg-[#E8F5F0] text-[#2E6650] font-medium'
                  : themeClasses.buttonSecondary
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-green-500`}
                aria-label="Show all content"
              >
                All
              </button>
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 rounded-full text-xs whitespace-nowrap ${activeFilter === tag
                    ? 'bg-[#E8F5F0] text-[#2E6650] font-medium'
                    : themeClasses.buttonSecondary
                    } transition-colors focus:outline-none focus:ring-2 focus:ring-green-500`}
                  aria-label={`Filter by ${tag}`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Content Display */}
          <div className="p-2 xs:p-3 sm:p-4 md:p-5">
            {/* Modules Tab Content */}
            {activeTab === 'modules' && (
              <div className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5`}>
                {filteredModules.length > 0 ? (
                  filteredModules.map((module, index) => (
                    <div
                      key={index}
                      className={`${themeClasses.moduleCard} border ${themeClasses.border} rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-green-500`}
                    >
                      <div className="h-24 xs:h-28 sm:h-32 md:h-40 relative bg-gray-200 dark:bg-gray-700">
                        <Image
                          src={module.image}
                          alt={module.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 33vw"
                          style={{ objectFit: "cover" }}
                          className="opacity-90"
                          priority
                        />
                        <div className="absolute bottom-2 left-2">
                          <span className={`text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 ${getDifficultyColor(module.difficulty)} rounded-full`}>
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
                      <div className="p-2 xs:p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-1 xs:mb-2">
                          <h3 className="text-xs xs:text-sm sm:text-base font-medium line-clamp-2">{module.title}</h3>
                          <div className="flex items-center text-xs ml-1 xs:ml-2 flex-shrink-0">
                            <Image 
                              src="/icons/Coin.png" 
                              alt="Points" 
                              width={16} 
                              height={16} 
                              className="w-3 h-3 xs:w-4 xs:h-4 mr-0.5 xs:mr-1" 
                              priority 
                            />
                            <span>{module.points} pts</span>
                          </div>
                        </div>
                        <p className={`text-xs sm:text-sm ${themeClasses.subtext} mb-2 xs:mb-3 line-clamp-2`}>{module.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Image 
                              src="/icons/clock.png" 
                              alt="Duration" 
                              width={16} 
                              height={16} 
                              className="w-3 h-3 xs:w-4 xs:h-4 mr-0.5 xs:mr-1" 
                              priority 
                            />
                            <span className="text-xs text-gray-500">{module.duration}</span>
                          </div>
                          <button 
                            className={`${module.progress > 0
                              ? 'bg-[#2E6650] hover:bg-[#235040] text-white'
                              : themeClasses.buttonSecondary
                              } px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 rounded-full text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-green-500`}
                            aria-label={module.progress > 0 ? `Continue ${module.title}` : `Start ${module.title}`}
                          >
                            {module.progress > 0 ? 'Continue' : 'Start'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center p-4 sm:p-8">
                    <Image src="/icons/empty-state.png" alt="No modules found" width={80} height={80} priority className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20" />
                    <p className="mt-3 xs:mt-4 text-center font-medium text-xs xs:text-sm sm:text-base">No modules found</p>
                    <p className={`mt-1 xs:mt-2 text-xs sm:text-sm ${themeClasses.subtext} text-center max-w-xs`}>
                      Try changing your filter or check back later for new content
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Articles Tab Content */}
            {activeTab === 'articles' && (
              <div className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5`}>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, index) => (
                    <div
                      key={index}
                      className={`${themeClasses.moduleCard} border ${themeClasses.border} rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-green-500`}
                    >
                      <div className="p-2 xs:p-3 sm:p-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 mr-2 sm:mr-3 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden relative flex-shrink-0">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 64px"
                              style={{ objectFit: "cover" }}
                              priority
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xs xs:text-sm sm:text-base font-medium mb-0.5 xs:mb-1 line-clamp-2">{article.title}</h3>
                            <p className={`text-xs ${themeClasses.subtext} mb-0.5 xs:mb-1 sm:mb-2 whitespace-nowrap overflow-hidden text-ellipsis`}>
                              By {article.author} • {article.date}
                            </p>
                          </div>
                        </div>
                        <p className={`text-xs sm:text-sm ${themeClasses.subtext} mt-1.5 xs:mt-2 mb-2 xs:mb-3 line-clamp-2`}>
                          {article.summary}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Image 
                              src="/icons/clock.png" 
                              alt="Read time" 
                              width={16} 
                              height={16} 
                              className="w-3 h-3 xs:w-4 xs:h-4 mr-0.5 xs:mr-1" 
                              priority 
                            />
                            <span className="text-xs text-gray-500">{article.readTime} read</span>
                          </div>
                          <button 
                            className={`${themeClasses.buttonSecondary} px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 rounded-full text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-green-500`}
                            aria-label={`Read ${article.title}`}
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center p-4 sm:p-8">
                    <Image src="/icons/empty-state.png" alt="No articles found" width={80} height={80} priority className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20" />
                    <p className="mt-3 xs:mt-4 text-center font-medium text-xs xs:text-sm sm:text-base">No articles found</p>
                    <p className={`mt-1 xs:mt-2 text-xs sm:text-sm ${themeClasses.subtext} text-center max-w-xs`}>
                      Try changing your filter or check back later for new content
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===== UPCOMING WEBINARS ===== */}
        <UpcomingWebinar
          date={18}
          month="May"
          title="Modern Storage Solutions for Small-Scale Farmers"
          description="Learn about affordable and efficient storage solutions from industry experts"
          time="2:00 PM - 3:30 PM"
          themeClasses={themeClasses}
        />
      </div>
    </div>
  )
}

export default LearnPage