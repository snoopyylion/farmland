'use client'

import Image from 'next/image'
import React from 'react'

interface HeaderProps {
  title: string;
  streakCount?: number;
  coinCount?: string | number;
  notificationCount?: number;
  userImageSrc?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  streakCount = 3,
  coinCount = '2.1k',
  notificationCount = 3,
  userImageSrc = '/icons/user.png'
}) => {
  return (
    <header className="header flex justify-between items-center mb-4 sm:mb-6 px-2 sm:px-4 py-2 sticky top-0 z-10 bg-inherit backdrop-blur-sm z-30">
      <div className="header-text w-auto font-sora text-xs sm:text-base md:text-lg lg:text-[20px] leading-[100%] font-semibold">
        {title}
      </div>

      {/* Combined menu for both desktop and mobile */}
      <div className="ranking flex items-center gap-2 sm:gap-[24px]">
        {/* Streak and points display */}
        <div className="thundercoin flex items-center gap-2 sm:gap-4">
          <div className="thunder3 flex items-center gap-1 sm:gap-2">
            <div className="img">
              <Image src="/icons/Streak_On.png" alt="streak" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div className="number font-semibold leading-[100%] text-xs sm:text-sm md:text-lg lg:text-[20px] font-sora">
              {streakCount}
            </div>
          </div>

          <div className="coin-num flex items-center gap-1 sm:gap-2">
            <div className="img">
              <Image src="/icons/Coin.png" alt="coin" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div className="number font-semibold leading-[100%] text-xs sm:text-sm md:text-lg lg:text-[20px] font-sora">
              {coinCount}
            </div>
          </div>
        </div>

        {/* Notification and user profile */}
        <div className="alertuser flex items-center gap-2 sm:gap-4">
          <div className="alert flex items-center relative">
            <div className="img">
              <Image src="/icons/notification.png" alt="notification" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            {notificationCount > 0 && (
              <div className="number absolute -top-[2px] -right-[5px] bg-[#920E0E] text-white text-[6px] sm:text-[8px] font-medium leading-[120%] rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center font-sora">
                {notificationCount}
              </div>
            )}
          </div>

          <div className="user">
            <Image src={userImageSrc} alt="user" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header