'use client'

import Image from 'next/image'
import React, { useState } from 'react'

// Define types for leaderboard data
type LeaderboardEntry = {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  completedQuests: number;
  region: string;
  farm_type: string;
};

type LeaderboardTimeframe = 'weekly' | 'monthly' | 'all-time';
type LeaderboardCategory = 'global' | 'regional' | 'friends';

// Reusable filter button component
const FilterButton = ({ 
  label, 
  isActive, 
  onClick, 
  themeClasses 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void; 
  themeClasses: any 
}) => (
  <button
    className={`px-[10px] py-[8px] gap-[8px] rounded-full cursor-pointer font-sora border text-sm sm:text-base
      ${isActive ? themeClasses.buttonActive : themeClasses.buttonInactive}`}
    onClick={onClick}
  >
    {label}
  </button>
);
