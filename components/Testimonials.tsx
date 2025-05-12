import Image from 'next/image';
import React from 'react'

const Testimonials = () => {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "FarmLand AI increased our crop yield by 30% in just one season. The analysis tools are game-changing.",
      author: "Sarah Thompson",
      role: "Orchard Owner, California",
      image: "/img/testimonial1.jpg"
    },
    {
      id: 2,
      quote: "The soil analysis feature saved us thousands on unnecessary fertilizers. Truly revolutionary technology.",
      author: "Michael Rodriguez",
      role: "Vineyard Manager, Oregon",
      image: "/img/testimonial2.jpg"
    },
    {
      id: 3,
      quote: "Easy to use interface with powerful insights. Worth every penny for our family farm.",
      author: "Emma Johnson",
      role: "Dairy Farmer, Wisconsin",
      image: "/img/testimonial3.jpg"
    }
  ];
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">What Farmers Are Saying</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied farmers who have transformed their operations with FarmLand AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-green-50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">&quot;{testimonial.quote}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials