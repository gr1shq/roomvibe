"use client";

import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ItemCard from '../(components)/ItemCard';
import products from '../../data/products.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const FeaturedProducts = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const cardWidth = 300 + 16; // Card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const featuredProducts = products.slice(0, 6); // Limit to 4 cards

  return (
    <section
      ref={ref}
      className="bg-pink-50 text-gray-900 py-16 px-6 sm:px-8 lg:px-12"
      aria-label="Featured Products"
    >
      <motion.div
        className="max-w-6xl mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Simplified Header */}
        <div className="mb-10 text-center">
          <motion.h3
            className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Curated Vibe Picks
          </motion.h3>
          <motion.p
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Handpicked <span className="font-semibold text-pink-600">decor</span> to transform your space with style.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/90 hover:bg-gray-100 text-gray-900 p-2 rounded-full shadow-md z-20 border border-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/90 hover:bg-gray-100 text-gray-900 p-2 rounded-full shadow-md z-20 border border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>

          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-4 py-4 scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={`${product.id}-${index}`}
                  variants={itemVariants}
                  className="w-[260px] sm:w-[300px] flex-shrink-0 snap-start"
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <div className="group relative h-full">
                    {index === 0 && (
                      <span className="absolute top-2 left-2 px-2 py-1 bg-pink-600 text-white text-xs rounded-full z-10">
                        Featured Pick
                      </span>
                    )}
                    <div className="hover:scale-105 transition-transform duration-300 z-10 relative">
                      <ItemCard
                        img={product.image}
                        title={product.name}
                        category={product.category}
                        price={product.price}
                        amazonLink={product.affiliateLinkAmazon}
                        aliexpressLink={product.affiliateLinkAliExpress}
                        temuLink={product.affiliateLinkTemu}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 rounded-md pointer-events-none"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div className="text-center mt-12" variants={itemVariants}>
          <Link
            href="/categories"
            className="inline-block px-8 py-3 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 transition-all duration-300 uppercase tracking-wider"
          >
            Shop All Products
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;