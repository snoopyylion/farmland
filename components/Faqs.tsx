import React from 'react'

const Faqs = () => {
  return (
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about FarmLand AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-green-50 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-2">How accurate are the AI predictions?</h3>
              <p className="text-gray-600">Our AI models are trained on millions of data points and achieve an average prediction accuracy of 85-95% for yield forecasting, depending on crop type and available historical data.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Do I need special equipment?</h3>
              <p className="text-gray-600">No special equipment is required. Our platform works with data you already have or can easily collect. For more advanced features, simple soil testing kits may be beneficial.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Can I integrate with my existing farm management software?</h3>
              <p className="text-gray-600">Yes, FarmLand AI integrates with most popular farm management software through our API. We also support direct CSV imports if you're using other systems.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-2">How often is satellite imagery updated?</h3>
              <p className="text-gray-600">Satellite imagery updates depend on your plan - Starter plans receive weekly updates, Professional plans receive updates every 2-3 days, and Enterprise plans receive daily updates when weather permits.</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Faqs