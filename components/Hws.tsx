import React from 'react'

const Hws = () => {
  return (
    <section className="py-20 bg-green-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">How FarmLand AI Works</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  A simple three-step process to transform your farming practices.
                </p>
              </div>
    
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg md:w-1/3">
                  <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">1</div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Upload Your Data</h3>
                  <p className="text-gray-600">Connect your existing farm management systems or upload data manually to get started.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg md:w-1/3">
                  <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">2</div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">AI Analysis</h3>
                  <p className="text-gray-600">Our advanced algorithms analyze your data to generate personalized insights and recommendations.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg md:w-1/3">
                  <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">3</div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Take Action</h3>
                  <p className="text-gray-600">Implement data-driven decisions with confidence, track results, and continuously improve.</p>
                </div>
              </div>
            </div>
          </section>
  )
}

export default Hws