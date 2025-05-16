import Image from "next/image";

interface RewardCardProps {
  place: string;
  iconBg: string;
  cardBg: string;
  badge: string;
  rewards: string[];
  themeClasses: {
    border: string;
  };
}

export default function RewardCard({
  place,
  iconBg,
  cardBg,
  rewards,
  themeClasses,
}: RewardCardProps) {
  return (
    <div className={`reward-card p-2.5 sm:p-3 lg:p-4 rounded-lg border ${themeClasses.border} ${cardBg}`}>
      <div className="flex items-center mb-2 sm:mb-3">
        <div className={`mr-2 sm:mr-3 ${iconBg} p-1.5 sm:p-2 rounded-full`}>
          <Image 
            src="/icons/Coin.png" 
            alt={`${place} Icon`} 
            width={24} 
            height={24} 
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          />
        </div>
        <h3 className="font-semibold text-sm sm:text-base">{place}</h3>
      </div>
      <ul className="text-xs sm:text-sm space-y-1.5 sm:space-y-2">
        {rewards.map((reward, index) => (
          <li key={index} className="flex items-start sm:items-center">
            <svg
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-green-500 mr-1.5 sm:mr-2 mt-0.5 sm:mt-0 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="leading-tight">{reward}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}