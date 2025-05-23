"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";
import inspirationCategories from "../../data/inspiration_categories.json";

interface InspirationCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  isFeatured?: boolean;
  isNewest?: boolean;
}

const Inspiration = () => {
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
        ease: "easeOut",
      },
    },
  };

  const displayedCategories = inspirationCategories.slice(0, 9) as InspirationCategory[];
  const featuredCategory = displayedCategories.find((cat) => cat.isFeatured) || displayedCategories[0];
  const newestCategory = displayedCategories.find((cat) => cat.isNewest) || displayedCategories[1];
  const otherCategories = displayedCategories.filter(
    (cat) => cat.id !== featuredCategory.id && cat.id !== newestCategory.id
  );

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Inspiration | RoomVibe Aesthetic Room Ideas</title>
        <meta
          name="description"
          content="Discover RoomVibe’s curated room inspiration for boho bedrooms, teen rooms, and more. Find your perfect aesthetic vibe!"
        />
        <meta name="keywords" content="room inspiration, boho bedrooms, teen rooms, aesthetic decor, cozy room ideas" />
        <link rel="canonical" href="https://www.roomvibe.vercel.app/inspiration" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
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
                      "url": "https://www.roomvibe.vercel.app/inspiration/${category.slug}"
                    }
                  `
                    )
                    .join(",")}
                ]
              }
            `,
          }}
        />
      </Head>

      <Header />

      <main ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Title, Metadata, and Social Links */}
        <motion.div
          className="flex flex-col gap-6 mb-12 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1
            className="text-gray-900 font-semibold text-3xl md:text-4xl"
            variants={itemVariants}
          >
            Find Your Room Inspiration
          </motion.h1>
          <motion.div className="text-sm text-gray-600" variants={itemVariants}>
            <p>Created by RoomVibe Team</p>
            <p>Published on May 15, 2025</p>
          </motion.div>
          <motion.div className="flex justify-center gap-4" variants={itemVariants}>
            <Link
              href="https://tiktok.com/@aevintape"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition-colors"
              aria-label="Follow us on TikTok"
            >
              <span className="sr-only">TikTok</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="https://github.com/gr1shq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition-colors"
              aria-label="Follow us on GitHub"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="https://x.com/tapecodeEnt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition-colors"
              aria-label="Follow us on X"
            >
              <span className="sr-only">X</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.254 2h3.63L14.41 10.08 23.12 22h-7.35l-5.18-6.97L4.75 22H1.12l8.01-8.87L.88 2h7.5l4.77 6.43L18.254 2Zm-1.27 18.7h2.01L6.11 3.18H4.03L16.984 20.7Z" />
              </svg>
            </Link>
            <Link
              href="https://sk.pinterest.com/tapecode/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition-colors"
              aria-label="Follow us on Pinterest"
            >
              <span className="sr-only">Pinterest</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387-.12-1.102-.227-2.793.049-3.993.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.174.265-.402.159-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.93-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.042-1.002 2.349-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12S18.627 0 12 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Featured and Newest Inspirations */}
        <motion.div className="mb-12" variants={containerVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Inspiration */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <Link href={`/inspiration/${featuredCategory.slug}`}>
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={featuredCategory.image}
                    alt={featuredCategory.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-gray-900 mt-2 text-center">
                  {featuredCategory.name} (Featured)
                </p>
              </Link>
            </motion.div>
            {/* Newest Inspiration */}
            <motion.div className="md:col-span-1" variants={itemVariants}>
              <Link href={`/inspiration/${newestCategory.slug}`}>
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={newestCategory.image}
                    alt={newestCategory.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-gray-900 mt-2 text-center">
                  {newestCategory.name} (Newest)
                </p>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Other Inspirations */}
        {otherCategories.length > 0 && (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
            {otherCategories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={`/inspiration/${category.slug}`}>
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-gray-900 mt-2 text-center">{category.name}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Inspiration;