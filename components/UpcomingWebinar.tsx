'use client'

import Image from "next/image";
import React from "react";

interface WebinarProps {
  date: number;
  month: string;
  title: string;
  description: string;
  time: string;
  onRegister?: () => void;
  onViewAll?: () => void;
  themeClasses: {
    card: string;
    border: string;
    subtext: string;
  };
}

const UpcomingWebinar: React.FC<WebinarProps> = ({
  date,
  month,
  title,
  description,
  time,
  onRegister,
  onViewAll,
  themeClasses,
}) => {
  return (
    <div className={`${themeClasses.card} p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border ${themeClasses.border} mt-3 sm:mt-4 md:mt-5 lg:mt-6 w-full`}>
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">Upcoming Webinars</h2>
        <button
          onClick={onViewAll}
          className="text-xs sm:text-sm text-[#2E6650] dark:text-green-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md transition-all"
          type="button"
          aria-label="View all webinars"
        >
          View All
        </button>
      </div>
      
      <div
        className={`p-2.5 xs:p-3 sm:p-4 border ${themeClasses.border} rounded-lg flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center`}
      >
        {/* Date Box - Made more responsive with consistent sizing */}
        <div className="w-full xs:w-auto sm:w-1/5 md:w-1/6 lg:w-1/6 mx-auto sm:mx-0">
          <div className="bg-[#E8F5F0] dark:bg-green-900/30 text-[#2E6650] dark:text-green-300 p-2 sm:p-3 rounded-lg text-center min-w-[80px] xs:min-w-[100px] sm:min-w-0 max-w-[120px] xs:max-w-[140px] sm:max-w-full mx-auto sm:mx-0">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold">{date}</div>
            <div className="text-xs sm:text-sm md:text-base">{month}</div>
          </div>
        </div>
        
        {/* Content Section - Better text handling */}
        <div className="w-full sm:w-3/5 md:w-3/5 lg:w-2/3 flex flex-col">
          <h3 className="text-sm sm:text-base md:text-lg font-medium mb-1 sm:mb-2 text-center sm:text-left line-clamp-2">{title}</h3>
          <p className={`text-xs sm:text-sm ${themeClasses.subtext} text-center sm:text-left line-clamp-2 mb-2`}>{description}</p>
          <div className="flex items-center justify-center sm:justify-start">
            <Image 
              src="/icons/clock.png" 
              alt="Time" 
              width={16} 
              height={16} 
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" 
              priority 
            />
            <span className="text-xs sm:text-sm text-gray-500">{time}</span>
          </div>
        </div>
        
        {/* Button Section - Improved spacing and responsiveness */}
        <div className="w-full xs:w-auto sm:w-1/5 md:w-1/5 lg:w-1/6 flex justify-center sm:justify-end mt-3 sm:mt-0 ml-auto sm:ml-0">
          <button
            onClick={onRegister}
            className="bg-[#2E6650] hover:bg-[#235040] text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full xs:w-auto max-w-[200px] sm:max-w-full"
            type="button"
            aria-label="Register for webinar"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingWebinar;