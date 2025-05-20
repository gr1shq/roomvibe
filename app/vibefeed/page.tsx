import Link from "next/link";
import Image from "next/image";
import Header from "../(components)/Header";
import Footer from "../(components)/Footer";
import blogPosts from "../../data/blog_post.json";
import { Metadata } from "next";
import LoadMoreButton from "../(components)/LoadMoreButton";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Vibe Feed - Curated Design Inspiration & Home Decor Tips | RoomVibe",
  description:
    "Explore RoomVibe’s Vibe Feed for curated inspiration, design secrets, DIY tips, and aesthetic vibes to transform your space.",
  keywords: [
    "home decor",
    "design inspiration",
    "DIY tips",
    "aesthetic decor",
    "vibe feed",
    "teen room ideas",
  ],
  openGraph: {
    title: "Vibe Feed - Curated Design Inspiration & Home Decor Tips | RoomVibe",
    description:
      "Discover curated inspiration, design secrets, and aesthetic vibes for your space on RoomVibe’s Vibe Feed.",
    url: "https://roomvibe.vercel.app/vibefeed",
    type: "website",
    images: [
      {
        url: "https://roomvibe.vercel.app/img/coquette-decor.jpeg",
        width: 1200,
        height: 630,
        alt: "RoomVibe Vibe Feed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Feed - Curated Design Inspiration & Home Decor Tips | RoomVibe",
    description:
      "Discover curated inspiration and aesthetic vibes on RoomVibe’s Vibe Feed.",
    images: ["https://roomvibe.vercel.app/img/coquette-decor.jpeg"],
  },
  alternates: {
    canonical: "https://roomvibe.vercel.app/vibefeed",
  },
};

// Sort posts server-side (newest first)
const sortedBlogPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Define props interface to match server component
interface VibeFeedPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function VibeFeed({ searchParams }: VibeFeedPageProps) {
  const page = Number(searchParams.page) || 1;
  const postsPerPage = 12;
  const displayedPosts = sortedBlogPosts.slice(0, page * postsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600 transition-colors">
              Home
            </Link>{" "}
            / <span className="text-gray-900">Vibe Feed</span>
          </div>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Vibe Feed
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Curated inspiration, design secrets, and aesthetic vibes for your
              space
            </p>
            <div className="w-16 h-1 bg-pink-600 mx-auto mt-4 rounded-full" />
          </header>

          {/* Blog Posts Grid */}
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            aria-label="Blog Posts"
          >
            {displayedPosts.map((post, index) => (
              <article
                key={post.id}
                className="group relative overflow-hidden w-full max-w-[250px] mx-auto"
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <Link
                  href={`/vibefeed/${post.slug}`}
                  aria-label={`Read ${post.title}`}
                  itemProp="url"
                >
                  {/* Image Section */}
                  <div className="relative aspect-[1/1] bg-gray-100 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover:opacity-80"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                      itemProp="image"
                    />
                    <div className="absolute bottom-3 left-3 bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </div>
                    {index === 0 && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-pink-600 text-white text-xs rounded-full">
                        Top Post
                      </span>
                    )}
                  </div>

                  {/* Text Section (Below Image) */}
                  <div className="mt-3 text-center">
                    <h2
                      className="text-base font-medium text-gray-900 line-clamp-2"
                      itemProp="headline"
                    >
                      {post.title}
                    </h2>
                    <time
                      className="text-xs text-gray-800 mt-1 block"
                      dateTime={post.date}
                      itemProp="datePublished"
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </Link>
              </article>
            ))}
          </section>

          {/* Load More Button */}
          <LoadMoreButton
            totalPosts={sortedBlogPosts.length}
            postsPerPage={postsPerPage}
          />

          {/* More Content Prompt (if no posts are loaded yet) */}
          {displayedPosts.length < 6 && sortedBlogPosts.length < 6 && (
            <section className="text-center mt-12" aria-label="More Content">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                More Vibes Coming Soon
              </h3>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                We’re crafting fresh content to inspire your space. Check back
                for new design tips and aesthetic vibes!
              </p>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}