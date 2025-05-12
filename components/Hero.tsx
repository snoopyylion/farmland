import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6 leading-tight">
                Smart Farm Management with <span className="text-green-600">AI Analysis</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto lg:mx-0">
                Upload your farm data, get AI-powered insights, and make better farming decisions for improved yield, sustainability, and profitability.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  href="/login"
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-md hover:bg-green-50 transition text-lg font-medium"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 -left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <Image 
                    src="/img/hero.png" 
                    alt="Farm AI Dashboard" 
                    width={600} 
                    height={400}
                    className="rounded-xl shadow-2xl border border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero