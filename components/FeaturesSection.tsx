import React from 'react'

const FeaturesSection = () => {

      // Features data
      const features = [
        {
          id: 1,
          title: "Satellite Imagery Analysis",
          description: "Access high-resolution satellite imagery with AI-powered analysis to monitor crop health and identify issues early.",
          icon: "satellite"
        },
        {
          id: 2,
          title: "Soil Health Monitoring",
          description: "Upload soil test results and receive personalized recommendations for optimal soil management and fertility.",
          icon: "soil"
        },
        {
          id: 3,
          title: "Yield Prediction",
          description: "Advanced AI algorithms predict your yield based on historical data, weather patterns, and current field conditions.",
          icon: "chart"
        },
        {
          id: 4,
          title: "Weather Integration",
          description: "Smart integration with local weather forecasts to help you plan field operations with confidence.",
          icon: "weather"
        }
      ];
      
  return (
    <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Powerful Features for Modern Farming</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered tools help you make data-driven decisions to optimize your farm operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(feature => (
              <div key={feature.id} className="bg-green-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {feature.icon === "satellite" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    )}
                    {feature.icon === "soil" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    )}
                    {feature.icon === "chart" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    )}
                    {feature.icon === "weather" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default FeaturesSection