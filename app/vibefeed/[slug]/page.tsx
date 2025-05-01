// app/vibefeed/[slug]/page.tsx
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import blogPosts from '../../../data/blog_post.json';

// Define a type for content items
type ContentItem = {
  type: 'heading' | 'paragraph';
  text: string;
  url?: string;
  image?: string;
};

// Define the BlogPost interface
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  theme: {
    background: string;
    text: string;
    accent: string;
  };
  content: ContentItem[];
}

// Type the blogPosts import
const typedBlogPosts: BlogPost[] = blogPosts as BlogPost[];

export async function generateStaticParams() {
  return typedBlogPosts.map(post => ({
    slug: post.slug,
  }));
}

// Generate minimal metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = typedBlogPosts.find(post => post.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found | RoomVibe',
    };
  }

  return {
    title: `${post.title} | RoomVibe`,
    description: post.description,
    alternates: {
      canonical: `/vibefeed/${slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = typedBlogPosts.find(post => post.slug === slug);

  if (!post) {
    notFound();
  }

  // Generate ToC from headings
//   const tableOfContents = post.content
//     .filter(item => item.type === 'heading')
//     .map(item => ({
//       text: item.text,
//       id: item.text.toLowerCase().replace(/\s+/g, '-'),
//     }));

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header />
      </header>

      <main
        className="flex-grow"
        style={{
          backgroundColor: post.theme.background,
          color: post.theme.text,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Back Button */}
            <Link
              href="/vibefeed"
              className="flex items-center mb-8 hover:underline"
              style={{ color: post.theme.accent }}
            >
              Back to Vibe Feed
            </Link>

            {/* Article Header */}
            <div className="mb-12">
              <span
                className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                style={{
                  backgroundColor: `${post.theme.accent}20`,
                  color: post.theme.accent,
                }}
              >
                {post.category}
              </span>
              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: post.theme.text }}
              >
                {post.title}
              </h1>

              <div
                className="flex flex-wrap items-center gap-4 mb-6"
                style={{ color: `${post.theme.text}90` }}
              >
                <div className="flex items-center">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="flex items-center">{post.author}</div>
              </div>

              {/* Featured Image */}
              <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Article Content */}
            <div className="max-w-none text-lg leading-7">
              {post.content.map((item, index) => {
                const itemId = item.type === 'heading' ? item.text.toLowerCase().replace(/\s+/g, '-') : undefined;
                return (
                  <div key={index} id={itemId}>
                    {item.type === 'heading' && (
                      <div className="mt-8 mb-4">
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <h2
                              className="text-2xl font-bold underline"
                              style={{ color: post.theme.accent }}
                            >
                              {item.text}
                            </h2>
                          </a>
                        ) : (
                          <h2
                            className="text-2xl font-bold"
                            style={{ color: post.theme.accent }}
                          >
                            {item.text}
                          </h2>
                        )}
                        {item.image && (
                          <div
                            className="relative w-64 h-64 mx-auto my-4 rounded-xl bg-[#2a1a4a]/30 backdrop-blur-md border border-[#3d2a5a]/50 shadow-inner"
                            style={{
                              background: `linear-gradient(135deg, #2a1a4a22, #3d2a5a22)`,
                              boxShadow: `0 0 10px ${post.theme.accent}20`,
                            }}
                          >
                            <Image
                              src={item.image || '/product-images/strip-light2.webp'}
                              alt={item.text}
                              fill
                              className="object-contain rounded-xl p-2"
                              quality={75}
                              sizes="256px"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {item.type === 'paragraph' && (
                      <p
                        className="mb-6 text-shadow-sm"
                        style={{ color: post.theme.text }}
                      >
                        {item.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div
                className="mt-12 pt-8 border-t"
                style={{ borderColor: `${post.theme.text}20` }}
              >
                <div
                  className="flex items-center mb-4"
                  style={{ color: `${post.theme.text}90` }}
                >
                  <span>Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: `${post.theme.accent}20`,
                        color: post.theme.accent,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: `${post.theme.accent}10` }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: post.theme.accent }}>
                Enjoyed This Post?
              </h3>
              <p className="mb-4" style={{ color: post.theme.text }}>
                Discover more aesthetic tips and tricks in our Vibe Feed!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/vibefeed"
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: post.theme.accent, color: post.theme.text }}
                >
                  Read More Posts
                </Link>
                <a
                  href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://roomvibe.vercel.app/vibefeed/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: post.theme.text, color: post.theme.background }}
                >
                  Share on X
                </a>
              </div>
            </div>
          </div>

          {/* Table of Contents (Sticky on Desktop) */}
          {/* {tableOfContents.length > 0 && (
            <aside className="lg:w-64 lg:sticky lg:top-24 lg:self-start hidden lg:block">
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: `${post.theme.text}10` }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{ color: post.theme.accent }}>
                  Table of Contents
                </h3>
                <ul className="space-y-2">
                  {tableOfContents.map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-sm hover:underline"
                        style={{ color: post.theme.text }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )} */}
        </div>
      </main>

      <footer>
        <Footer />
      </footer>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            publisher: {
              '@type': 'Organization',
              name: 'RoomVibe',
            },
          }),
        }}
      />
    </div>
  );
}