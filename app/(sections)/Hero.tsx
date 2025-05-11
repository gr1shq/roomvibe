// app/(components)/HeroSection.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Define carousel images
  const images = [
    {
      src: '/blog-images/girl-room.webp',
      alt: 'Vibrant gaming setup with RGB LED lights and desk accessories',
    },
    {
      src: '/blog-images/small-space-decor.jpg',
      alt: 'Cozy bedroom with soft decor and warm LED lighting',
    },
    {
      src: '/blog-images/teen-bedroom.jpg',
      alt: 'Minimalist desk setup with sleek decor and LED monitor light',
    },
  ];

  // Set up carousel interval
  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] w-full bg-white flex items-center justify-center pt-16 sm:pt-20">
      {/* Content Container */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="max-w-lg text-center md:text-left space-y-6 mt-8 sm:mt-0">
          {/* Main Heading */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900 transition-opacity duration-500 ${
              isMounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Create Your Dream Room
          </h1>

          {/* Subheading */}
          <p
            className={`text-base sm:text-lg md:text-xl text-gray-600 font-light transition-opacity duration-500 ${
              isMounted ? 'opacity-100' : 'opacity-0'
            } delay-100`}
          >
            Shop curated LED lights, cozy decor, and minimal setups to elevate your space.
          </p>

          {/* CTA Button */}
          <Link
            href="/categories"
            className={`inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-pink-600 text-white text-base sm:text-lg font-semibold hover:bg-pink-500 transition-all duration-300 ${
              isMounted ? 'opacity-100' : 'opacity-0'
            } delay-200`}
          >
            Explore Products
          </Link>
        </div>

        {/* Hero Image Carousel */}
        <div className="relative w-full md:w-1/2 h-64 sm:h-80 md:h-96 mt-6 md:mt-0">
          {images.map((img, index) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              className={`object-cover rounded-lg shadow-sm transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              } absolute`}
              quality={85}
              priority={index === 0} // Priority for first image only
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-500 ${
          isMounted ? 'opacity-100' : 'opacity-0'
        } delay-300`}
      >
        <svg
          className="w-6 h-6 text-gray-600"
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
    </section>
  );
};

export default HeroSection;