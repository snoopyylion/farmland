'use client';

import React from 'react';

interface FilterSectionProps {
  timeframe: 'weekly' | 'monthly' | 'all-time';
  setTimeframe: (timeframe: 'weekly' | 'monthly' | 'all-time') => void;
  category: 'global' | 'regional' | 'friends';
  setCategory: (category: 'global' | 'regional' | 'friends') => void;
  themeClasses: {
    buttonActive: string;
    buttonInactive: string;
  };
}

const FilterSection: React.FC<FilterSectionProps> = ({
  timeframe,
  setTimeframe,
  category,
  setCategory,
  themeClasses,
}) => {
  return (
    <div className="filter-section mb-6">
      <div className="tabs-container">
        {/* Responsive timeframe buttons with smaller text/padding on mobile */}
        <div className="options flex flex-wrap gap-2 mb-4">
          <button
            className={`px-2 py-1 sm:px-3 sm:py-2 md:px-[10px] md:py-[8px] gap-[8px] rounded-full cursor-pointer font-sora text-xs sm:text-sm border ${
              timeframe === 'weekly' ? themeClasses.buttonActive : themeClasses.buttonInactive
            }`}
            onClick={() => setTimeframe('weekly')}
          >
            This Week
          </button>
          <button
            className={`px-2 py-1 sm:px-3 sm:py-2 md:px-[10px] md:py-[8px] gap-[8px] rounded-full cursor-pointer font-sora text-xs sm:text-sm border ${
              timeframe === 'monthly' ? themeClasses.buttonActive : themeClasses.buttonInactive
            }`}
            onClick={() => setTimeframe('monthly')}
          >
            This Month
          </button>
          <button
            className={`px-2 py-1 sm:px-3 sm:py-2 md:px-[10px] md:py-[8px] gap-[8px] rounded-full cursor-pointer font-sora text-xs sm:text-sm border ${
              timeframe === 'all-time' ? themeClasses.buttonActive : themeClasses.buttonInactive
            }`}
            onClick={() => setTimeframe('all-time')}
          >
            All Time
          </button>
        </div>

        {/* Responsive category buttons with smaller text/padding on mobile */}
        <div className="options flex flex-wrap gap-2">
          <button
            className={`px-2 py-1 sm:px-3 sm:py-2 md:px-[10px] md:py-[8px] gap-[8px] rounded-full cursor-pointer font-sora text-xs sm:text-sm border ${
              category === 'global' ? themeClasses.buttonActive : themeClasses.buttonInactive
            }`}
            onClick={() => setCategory('global')}
          >
            Global
          </button>
          <button
            className={`px-2 py-1 sm:px-3 sm:py-2 md:px-[10px] md:py-[8px] gap-[8px] rounded-full cursor-pointer font-sora text-xs sm:text-sm border ${
              category === 'regional' ? themeClasses.buttonActive : themeClasses.buttonInactive
            }`}
            onClick={() => setCategory('regional')}
          >
            Regional
          </button>
          <button
            className={`px-2 py-1 sm:px-3 sm:py-2 md:px-[10px] md:py-[8px] gap-[8px] rounded-full cursor-pointer font-sora text-xs sm:text-sm border ${
              category === 'friends' ? themeClasses.buttonActive : themeClasses.buttonInactive
            }`}
            onClick={() => setCategory('friends')}
          >
            Friends
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
