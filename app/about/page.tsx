import React from 'react';
import Head from 'next/head';
import Header from '../(components)/Header';
import Footer from '../(components)/Footer';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="">
      <Head>
        <title>About RoomVibe | Aesthetic Room Decor & RGB Lights</title>
        <meta
          name="description"
          content="Discover RoomVibe, your go-to for aesthetic room decor, RGB lights, and cozy upgrades. Transform your space with our curated products!"
        />
        <meta name="keywords" content="aesthetic room decor, RGB lights, cozy room upgrades, room vibe ideas" />
        <link rel="canonical" href="https://www.roomvibe.vercel.app/about" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "RoomVibe",
              "url": "https://www.roomvibe.vercel.app",
              "description": "RoomVibe curates aesthetic room decor and mood-setting products like RGB lights to transform your space.",
              "sameAs": [
                "https://sk.pinterest.com/tapecode/",
                "https://x.com/tapecodeEnt",
                "https://tiktok.com/@aevintape",
                "https://github.com/gr1shq"
              ]
            }
          `}
        </script>
      </Head>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl mx-auto text-center mb-16">
          <img
            src="/img/cozy-blue-room.jpg"
            alt="Aesthetic Room Setup with RGB Lights"
            className="w-full h-64 object-cover rounded-lg mb-6"
            loading="lazy"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-purple-200 mb-4">
            Welcome to <span className="text-purple-400">RoomVibe</span>: Your Source for Aesthetic Room Decor
          </h1>
          <p className="text-lg text-purple-300">
            Your digital corner for discovering aesthetic room decor, cozy lighting, and mood-setting upgrades like RGB lights and neon signs.
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-700">
          {/* Mission Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-purple-200 mb-4">Our Passion for Aesthetic Room Decor</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              At RoomVibe, we are a small team obsessed with turning everyday spaces into personal sanctuaries. 
              From RGB lights that set the perfect mood to minimalist desk setups and vibe-packed décor, we handpick 
              products from Amazon, Temu, and AliExpress to transform your room into your favorite place to be.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you are building a dream gaming setup, a cozy study zone, or chasing that sunset lamp glow, 
              RoomVibe helps you find aesthetic room decor that <span className="italic text-purple-400">feels right</span>. 
              Check out our <a href="/categories/led-paradise" className="text-purple-400 hover:underline">RGB Lights</a> or 
              read our <a href="/vibefeed" className="text-purple-400 hover:underline">Room Vibe Tips</a>.
            </p>
          </section>

          {/* Why Choose RoomVibe */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-purple-200 mb-4">Why Choose RoomVibe?</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              We scour the web for the best room vibe products, focusing on quality, affordability, and aesthetics. 
              Our curated collections, inspired by TikTok trends and cozy vibes, make it easy to upgrade your space. 
              Plus, our affiliate links ensure you get the best deals from trusted platforms.
            </p>
            <Link
              href="/categories"
              className="mt-4 inline-block bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
            >
              Shop Aesthetic Room Decor Now
            </Link>
          </section>

          {/* Divider */}
          <div className="border-t border-purple-800 my-8"></div>

          {/* Tagline Section */}
          <section className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-purple-200 mb-4">
              This is not just a product collection — <br />
              <span className="text-purple-400">it is a vibe.</span>
            </h2>
          </section>

          {/* Features List */}
          <section className="space-y-4 mb-12">
            <div className="flex items-start">
              <span className="text-2xl mr-3 text-purple-400">🪄</span>
              <p className="text-gray-300">Curated with love for aesthetic room upgrades.</p>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3 text-purple-400">🔗</span>
              <p className="text-gray-300">Powered by affiliate links to trusted platforms.</p>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3 text-purple-400">✨</span>
              <p className="text-gray-300">Inspired by TikTok trends, cozy aesthetics, and late-night scrolling.</p>
            </div>
          </section>


          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://sk.pinterest.com/tapecode/"
              className="text-gray-400 hover:text-pinterest-red transition-colors"
              target="_blank"
              rel="nofollow"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-label="RoomVibe Pinterest Profile">
                {/* SVG Path */}
              </svg>
            </a>
            {/* Add similar changes for other social links */}
          </div>
        </main>

          <p className="text-purple-300 text-lg font-medium flex justify-center pt-5">
            Thanks for vibing with us <span className="text-purple-400">💜</span>
          </p>
      </div>
        {/* Footer */}
        <footer className="">
          <Footer />
        </footer>
    </div>
  );
};

export default AboutPage;