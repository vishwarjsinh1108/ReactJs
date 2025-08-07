import React from 'react';
import { dummyTestimonial, assets } from '../../assets/assets'; // ✅ make sure both are imported

const TestimonialsSection = () => {
  return (
    <div className='py-14 px-8 md:px-0'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='md:text-base text-gray-500 mt-3'>
        Hear from our learners as they share their journeys of transformation, success, and how our
        platform has made a difference in their lives.
      </p>

      <div className='grid grid-cols-auto gap-8 mt-14'>
        {dummyTestimonial.map((testimonials, index) => (
          <div
            key={index}
            className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black overflow-hidden'
          >
            <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
              <img
                className='h-12 w-12 rounded-full'
                src={testimonials.image}
                alt={testimonials.name}
              />
              <div>
                <h1 className='text-lg font-medium text-gray-800'>{testimonials.name}</h1>
                <p className='text-gray-800/80'>{testimonials.role}</p>
              </div>
            </div>

            <div className='px-5 pb-7'>
              <div className='flex gap-0.5 pt-5'>
                {[...Array(5)].map((_, i) => (
                  <img
                    className='h-5'
                    key={i}
                    src={i < Math.floor(testimonials.rating) ? assets.star : assets.star_blank}
                    alt='star'
                  />
                ))}
              </div>
              <p className='text-gray-500 mt-5'>{testimonials.feedback}</p>
            </div>
            <a href="#" className='text-blue-500 underline px-5'>Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
