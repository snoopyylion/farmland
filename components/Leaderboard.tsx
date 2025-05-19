'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar?: string;
  region: string;
  farm_type: string;
  streak: number;
  completedQuests: number;
  points: number;
}

type LeaderboardProps = {
  leaderboardData: LeaderboardEntry[];
  currentUser?: LeaderboardEntry;
  themeClasses: {
    container: string;
    card: string;
    cardHeader: string;
    lightBg: string;
    tableBg: string;
    tableHeader: string;
    tableRow: string;
    header: string;
    subtext: string;
    lightText: string;
    border: string;
    buttonActive: string;
    buttonInactive: string;
    highlight: string;
    userHighlight: string;
  };
  darkMode: boolean;
};

const Leaderboard: React.FC<LeaderboardProps> = ({
  leaderboardData,
  currentUser,
  darkMode,
  themeClasses,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = leaderboardData
    .filter((entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 8);

  return (
    <div
      className={`leaderboard-table ${themeClasses.card} rounded-lg border ${themeClasses.border} overflow-hidden`}
    >
      <div
        className={`table-header p-2 sm:p-3 lg:p-4 border-b ${themeClasses.cardHeader} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0`}
      >
        <h2 className="text-base sm:text-lg font-semibold">Leaderboard Rankings</h2>
        <div className="search-input relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full sm:w-auto pl-6 sm:pl-8 pr-2 sm:pr-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm ${
              darkMode
                ? 'bg-black/80 text-white border-gray-600'
                : 'bg-gray-100 text-gray-900 border-gray-200'
            } border`}
          />
          <div className="absolute left-1.5 sm:left-2 top-1.5 sm:top-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className={themeClasses.tableHeader}>
            <tr>
              <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium">Rank</th>
              <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium">Farmer</th>
              <th className="hidden sm:table-cell px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium">Region</th>
              <th className="hidden md:table-cell px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium">Farm Type</th>
              <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">Streak</th>
              <th className="hidden sm:table-cell px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">Quests</th>
              <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-medium">Points</th>
            </tr>
          </thead>
          <tbody className={themeClasses.tableBg}>
            {filteredData.map((entry) => (
              <tr
                key={entry.id}
                className={`border-b ${themeClasses.tableRow} ${
                  entry.id === 'current' ? themeClasses.userHighlight : ''
                }`}
              >
                <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left">
                  <div className="text-xs sm:text-sm font-medium">{entry.rank}</div>
                </td>
                <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 relative">
                      <Image
                        src={entry.avatar || '/icons/usericon.png'}
                        alt={entry.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <div className="ml-2 sm:ml-3">
                      <div
                        className={`text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-[120px] md:max-w-full ${
                          entry.id === 'current'
                            ? 'font-semibold text-[#2E6650]'
                            : ''
                        }`}
                      >
                        {entry.name}
                        {entry.id === 'current' && ' (You)'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
                  <div className="text-xs sm:text-sm truncate max-w-[60px] md:max-w-full">{entry.region}</div>
                </td>
                <td className="hidden md:table-cell px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
                  <div className="text-xs sm:text-sm truncate max-w-[80px] lg:max-w-full">{entry.farm_type}</div>
                </td>
                <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right">
                  <div className="text-xs sm:text-sm flex items-center justify-end">
                    <Image
                      src="/icons/Streak_On.png"
                      alt="streak"
                      width={14}
                      height={14}
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 mr-0.5 sm:mr-1"
                    />
                    {entry.streak}
                  </div>
                </td>
                <td className="hidden sm:table-cell px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right">
                  <div className="text-xs sm:text-sm">{entry.completedQuests}</div>
                </td>
                <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right">
                  <div className="text-xs sm:text-sm font-medium flex items-center justify-end">
                    <Image
                      src="/icons/Coin.png"
                      alt="points"
                      width={14}
                      height={14}
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 mr-0.5 sm:mr-1"
                    />
                    {entry.points}
                  </div>
                </td>
              </tr>
            ))}

            {currentUser && currentUser.rank > 8 && (
              <>
                <tr className={`border-b ${themeClasses.tableRow}`}>
                  <td colSpan={7} className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-center">
                    <div className="text-xs sm:text-sm">. . .</div>
                  </td>
                </tr>
                <tr
                  className={`border-b ${themeClasses.tableRow} ${themeClasses.userHighlight}`}
                >
                  <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left">
                    <div className="text-xs sm:text-sm font-medium">{currentUser.rank}</div>
                  </td>
                  <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8">
                        <Image
                          src={currentUser.avatar || '/icons/user.png'}
                          alt={currentUser.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div className="ml-2 sm:ml-3">
                        <div className="text-xs sm:text-sm font-semibold text-[#2E6650] truncate max-w-[80px] sm:max-w-[120px] md:max-w-full">
                          {currentUser.name} (You)
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
                    <div className="text-xs sm:text-sm truncate max-w-[60px] md:max-w-full">{currentUser.region}</div>
                  </td>
                  <td className="hidden md:table-cell px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
                    <div className="text-xs sm:text-sm truncate max-w-[80px] lg:max-w-full">{currentUser.farm_type}</div>
                  </td>
                  <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right">
                    <div className="text-xs sm:text-sm flex items-center justify-end">
                      <Image
                        src="/icons/Streak_On.png"
                        alt="streak"
                        width={14}
                        height={14}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 mr-0.5 sm:mr-1"
                      />
                      {currentUser.streak}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right">
                    <div className="text-xs sm:text-sm">{currentUser.completedQuests}</div>
                  </td>
                  <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right">
                    <div className="text-xs sm:text-sm font-medium flex items-center justify-end">
                      <Image
                        src="/icons/Coin.png"
                        alt="points"
                        width={14}
                        height={14}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 mr-0.5 sm:mr-1"
                      />
                      {currentUser.points}
                    </div>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;