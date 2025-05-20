"use client";

import { notFound } from 'next/navigation';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../(components)/Header';
import Footer from '../../(components)/Footer';
import inspirationCategories from '../../../data/inspiration_categories.json';
import { use } from 'react';

// Interfaces (same as in inspiration/[slug]/page.tsx)
interface Room {
  id: number;
  title: string;
  image: string;
  alt: string;
  description: string;
  product: {
    id: number;
    name: string;
    image: string;
    affiliate_url: string;
    price: number;
  };
}

interface ShopItem {
  id: number;
  name: string;
  image: string;
  affiliate_url: string;
  price: number;
}

interface InspirationCategory {
  id: number;
  name: string;
  slug: string;
  style_description: string;
  rooms: Room[];
  shop_the_look: ShopItem[];
  find_more?: {
    type: "blog_post" | "category";
    title: string;
    url: string;
  };
  back_to_inspiration: {
    title: string;
    url: string;
  };
}

interface PageProps {
  searchParams: Promise<{ page?: string }>; // Fix: Type searchParams as a Promise
}

const InspirationPage = ({ searchParams }: PageProps) => {
  // Unwrap searchParams (not used in logic to keep backend simple)
  use(searchParams); // Still unwrap to avoid runtime issues

  // Use the first category for simplicity (no pagination)
  const category = inspirationCategories[0] as InspirationCategory | undefined;

  if (!category) {
    notFound();
  }

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

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{`${category.name} Inspiration | RoomVibe`}</title>
        <meta name="description" content={category.style_description.slice(0, 160)} />
        <meta
          name="keywords"
          content={`${category.name.toLowerCase()}, room inspiration, aesthetic decor, cozy room ideas`}
        />
        <link
          rel="canonical"
          href={`https://www.roomvibe.vercel.app/vibefeed`}
        />
      </Head>

      <Header />

      <main
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
      >
        {/* Title, Metadata, Social Links, and Style Description */}
        <motion.div
          className="flex flex-col gap-6 mb-12 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h1
            className="text-gray-900 font-semibold text-3xl md:text-4xl text-center"
            variants={itemVariants}
          >
            {category.name}
          </motion.h1>
          <motion.div className="text-sm text-gray-600 text-center" variants={itemVariants}>
            <p>Created by RoomVibe Team</p>
            <p>Published on May 15, 2025</p>
          </motion.div>
          <motion.div className="flex justify-center gap-4" variants={itemVariants}>
            <Link
              href="https://tiktok.com/@aevintape"
              target="_blank"
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
          <motion.p
            className="text-base text-gray-600"
            variants={itemVariants}
          >
            {category.style_description}
          </motion.p>
          {/* Back to Inspiration Button */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <Link
              href={category.back_to_inspiration.url}
              className="px-6 py-3 text-base font-medium text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50 active:bg-pink-100 transition-all duration-200"
              aria-label={category.back_to_inspiration.title}
            >
              {category.back_to_inspiration.title}
            </Link>
          </motion.div>
        </motion.div>

        {/* Room Sections */}
        <motion.section
          className="space-y-12 max-w-4xl mx-auto"
          variants={containerVariants}
          aria-label="Room Inspiration"
        >
          {category.rooms.map((room) => (
            <motion.div key={room.id} variants={itemVariants}>
              <div className="relative w-full aspect-[3/4] max-w-2xl mx-auto">
                <Image
                  src={room.image}
                  alt={room.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  loading="lazy"
                />
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{room.title}</h2>
                <p className="text-base text-gray-600 mb-4">{room.description}</p>
                <div className="flex items-center gap-4">
                  <p className="text-base font-medium text-gray-900">{room.product.name}</p>
                  <p className="text-base text-gray-600">${room.product.price.toFixed(2)}</p>
                  <Link
                    href={room.product.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Shop the Look */}
        <motion.section
          className="mt-12 max-w-4xl mx-auto"
          variants={containerVariants}
          aria-label="Shop the Look"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center">
            Shop the Look
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {category.shop_the_look.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-white"
              >
                <Link
                  href={item.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-base text-gray-600">
                      ${item.price.toFixed(2)}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500">
                      Shop Now
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Find More Here Link */}
        {category.find_more && (
          <motion.section
            className="mt-12 max-w-4xl mx-auto text-center"
            variants={itemVariants}
          >
            <p className="text-base text-gray-700">
              Want to learn more?{' '}
              <Link
                href={category.find_more.url}
                className="text-pink-600 hover:underline font-medium"
                aria-label={category.find_more.title}
              >
                {category.find_more.title}
              </Link>
            </p>
          </motion.section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default InspirationPage;