import Link from 'next/link';
import Image from 'next/image';
import Header from '../(components)/Header';
import Footer from '../(components)/Footer';
import blogPosts from '../../data/blog_post.json';
import { Metadata } from 'next';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Vibe Feed - Curated Design Inspiration & Home Decor Tips | RoomVibe',
  description:
    'Explore RoomVibe’s Vibe Feed for curated inspiration, design secrets, DIY tips, and aesthetic vibes to transform your space.',
  keywords: ['home decor', 'design inspiration', 'DIY tips', 'aesthetic decor', 'vibe feed', 'teen room ideas'],
  openGraph: {
    title: 'Vibe Feed - Curated Design Inspiration & Home Decor Tips | RoomVibe',
    description:
      'Discover curated inspiration, design secrets, and aesthetic vibes for your space on RoomVibe’s Vibe Feed.',
    url: 'https://roomvibe.vercel.app/vibefeed',
    type: 'website',
    images: [
      {
        url: 'https://roomvibe.vercel.app/img/coquette-decor.jpeg', // Updated to match aesthetic
        width: 1200,
        height: 630,
        alt: 'RoomVibe Vibe Feed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Feed - Curated Design Inspiration & Home Decor Tips | RoomVibe',
    description:
      'Discover curated inspiration and aesthetic vibes on RoomVibe’s Vibe Feed.',
    images: ['https://roomvibe.vercel.app/img/coquette-decor.jpeg'],
  },
  alternates: {
    canonical: 'https://roomvibe.vercel.app/vibefeed',
  },
};

// Sort posts server-side (newest first)
const sortedBlogPosts = [...blogPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6); // Cap at 6 posts

export default function VibeFeed() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Vibe Feed
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Curated inspiration, design secrets, and aesthetic vibes for your space
            </p>
            <div className="w-16 h-1 bg-pink-600 mx-auto mt-4 rounded-full" />
          </header>

          {/* Blog Posts Grid */}
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Blog Posts"
          >
            {sortedBlogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-md shadow-sm hover:scale-105 transition-transform duration-300 group"
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <Link href={`/vibefeed/${post.slug}`} itemProp="url">
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-md opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={post.id === sortedBlogPosts[0].id}
                      itemProp="image"
                    />
                    <div className="absolute bottom-4 left-4 bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <time
                      className="text-sm text-gray-600"
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
                      className="text-lg font-medium text-gray-900 mt-2 mb-3 line-clamp-2"
                      itemProp="headline"
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-sm text-gray-600 line-clamp-3"
                      itemProp="description"
                    >
                      {post.description}
                    </p>
                    <div className="mt-3">
                      <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 transition-colors duration-300">
                        Read More
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </section>

          {/* More Content Prompt */}
          {sortedBlogPosts.length < 6 && (
            <section className="text-center mt-12" aria-label="More Content">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                More Vibes Coming Soon
              </h3>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                We’re crafting fresh content to inspire your space. Check back for new design tips and aesthetic vibes!
              </p>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}