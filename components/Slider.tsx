'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

// This type matches your SlideData type from the Dashboard
export interface Slide {
    tag: string;
    title: string;
    text: string;
    points: string;
    image: string;
}

interface SliderProps {
    slides: Slide[];
    interval?: number; // in milliseconds
}

const Slider: React.FC<SliderProps> = ({ slides, interval = 5000 }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Effect to detect system color scheme
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check if user prefers dark mode
            const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(darkModePreference);

            // Listen for changes in color scheme preference
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent): void => setIsDarkMode(e.matches);
            mediaQuery.addEventListener('change', handleChange);

            // Cleanup function
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, interval);

        return () => clearInterval(timer);
    }, [slides.length, interval]);

    const handleSlideChange = (index: number) => {
        setCurrentSlide(index);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // Dynamic theme classes based on dark/light mode
    const themeClasses = {
        lightText: isDarkMode ? 'text-gray-400' : 'text-gray-500',
        subtext: isDarkMode ? 'text-gray-300' : 'text-gray-600',
        card: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    };

    return (
        <div className="w-full relative">
            {/* Slide container - Improved height responsiveness for tablet breakpoints */}
            <div className="relative min-h-[360px] xs:min-h-[320px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[340px] mb-2">
                {slides.map((slide, index) => {
                    const isActive = index === currentSlide;
                    const isNext = index === (currentSlide + 1) % slides.length;
                    const isPrev = index === (currentSlide - 1 + slides.length) % slides.length;

                    return (
                        <div
                            key={index}
                            className={clsx(
                                'absolute left-0 w-full px-2 sm:px-3 md:px-4 transition-all duration-700 ease-in-out',
                                {
                                    'top-0 z-20 opacity-100 pointer-events-auto': isActive,
                                    'top-[15px] z-10 opacity-70 pointer-events-none scale-[0.97]': isNext,
                                    'top-[-13px] z-10 opacity-70 pointer-events-none scale-[0.97]': isPrev,
                                    hidden: !isActive && !isNext && !isPrev,
                                }
                            )}
                        >
                            <div className={`${themeClasses.card} border-[1px] rounded-lg overflow-hidden w-full max-w-4xl mx-auto shadow-sm`}>
                                <div className="p-3 sm:p-3.5 md:p-4">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-center">
                                        {/* Slider Image - Improved responsive sizing for tablet screens */}
                                        <div className="slider-image flex-shrink-0 w-full sm:w-auto flex justify-center sm:justify-start">
                                            <Image
                                                src={slide.image}
                                                width={189}
                                                height={195}
                                                alt="slider"
                                                className="rounded-[8px] object-cover w-[120px] h-[120px] xs:w-[150px] xs:h-[150px] sm:w-[160px] sm:h-[165px] md:w-[175px] md:h-[180px] lg:w-[189px] lg:h-[195px]"
                                            />
                                        </div>

                                        {/* Slider Content - Improved spacing and sizing for tablet screens */}
                                        <div className="slider-right ml-0 sm:ml-4 md:ml-5 lg:ml-6 mt-3 sm:mt-0 flex flex-col space-y-1 sm:space-y-2 md:space-y-2.5 lg:space-y-3 w-full text-center sm:text-left">
                                            <div className="slider-tag">
                                                <p className={`text-[10px] xs:text-[11px] sm:text-[11px] md:text-[12px] leading-[145%] font-medium ${themeClasses.lightText} font-sora`}>
                                                    {slide.tag}
                                                </p>
                                            </div>
                                            <div className="slider-main">
                                                <h3 className="text-[16px] xs:text-[18px] sm:text-[18px] md:text-[19px] lg:text-[20px] leading-[145%] font-semibold font-sora">
                                                    {slide.title}
                                                </h3>
                                            </div>
                                            <div className="slider-text">
                                                <p className={`text-[10px] xs:text-[11px] sm:text-[11px] md:text-[12px] leading-[150%] font-light ${themeClasses.subtext} font-sora max-w-full sm:max-w-[95%] md:max-w-[90%]`}>
                                                    {slide.text}
                                                </p>
                                            </div>
                                            <div className="slider-button">
                                                <button className="button bg-[#EBFDEB] leading-[145%] text-green-800 p-[5px] xs:p-[6px] sm:p-[6px] md:p-[7px] lg:p-[8px] gap-[8px] rounded-full font-sora font-light text-[10px] xs:text-[11px] sm:text-[11px] md:text-[12px] inline-block">
                                                    {slide.points}
                                                </button>
                                            </div>
                                            <div className="slider-big-button flex justify-center sm:justify-start">
                                                <div className="bg-[#2E6650] text-white p-[6px] xs:p-[7px] sm:p-[7px] md:p-[8px] gap-[8px] w-[80px] xs:w-[85px] sm:w-[90px] md:w-[95px] lg:w-[99px] h-[28px] xs:h-[29px] sm:h-[30px] md:h-[31px] lg:h-[33px] rounded-full text-center cursor-pointer hover:bg-green-700 transition-colors font-normal text-[10px] xs:text-[10.5px] sm:text-[11px] md:text-[11.5px] lg:text-[12px] leading-[145%] font-sora flex items-center justify-center">
                                                    <p>Start quest</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <div className="flex items-center space-x-0 bg-white/80 dark:bg-gray-800/80 px-2.5 sm:px-3 md:px-3 py-1">
                    <div>
                        <button
                            onClick={handlePrevSlide}
                            aria-label="Previous slide"
                            className="flex items-center justify-center w-7 sm:w-7 md:w-8 h-8"
                        >
                            <Image src="/icons/back.png" alt="Previous" width={32} height={24} className="w-4 h-4 sm:w-4.5 md:w-5 sm:h-4.5 md:h-5" />
                        </button>
                    </div>
                    <div className="flex items-center mx-1 sm:mx-1.5 md:mx-2">
                        {slides.map((_, index) => (
                            <React.Fragment key={index}>
                                <button
                                    onClick={() => handleSlideChange(index)}
                                    className={clsx(
                                        'w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300',
                                        index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
                                    )}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                                {index < slides.length - 1 && <span className="w-[4px] sm:w-[5px] md:w-[6px]"></span>}
                            </React.Fragment>
                        ))}
                    </div>
                    <div>
                        <button
                            onClick={handleNextSlide}
                            aria-label="Next slide"
                            className="flex items-center justify-center w-7 sm:w-7 md:w-8 h-8"
                        >
                            <Image src="/icons/forward.png" alt="Next" width={32} height={24} className="w-4 h-4 sm:w-4.5 md:w-5 sm:h-4.5 md:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider;