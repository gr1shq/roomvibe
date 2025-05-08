"use client";

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import blogPosts from '../../data/blog_post.json';
import categories from '../../data/categories.json';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

const typedBlogPosts: BlogPost[] = blogPosts as BlogPost[];
const typedCategories: Category[] = categories as Category[];

const DiscoverSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const featuredCategories = typedCategories.slice(0, 3); // Restore 3 category images
  const featuredPosts = typedBlogPosts.slice(0, 3); // 3 blog post images

  return (
    <section
      ref={ref}
      className="bg-gray-50 py-12 md:py-16 px-6 sm:px-8 lg:px-12"
      aria-label="Discover Inspiration"
    >
      <motion.div
        className="max-w-6xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Unified Header */}
        <motion.h2
          className="text-center text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          variants={itemVariants}
        >
          Discover Your Vibe
        </motion.h2>
        <motion.p
          className="text-center text-lg text-gray-600 mb-12 max-w-3xl"
          variants={itemVariants}
        >
          Explore <span className="font-semibold text-pink-600">aesthetic styles</span> and{' '}
          <span className="font-semibold text-pink-600">inspiration</span> to create your perfect space.
        </motion.p>

        {/* Categories Subsection */}
        <motion.div className="w-full mb-16" variants={itemVariants}>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center">
            Signature Styles
          </h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
            variants={containerVariants}
          >
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group relative overflow-hidden"
              >
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                    loading="lazy"
                  />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-pink-600 text-white text-xs rounded-full">
                      Featured Vibe
                    </span>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <h4 className="text-xl font-medium text-gray-900">{category.name}</h4>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="mt-2 inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-500"
                  >
                    Discover this vibe
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Blog Posts Subsection */}
        <motion.div className="w-full" variants={itemVariants}>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center">
            Design Inspiration
          </h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full"
            variants={containerVariants}
          >
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="group relative overflow-hidden"
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                    loading="lazy"
                  />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-pink-600 text-white text-xs rounded-full">
                      Top Post
                    </span>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <h4 className="text-xl font-medium text-gray-900">{post.title}</h4>
                  <Link
                    href={`/vibefeed/${post.slug}`}
                    className="mt-2 inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-500"
                  >
                    Read this post
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <meta itemProp="headline" content={post.title} />
                <meta itemProp="description" content={post.description} />
                <meta itemProp="datePublished" content={post.date} />
                <meta itemProp="image" content={post.image} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Unified CTAs */}
        <motion.div className="mt-10 flex gap-4 justify-center" variants={itemVariants}>
          <Link
            href="/categories"
            className="inline-block px-6 py-3 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 transition-all duration-300"
          >
            Explore Vibes
          </Link>
          <Link
            href="/vibefeed"
            className="inline-block px-6 py-3 text-base font-medium text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50 transition-all duration-300"
          >
            Read VibeFeed
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DiscoverSection;