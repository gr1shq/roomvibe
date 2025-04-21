"use client";

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const WhyRoomVibe = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      className="bg-[#1a102a] min-h-[60vh] text-[#f5f5f5] py-20 px-6"
    >
      <motion.div
        className="max-w-6xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Header Section */}
        <motion.h1 
          className="text-center text-4xl font-bold mb-4"
          variants={itemVariants}
        >
          Why RoomVibe?
        </motion.h1>
        
        <motion.h2 
          className="text-center text-2xl mb-12 max-w-3xl"
          variants={itemVariants}
        >
          We handpick the most aesthetic, <span className="font-bold text-[#d367e1]">affordable,</span> and cozy room <span className="font-bold text-[#d367e1]">finds</span> — so you do not have to.
        </motion.h2>

        {/* Feature Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          variants={containerVariants}
        >
          {/* Card 1 - Curated Selection */}
          <motion.div 
            className="bg-[#2a1a4a] rounded-xl p-8 border border-[#3d2a5a] hover:border-[#d367e1] transition-all duration-300 hover:shadow-lg hover:shadow-[#d367e1]/20"
            variants={itemVariants}
          >
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-3">Curated Vibe Picks</h3>
            <p className="text-[#e0d7ff]">
              Only the most aesthetic and unique items make the cut. We choose products that elevate your space.
            </p>
          </motion.div>

          {/* Card 2 - Affordable Finds */}
          <motion.div 
            className="bg-[#2a1a4a] rounded-xl p-8 border border-[#3d2a5a] hover:border-[#d367e1] transition-all duration-300 hover:shadow-lg hover:shadow-[#d367e1]/20"
            variants={itemVariants}
          >
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-bold mb-3">Smart, Affordable Finds</h3>
            <p className="text-[#e0d7ff]">
              We find budget-friendly gear that looks like a million bucks.
            </p>
          </motion.div>

          {/* Card 3 - Easy Browsing */}
          <motion.div 
            className="bg-[#2a1a4a] rounded-xl p-8 border border-[#3d2a5a] hover:border-[#d367e1] transition-all duration-300 hover:shadow-lg hover:shadow-[#d367e1]/20"
            variants={itemVariants}
          >
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Fast & Easy to Browse</h3>
            <p className="text-[#e0d7ff]">
              No endless scrolling. Find your vibe fast with smooth categories and clean design.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhyRoomVibe;