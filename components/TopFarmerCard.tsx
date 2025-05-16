'use client';

import Image from 'next/image';
import React from 'react';

interface Farmer {
  id: string;
  name: string;
  avatar?: string;
  farm_type: string;
  points: number;
  streak: number;
  completedQuests: number;
}

interface TopFarmersProps {
  leaderboardData: Farmer[];
  themeClasses: {
    header: string;
    card: string;
    border: string;
    subtext: string;
  };
}

const TopFarmers: React.FC<TopFarmersProps> = ({ leaderboardData, themeClasses }) => {
  return (
    <div className="top-farmers mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-4 lg:px-8">
      <h2 className={`text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4 ${themeClasses.header}`}>
        Top Farmers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {leaderboardData.slice(0, 3).map((farmer, index) => (
          <div
            key={farmer.id}
            className={`${themeClasses.card} p-3 sm:p-4 rounded-xl border ${themeClasses.border} flex flex-col items-center text-center`}
          >
            {/* Rank Badge - Smaller on mobile */}
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mb-1 sm:mb-2
                ${
                  index === 0
                    ? 'bg-yellow-100 text-yellow-800'
                    : index === 1
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-amber-900 bg-opacity-20 text-amber-800'
                }`}
            >
              {index + 1}
            </div>

            {/* Avatar + Streak Badge - Responsive sizes */}
            <div className="relative mb-2 sm:mb-3">
              <Image
                src={farmer.avatar || "/icons/user.png"}
                alt={farmer.name}
                width={64}
                height={64}
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5 sm:p-1 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-0.5 sm:space-x-1">
                  <Image 
                    src="/icons/Streak_On.png" 
                    alt="streak" 
                    width={12} 
                    height={12}
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" 
                  />
                  <span className="text-[8px] sm:text-[10px] lg:text-xs font-medium">{farmer.streak}</span>
                </div>
              </div>
            </div>

            {/* Name + Type - Responsive text sizes */}
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-0.5 sm:mb-1">{farmer.name}</h3>
            <p className={`text-xs sm:text-sm lg:text-base ${themeClasses.subtext} mb-1 sm:mb-2`}>{farmer.farm_type}</p>

            {/* Stats: Points and Quests - Responsive sizes */}
            <div className="flex justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm lg:text-base">
              <div className="flex items-center">
                <Image 
                  src="/icons/Coin.png" 
                  alt="points" 
                  width={16} 
                  height={16} 
                  className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-0.5 sm:mr-1" 
                />
                <span className="font-medium">{farmer.points}</span>
              </div>
              <div className="flex items-center">
                <Image 
                  src="/icons/check.png" 
                  alt="completed quests" 
                  width={16} 
                  height={16} 
                  className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-0.5 sm:mr-1" 
                />
                <span>{farmer.completedQuests}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFarmers;
