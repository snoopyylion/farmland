"use client";

import RewardCard from "./RewardCard";

interface LeaderboardRewardsProps {
  themeClasses: {
    header: string;
    card: string;
    border: string;
    subtext: string;
  };
}

export default function LeaderboardRewards({ themeClasses }: LeaderboardRewardsProps) {
  return (
    <div className="rewards-section mt-4 sm:mt-6 lg:mt-8 mb-4 sm:mb-5 lg:mb-6 px-2 sm:px-4 lg:px-6">
      <h2 className={`text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 ${themeClasses.header}`}>
        Leaderboard Rewards
      </h2>
      <div className={`${themeClasses.card} p-3 sm:p-4 rounded-lg border ${themeClasses.border}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <RewardCard
            place="1st Place"
            iconBg="bg-yellow-100"
            cardBg="bg-yellow-50 dark:bg-black/80"
            badge="Champion Farmer"
            rewards={[
              "500 bonus points",
              'Exclusive "Champion Farmer" badge',
              "Feature on community spotlight",
            ]}
            themeClasses={themeClasses}
          />
          
          <RewardCard
            place="2nd Place"
            iconBg="bg-gray-200"
            cardBg="bg-gray-50 dark:bg-black/80"
            badge="Silver Producer"
            rewards={[
              "300 bonus points",
              '"Silver Producer" badge',
              "Early access to new features",
            ]}
            themeClasses={themeClasses}
          />
          
          <RewardCard
            place="3rd Place"
            iconBg="bg-amber-100"
            cardBg="bg-amber-50 dark:bg-black/80"
            badge="Bronze Cultivator"
            rewards={[
              "150 bonus points",
              '"Bronze Cultivator" badge',
              "Exclusive digital resources",
            ]}
            themeClasses={themeClasses}
          />
        </div>
        
        <div className="mt-4 sm:mt-5 lg:mt-6 text-center">
          <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${themeClasses.subtext}`}>
            Top 10 farmers each week receive special achievement badges and bonus points!
          </p>
          <button className="bg-[#2E6650] hover:bg-[#1D5540] text-white font-medium text-xs sm:text-sm py-1.5 sm:py-2 px-4 sm:px-6 rounded-lg">
            View All Rewards
          </button>
        </div>
      </div>
    </div>
  );
}
