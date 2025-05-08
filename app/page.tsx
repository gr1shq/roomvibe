// app/page.tsx
import Footer from './(components)/Footer';
import Header from './(components)/Header';
import CategoriesSection from './(sections)/CategoriesSection';
import HeroSection from './(sections)/Hero';
import Slide from './(sections)/Slide';
import WhyRoomVibe from './(sections)/WhyRoomVibe';
import { Metadata } from 'next';
import Head from 'next/head';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'RoomVibe | Aesthetic Room Decor & RGB Lights',
  description:
    'Transform your space with RoomVibe is curated aesthetic room decor, RGB lights, and cozy upgrades. Shop now for the perfect room vibe!',
  keywords: ['aesthetic room decor', 'RGB lights', 'cozy room upgrades', 'room vibe ideas', 'interior design', 'home decor'],
  openGraph: {
    title: 'RoomVibe | Aesthetic Room Decor & RGB Lights',
    description:
      'Transform your space with RoomVibe is curated aesthetic room decor, RGB lights, and cozy upgrades.',
    url: 'https://www.roomvibe.vercel.app',
    type: 'website',
    images: [
      {
        url: 'https://roomvibe.vercel.app/img/gaming-room-bg.jpeg', 
        width: 1200,
        height: 630,
        alt: 'RoomVibe Aesthetic Decor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoomVibe | Aesthetic Room Decor & RGB Lights',
    description:
      'Transform your space with RoomVibe is curated aesthetic room decor, RGB lights, and cozy upgrades.',
    images: ['https://roomvibe.vercel.app/img/gaming-room-bg.jpeg'], 
  },
  alternates: {
    canonical: 'https://www.roomvibe.vercel.app',
  },
};

// Structured Data for WebSite and Organization
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'RoomVibe',
      url: 'https://www.roomvibe.vercel.app',
      description: 'RoomVibe curates aesthetic room decor and mood-setting products like RGB lights.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.roomvibe.vercel.app/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      name: 'RoomVibe',
      url: 'https://www.roomvibe.vercel.app',
      logo: 'https://www.roomvibe.vercel.app/favicon.ico',
      sameAs: [
        'https://x.com/tapecodeEnt', 
        'https://www.instagram.com/tapecodegoty/',
        'https://sk.pinterest.com/tapecode/',
      ],
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Structured Data */}

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Header />

      <main className="flex-grow">
        <section aria-label="Hero">
          <HeroSection />
        </section>
        <section aria-label="Featured Products" className="bg-gray-50 dark:bg-gray-900">
          <Slide />
        </section>
        <section aria-label="Product Categories">
          <CategoriesSection />
        </section>
        <section>
          <WhyRoomVibe />
        </section>
      </main>

      <Footer />
    </div>
  );
}