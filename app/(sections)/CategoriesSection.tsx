"use client";

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import CategoryCard from "../(components)/CategoryCard";
import categories from '../../data/categories.json';
import Link from 'next/link';

const CategoriesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      ref={ref}
      className="bg-[#15122B] min-h-[40vh] flex flex-col py-12 md:py-20 px-4"
    >
      <motion.div
        className="max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h1 
          className="text-[#F0EFFF] text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12"
          variants={itemVariants}
        >
          Explore by Vibe
        </motion.h1>

        <motion.div 
          className="flex flex-wrap justify-center gap-6 md:gap-10"
          variants={containerVariants}
        >
          {categories.slice(0,5).map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
            >
              <CategoryCard img={category.image} name={category.name} slug={category.slug} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className="flex justify-center mt-15">
        <Link href="/categories">
      <button className="py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
          Explore All
        </button>    
        </Link>
      </div>
        </div>
  );
};

export default CategoriesSection;