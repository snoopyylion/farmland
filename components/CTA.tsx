import Link from 'next/link'
import React from 'react'

const CTA = () => {
    return (
        <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Farm?</h2>
              <p className="text-lg text-green-100 mb-8 max-w-xl">
                Join thousands of forward-thinking farmers who are using FarmLand AI to increase yields, reduce costs, and farm more sustainably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/signup"
                  className="px-6 py-3 bg-white text-green-600 rounded-md hover:bg-green-50 transition text-lg font-medium shadow-lg"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/demo"
                  className="px-6 py-3 border-2 border-white text-white rounded-md hover:bg-green-700 transition text-lg font-medium"
                >
                  Request Demo
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h3 className="text-green-800 text-xl font-semibold mb-4">Get Started Today</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="farm-size" className="block text-gray-700 text-sm font-medium mb-1">Farm Size (acres)</label>
                    <select 
                      id="farm-size" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                    >
                      <option value="">Select farm size</option>
                      <option value="small">Under 100 acres</option>
                      <option value="medium">100-500 acres</option>
                      <option value="large">500-2000 acres</option>
                      <option value="enterprise">Over 2000 acres</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition font-medium"
                  >
                    Get Started
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default CTA