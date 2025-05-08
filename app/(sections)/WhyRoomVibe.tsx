"use client";

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';

const WhyRoomVibe = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
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

  return (
    <section
      ref={ref}
      className="bg-pink-50 py-12 md:py-16 px-4 sm:px-6 lg:px-8"
      aria-label="Why RoomVibe"
    >
      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <svg
          className="w-12 h-12 mx-auto mb-4 text-pink-600"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why RoomVibe?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          At RoomVibe, we curate <span className="font-semibold text-pink-600">aesthetic products</span> and{' '}
          <span className="font-semibold text-pink-600">inspirational ideas</span> to help you create a space that reflects your unique style. Discover handpicked decor, lighting, and more, designed to elevate your room into a vibe that’s all your own.
        </p>
        <motion.div variants={variants}>
          <Image
            src="/category-images/coquette-decor.jpeg"
            alt="Aesthetic room with curated decor"
            width={600}
            height={400}
            className="mx-auto rounded-lg shadow-sm opacity-90"
            sizes="(max-width: 768px) 100vw, 600px"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyRoomVibe;