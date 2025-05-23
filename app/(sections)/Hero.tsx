'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Define carousel images with links
  const images = [
    {
      src: '/blog-images/girl-room.webp',
      alt: 'Vibrant gaming setup with RGB LED lights and desk accessories',
      href: 'https://roomvibe.vercel.app/vibefeed/20-budget-bedroom-decor-small-spaces-girls-teens-2025', // Fixed URL typo
    },
    {
      src: '/blog-images/small-space-decor.jpg',
      alt: 'Cozy bedroom with soft decor and warm LED lighting',
      href: '/categories/led-paradise',
    },
    {
      src: '/blog-images/teen-bedroom.jpg',
      alt: 'Minimalist desk setup with sleek decor and LED monitor light',
      href: '/vibefeed',
    },
  ];

  // Set up carousel interval
  useEffect(() => {
    setIsMounted(true);
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  return (
    <section
      className="relative min-h-[70vh] sm:min-h-[70vh] w-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center pt-16 sm:pt-20 pb-8"
      role="region"
      aria-label="Hero carousel"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-700 opacity-50"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative z-10">
        {/* Text Content */}
        <div className="max-w-lg text-center md:text-left space-y-5 md:space-y-6 mt-8 sm:mt-0 order-2 md:order-1">
          {/* Main Heading */}
          <h1
            className={`text-2xl sm:text-4xl md:text-5xl font-bold leading-tight text-white transition-opacity duration-500 ${
              isMounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Create Your Dream Setup
          </h1>

          {/* Subheading */}
          <p
            className={`text-sm sm:text-lg md:text-xl text-white font-light transition-opacity duration-500 ${
              isMounted ? 'opacity-100' : 'opacity-0'
            } delay-100`}
          >
            Discover LED lights, gaming gear, and cozy decor to elevate your space.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
            <Link
              href="/categories"
              className={`inline-block px-5 sm:px-8 py-2 sm:py-3 rounded-full bg-white text-pink-600 text-sm sm:text-lg font-semibold hover:bg-pink-100 hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-white focus:outline-none ${
                isMounted ? 'opacity-100' : 'opacity-0'
              } delay-200`}
              aria-label="Explore product categories"
            >
              Explore Categories
            </Link>
            <Link
              href="/products"
              className={`inline-block px-5 sm:px-8 py-2 sm:py-3 rounded-full bg-transparent border-2 border-white text-white text-sm sm:text-lg font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300 focus:ring-2 focus:ring-white focus:outline-none ${
                isMounted ? 'opacity-100' : 'opacity-0'
              } delay-100`}
              aria-label="Shop deals under $25"
            >
              Shop Deals
            </Link>
          </div>
        </div>

        {/* Hero Image Carousel */}
        <div
          className="relative w-full max-w-[90vw] sm:max-w-[70vw] md:w-1/2 h-56 sm:h-80 md:h-96 order-1 md:order-2 md:mt-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div aria-live="polite" className="sr-only">
            Carousel image {currentImage + 1} of {images.length}: {images[currentImage].alt}
          </div>
          {images.map((img, index) => (
            <Link key={img.src} href={img.href} aria-label={`View ${img.alt}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={`object-cover rounded-lg shadow-sm transition-opacity duration-1000 ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                } absolute`}
                quality={85}
                priority={index === 0}
                loading={index === 0 ? undefined : 'lazy'}
              />
            </Link>
          ))}
          {/* Carousel Dots */}
          <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full transition-all duration-300 focus:ring-2 focus:ring-white focus:outline-none ${
                  index === currentImage ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to carousel image ${index + 1}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setCurrentImage(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-500 hidden md:block ${
          isMounted ? 'opacity-100' : 'opacity-0'
        } delay-300`}
      >
        <svg
          className="w-5 md:w-6 h-5 md:h-6 text-white"
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