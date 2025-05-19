'use client'

import Image from 'next/image'
import React from 'react'

type LearningProgressProps = {
  darkMode: boolean
  themeClasses: {
    card: string
    border: string
    subtext: string
  }
  modulesCompleted: {
    completed: number
    total: number
  }
  pointsEarned: number
  overallProgress: number // e.g. 25 for 25%
  nextModule: {
    title: string
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string
    progress: number
    duration: string
  }
  getDifficultyColor: (difficulty: string) => string
}

const LearningProgress: React.FC<LearningProgressProps> = ({
  darkMode,
  themeClasses,
  modulesCompleted,
  pointsEarned,
  overallProgress,
  nextModule,
  getDifficultyColor,
}) => {
  return (
    <div className={`${themeClasses.card} p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border ${themeClasses.border} mb-3 sm:mb-4 md:mb-5 lg:mb-6 w-full max-w-full`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4">
        <div className="w-full sm:w-auto mb-3 sm:mb-0">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1 font-sora">Your Learning Journey</h2>
          <p className={`text-xs sm:text-sm ${themeClasses.subtext}`}>Keep learning to earn more points and badges</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex flex-col">
            <div className="text-xs text-gray-500 mb-1">Modules Completed</div>
            <div className="flex items-center">
              <div className="mr-1 md:mr-2">
                <Image src="/icons/module-complete.png" alt="Modules" width={18} height={18} priority className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </div>
              <span className="font-medium text-sm sm:text-base">{modulesCompleted.completed}/{modulesCompleted.total}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-gray-500 mb-1">Points Earned</div>
            <div className="flex items-center">
              <div className="mr-1 md:mr-2">
                <Image src="/icons/Coin.png" alt="Points" width={18} height={18} priority className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </div>
              <span className="font-medium text-sm sm:text-base">{pointsEarned}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-500">Overall Progress</span>
          <span className="text-xs font-medium">{overallProgress}%</span>
        </div>
        <div className={`h-1.5 sm:h-2 ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'} rounded-full`}>
          <div className="h-full bg-[#2E6650] rounded-full" style={{ width: `${overallProgress}%` }}></div>
        </div>
      </div>

      {/* Next Recommended Module */}
      <div className={`mt-3 sm:mt-4 md:mt-5 lg:mt-6 p-2.5 sm:p-3 md:p-4 ${darkMode ? 'bg-zinc-700' : 'bg-gray-50'} rounded-lg`}>
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <h3 className="font-medium text-xs sm:text-sm md:text-base">Recommended Next:</h3>
          <span className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 ${getDifficultyColor(nextModule.difficulty)} rounded-full`}>
            {nextModule.difficulty}
          </span>
        </div>
        <p className="font-medium mb-1 text-sm sm:text-base truncate">{nextModule.title}</p>
        <p className={`text-xs sm:text-sm ${themeClasses.subtext} mb-2 sm:mb-3`}>
          Continue where you left off ({nextModule.progress}% complete)
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/icons/clock.png" alt="Duration" width={16} height={16} className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" priority />
            <span className="text-xs text-gray-500">{nextModule.duration}</span>
          </div>
          <button className="bg-[#2E6650] text-white px-2 sm:px-3 md:px-4 py-1 rounded-full text-xs sm:text-sm hover:bg-[#235040] transition-colors">Continue</button>
        </div>
      </div>
    </div>
  )
}

export default LearningProgress