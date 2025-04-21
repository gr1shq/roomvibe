"use client";
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ItemCard from "../(components)/ItemCard";
import products from "../../data/products.json";

const Slide = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Double the products for seamless looping
  const duplicatedProducts = [...products, ...products];

  // Auto-scroll effect with variable speed
  useEffect(() => {
    if (!containerRef.current || !inView) return;

    const container = containerRef.current;
    const containerWidth = container.scrollWidth / 2;
    let animationFrame: number;
    let speed = 0.3; // pixels per frame - slower for elegance

    const animate = () => {
      if (!isHovered) {
        setScrollPosition(prev => {
          // Smooth reset when reaching the duplicate point
          if (prev >= containerWidth) return 0;
          return prev + speed;
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, isHovered]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] // Elegant ease-out
      }
    }
  };

  return (
    <div 
      ref={ref}
      className="min-h-[60vh] bg-gradient-to-b from-[#111111] to-[#1a102a] text-[#e0d7ff] py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative "
    >
      {/* Subtle gradient fade on sides */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Enhanced Heading */}
        <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Vibe Picks You will Love
          </h1>
          <p className="text-[#b8b5ff] max-w-2xl mx-auto">
          Soft lights, cool gear, and everything in between.
          </p>
        </motion.div>

        {/* Infinite Carousel */}
        <motion.div 
          className="relative w-full overflow-x-hidden overflow-y-hidden py-2"
          variants={containerVariants}
        >
          <div
            ref={containerRef}
            className="flex gap-8 md:gap-10 w-max"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {duplicatedProducts.map((product, index) => (
              <motion.div
                key={`${index}-${product.id}`}
                variants={itemVariants}
                className="w-[280px] sm:w-[320px] flex-shrink-0 hover:scale-[1.02] transition-transform duration-300"
              >
                <ItemCard 
                  img={product.image} 
                  title={product.name} 
                  category={product.category} 
                  price={product.price}  
                  button="See on Amazon"
                  button2="See on Temu"
                  link={product.affiliateLinkAmazon}
                  link2={product.affiliateLinkTemu}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide;