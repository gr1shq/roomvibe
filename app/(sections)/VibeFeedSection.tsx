// app/(sections)/VibeFeedSection.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Link from 'next/link';
import BlogCard from '../(components)/BlogCard'; // Adjust path if needed
import blogPosts from '../../data/blog_post.json';

// Define BlogPost interface to match blog_post.json
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

// Type the blogPosts import
const typedBlogPosts: BlogPost[] = blogPosts as BlogPost[];

const VibeFeedSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation variants
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

  // Limit to 3 posts
  const featuredPosts = typedBlogPosts.slice(0, 3);

  return (
    <section
      ref={ref}
      className="min-h-[60vh] text-[#f5f5f5] py-20 px-6 bg-gradient-to-b from-[#1a102a] to-[#2a1a4a]"
      aria-label="Vibe Feed"
    >
      <motion.div
        className="max-w-6xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Header Section */}
        <motion.h2
          className="text-center text-4xl font-bold mb-4"
          variants={itemVariants}
        >
          VibeFeed Inspiration
        </motion.h2>
        <motion.p
          className="text-center text-2xl mb-12 max-w-3xl"
          variants={itemVariants}
        >
          Discover <span className="font-bold text-[#d367e1]">aesthetic</span> room decor ideas,{' '}
          <span className="font-bold text-[#d367e1]">DIY</span> hacks, and curated product picks to elevate your space.
        </motion.p>

        {/* Blog Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          variants={containerVariants}
        >
          {featuredPosts.map(post => (
            <Tilt
              key={post.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={300}
            >
              <motion.div
                variants={itemVariants}
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <BlogCard
                  id={post.id}
                  image={post.image}
                  title={post.title}
                  category={post.category}
                  date={new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                  excerpt={post.description}
                  slug={post.slug}
                />
                <meta itemProp="headline" content={post.title} />
                <meta itemProp="description" content={post.description} />
                <meta itemProp="datePublished" content={post.date} />
                <meta itemProp="image" content={post.image} />
              </motion.div>
            </Tilt>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div variants={itemVariants} className="mt-12">
          <Link
            href="/vibefeed"
            className="inline-block px-6 py-3 text-lg font-medium rounded-full transition-colors hover:bg-[#d367e1]/80"
            style={{ backgroundColor: '#d367e1', color: '#f5f5f5' }}
          >
            View All VibeFeed Posts
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VibeFeedSection;