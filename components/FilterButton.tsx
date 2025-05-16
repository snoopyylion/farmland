'use client';

type FilterButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  themeClasses: {
    buttonActive: string;
    buttonInactive: string;
  };
};

const FilterButton = ({
  label,
  isActive,
  onClick,
  themeClasses
}: FilterButtonProps) => (
  <button
    className={`px-[10px] py-[8px] gap-[8px] rounded-full cursor-pointer font-sora border text-sm sm:text-base
      ${isActive ? themeClasses.buttonActive : themeClasses.buttonInactive}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default FilterButton;
