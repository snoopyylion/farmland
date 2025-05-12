'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const StickerHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/img/logo.png"
              alt="FarmLand Logo"
              width={80}
              height={50}
              priority
            />
            <span className="ml-2 text-xl font-semibold text-green-800 hidden sm:inline">
              FarmLand AI
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-green-800 hover:text-green-600 transition">
              Features
            </Link>
            <Link href="#testimonials" className="text-green-800 hover:text-green-600 transition">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-green-800 hover:text-green-600 transition">
              Pricing
            </Link>
            <Link href="#contact" className="text-green-800 hover:text-green-600 transition">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Sign In
            </Link>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="block md:hidden text-green-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          showSidebar ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setShowSidebar(false)}
            className="text-green-800"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col space-y-4 px-6">
          <Link href="#features" onClick={() => setShowSidebar(false)} className="text-green-800">
            Features
          </Link>
          <Link href="#testimonials" onClick={() => setShowSidebar(false)} className="text-green-800">
            Testimonials
          </Link>
          <Link href="#pricing" onClick={() => setShowSidebar(false)} className="text-green-800">
            Pricing
          </Link>
          <Link href="#contact" onClick={() => setShowSidebar(false)} className="text-green-800">
            Contact
          </Link>
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
};

export default StickerHeader;
