"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <Image
          src="/img/gaming-room-bg.jpeg"
          alt="Aesthetic room with RGB lights, plants, and decor"
          fill
          className="object-cover object-center blur-[2px]"
          quality={100}
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, #111111 40%, transparent)'
        }}
      />

      {/* Content with Fade-In Animations */}
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
        style={{ color: '#FFFFFF' }}
      >
        <div className="max-w-4xl space-y-6">
          {/* Main Heading */}
          <h1 
            className={`text-4xl md:text-6xl font-extrabold leading-tight transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
            style={{
              textShadow: '0 0 10px rgba(155, 93, 229, 0.7)',
              transitionDelay: '200ms'
            }}
          >
            Bring Vibe to Your Space
            {/* Create Your Dream Room with Aesthetic Decor */}
          </h1>
          
          {/* Subheading */}
          <p 
            className={`text-xl md:text-2xl font-light max-w-2xl mx-auto transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Curated RGB Lights, Cozy Essentials, and More from Amazon, Temu, and AliExpress
          </p>

          {/* CTA Button */}
          <button 
            className={`transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <Link 
              href="/categories" 
              className="inline-block mt-8 px-8 py-3 rounded-full text-lg font-semibold text-white hover:shadow-[0_0_15px_#9B5DE5aa] transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(to right, #9B5DE5, #F15BB5)'
              }}
            >
              Explore Now
            </Link>
          </button>
        </div>

        {/* Scroll Down Indicator - appears last */}
        <div 
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          <svg 
            className="w-8 h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;