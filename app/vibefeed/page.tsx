import Link from 'next/link';
import Image from 'next/image';
import Header from '../(components)/Header';
import Footer from '../(components)/Footer';
import blogPosts from '../../data/blog_post.json';
import { Metadata } from 'next';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Vibe Feed - Curated Design Inspiration & Home Decor Tips',
  description:
    'Explore the Vibe Feed for curated inspiration, design secrets, DIY tips, and fresh vibes to elevate your living space.',
  keywords: ['home decor', 'design inspiration', 'DIY tips', 'interior design', 'vibe feed', 'home styling'],
  openGraph: {
    title: 'Vibe Feed - Curated Design Inspiration & Home Decor Tips',
    description:
      'Discover curated inspiration, design secrets, and fresh vibes for your space on the Vibe Feed.',
    url: 'https://roomvibe.vercel.app/vibefeed', 
    type: 'website',
    images: [
      {
        url: 'https://roomvibe.vercel.app/img/gaming-room-bg.jpeg', 
        width: 1200,
        height: 630,
        alt: 'Vibe Feed Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Feed - Curated Design Inspiration & Home Decor Tips',
    description:
      'Discover curated inspiration, design secrets, and fresh vibes for your space on the Vibe Feed.',
    images: ['https://roomvibe.vercel.app/img/gaming-room-bg.jpeg'], 
  },
  alternates: {
    canonical: 'https://roomvibe.vercel.app/vibefeed', 
  },
};

export default function VibeFeed() {
  // Sort posts by date (newest first)
  const sortedBlogPosts = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          {/* Header with Semantic HTML */}
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
              Vibe Feed
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Curated inspiration, design secrets, and fresh vibes for your space
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-6 rounded-full" />
          </header>

          {/* Blog Posts Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Blog Posts">
            {sortedBlogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={post.id === sortedBlogPosts[0].id} // Prioritize first image for LCP
                    itemProp="image"
                  />
                  <div className="absolute bottom-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <time
                    className="text-sm text-gray-500 dark:text-gray-400"
                    dateTime={post.date}
                    itemProp="datePublished"
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <h2
                    className="text-xl font-bold text-gray-800 dark:text-white mt-2 mb-3 line-clamp-2"
                    itemProp="headline"
                  >
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3" itemProp="description">
                    {post.description}
                  </p>
                  <Link
                    href={`/vibefeed/${post.slug}`}
                    className="inline-flex items-center text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors"
                    itemProp="url"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </section>

          {/* Coming Soon Message */}
          {sortedBlogPosts.length === 2 && (
            <section className="text-center mt-20" aria-label="Coming Soon">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                More Vibes Coming Soon..
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                We are brewing fresh content to elevate your space. Stay tuned for regular drops of design inspiration,
                DIY tips, and vibe makeovers.
              </p>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}