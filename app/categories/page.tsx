"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import categories from "../../data/categories.json";
import CategoryCard from "../(components)/CategoryCard";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";
import { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false); // Added for loading state
  const displayedCategories = categories.slice(0, visibleCount);
  const hasMore = visibleCount < categories.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoading(false);
    }, 500); // Simulate a short delay for loading feedback
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>RoomVibe Categories | Aesthetic Room Decor & RGB Lights</title>
        <meta
          name="description"
          content="Explore RoomVibe’s curated categories of aesthetic room decor, RGB lights, cozy essentials, and more. Find your perfect room vibe!"
        />
        <meta
          name="keywords"
          content="aesthetic room decor, RGB lights, cozy room essentials, room vibe categories"
        />
        <link rel="canonical" href="https://www.roomvibe.vercel.app/categories" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.roomvibe.vercel.app"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Categories",
                  "item": "https://www.roomvibe.vercel.app/categories"
                }
              ]
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                ${displayedCategories
                  .map(
                    (category, index) => `
                  {
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "url": "https://www.roomvibe.vercel.app/categories/${category.slug}"
                  }
                `
                  )
                  .join(",")}
              ]
            }
          `}
        </script>
      </Head>

      <Header />

      <main
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
      >
        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-pink-600 transition-colors">
            Home
          </Link>{" "}
          / <span className="text-gray-900">Categories</span>
        </div>

        {/* Header Section */}
        <motion.div
          className="flex flex-col gap-3 mb-12 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1
            className="text-gray-900 font-semibold text-3xl md:text-4xl"
            variants={itemVariants}
          >
            Explore Your Room Vibe
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Discover{" "}
            <span className="font-semibold text-pink-600">aesthetic decor</span>{" "}
            and <span className="font-semibold text-pink-600">RGB lights</span>{" "}
            to create your perfect vibe.
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
        >
          {displayedCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="relative w-full max-w-[300px] mx-auto"
            >
              <CategoryCard
                img={category.image}
                name={category.name}
                slug={category.slug}
              />
              {index === 0 && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-pink-600 text-white text-xs rounded-full z-10">
                  Featured Vibe
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Category Count and Load More */}
        {hasMore && (
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Showing {displayedCategories.length} of {categories.length}{" "}
              categories
            </p>
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className={`px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Load More Vibes"}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Page;