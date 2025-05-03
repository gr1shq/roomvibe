// app/(sections)/Slide.tsx
'use client';

import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ItemCard from '../(components)/ItemCard';
import products from '../../data/products.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slide = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll left/right by one card width
  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const cardWidth = 320 + 40; // Card width (320px) + gap (40px)
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="min-h-[60vh] bg-gradient-to-b from-[#111111] to-[#1a102a] text-[#e0d7ff] py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
      aria-label="Featured Products"
    >
      {/* Subtle gradient fades on sides */}
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Heading */}
        <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Vibe Picks You’ll Love
          </h2>
          <p className="text-[#b8b5ff] max-w-2xl mx-auto">
            Soft lights, cool gear, and everything in between.
          </p>
        </motion.div>

        {/* Scrollable Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#2a1a4a]/80 hover:bg-[#d367e1]/80 text-[#f5f5f5] p-3 rounded-full z-20 hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#2a1a4a]/80 hover:bg-[#d367e1]/80 text-[#f5f5f5] p-3 rounded-full z-20 hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Container */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-8 md:gap-10 py-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            {products.map((product, index) => (
              <motion.div
                key={`${product.id}-${index}`}
                variants={itemVariants}
                className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start hover:scale-[1.02] transition-transform duration-300"
                itemScope
                itemType="https://schema.org/Product"
              >
                <ItemCard
                  img={product.image}
                  title={product.name}
                  category={product.category}
                  price={product.price}
                  amazonLink={product.affiliateLinkAmazon}
                  aliexpressLink={product.affiliateLinkAliExpress}
                  temuLink={product.affiliateLinkTemu}
                />
                {/* <meta itemProp="name" content={product.name} />
                <meta itemProp="image" content={product.image} />
                <meta itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="price" content={product.price.toString()} />
                  <meta itemProp="priceCurrency" content="USD" />
                </meta> */}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Slide;