"use client";

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import Link from 'next/link';

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
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardData = [
    {
      title: 'Curated Vibe Picks',
      description: 'Only the most aesthetic and unique items make the cut. We choose products that elevate your space.',
      image: '/product-images/sunset-lamp.webp', // sunset image
      ctaLink: '/vibefeed',
      ctaText: 'Discover Vibe Posts',
    },
    {
      title: 'Smart, Affordable Finds',
      description: 'We find budget-friendly gear that looks like a million bucks.',
      image: 'https://m.media-amazon.com/images/I/71ztyMMelJL.__AC_SX300_SY300_QL70_FMwebp_.jpg', // neon image
      ctaLink: '/vibefeed',
      ctaText: 'Explore Budget Tips',
    },
    {
      title: 'Fast & Easy to Browse',
      description: 'No endless scrolling. Find your vibe fast with smooth categories and clean design.',
      image: '/product-images/desk-shelf.webp', // Replace with actual image path
      ctaLink: '/categories', // Assumed category page; adjust if needed
      ctaText: 'Browse Categories',
    },
  ];

  return (
    <div
      ref={ref}
      className="min-h-[60vh] text-[#f5f5f5] py-20 px-6 bg-gradient-to-b from-[#1a102a] to-[#2a1a4a]"
    >
      <motion.div
        className="max-w-6xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
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
          We handpick the most aesthetic,{' '}
          <span className="font-bold text-[#d367e1]">affordable,</span> and cozy room{' '}
          <span className="font-bold text-[#d367e1]">finds</span> — so you do not have to.
        </motion.h2>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          variants={containerVariants}
        >
          {cardData.map((card, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={300}
            >
              <motion.div
                className="bg-[#2a1a4a]/30 backdrop-blur-md rounded-xl p-6 border border-[#3d2a5a]/50 hover:border-[#d367e1]/70 transition-all duration-300 hover:shadow-lg hover:shadow-[#d367e1]/20"
                variants={itemVariants}
                style={{
                  background: `linear-gradient(135deg, #2a1a4a22, #3d2a5a22)`,
                }}
              >
                {/* Card Image */}
                <div className="relative w-16 h-16 mb-4 mx-auto">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover rounded-full transform transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Card Content */}
                <h3 className="text-xl font-bold mb-2 text-[#f5f5f5]">{card.title}</h3>
                <p className="text-[#e0d7ff] mb-4 text-sm leading-6">
                  {card.description}
                </p>

                {/* CTA Button */}
                <Link
                  href={card.ctaLink}
                  className="inline-block px-4 py-2 text-sm font-medium rounded-full transition-colors hover:bg-[#d367e1]/80"
                  style={{ backgroundColor: '#d367e1', color: '#f5f5f5' }}
                >
                  {card.ctaText}
                </Link>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhyRoomVibe;