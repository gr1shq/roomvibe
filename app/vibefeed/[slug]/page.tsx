// app/vibefeed/[slug]/page.tsx
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Head from 'next/head';
import blogPosts from '../../../data/blog_post.json';

// Define a type for content items
type ContentItem = {
  type: 'heading' | 'paragraph';
  text: string;
  url?: string;
  temuUrl?: string; // Optional Temu link
  aliexpressUrl?: string; // Optional AliExpress link
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

// Generate metadata for SEO
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
    keywords: post.tags.concat(['room decor', 'aesthetic', 'vibe feed']),
    openGraph: {
      title: `${post.title} | RoomVibe`,
      description: post.description,
      url: `https://roomvibe.vercel.app/vibefeed/${slug}`,
      type: 'article',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | RoomVibe`,
      description: post.description,
      images: [post.image],
    },
    alternates: {
      canonical: `https://roomvibe.vercel.app/vibefeed/${slug}`,
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

  // Generate Table of Contents from headings
  const tableOfContents = post.content
    .filter(item => item.type === 'heading')
    .map(item => ({
      text: item.text,
      id: item.text.toLowerCase().replace(/\s+/g, '-'),
    }));

  // Find related posts (exclude current post)
  const relatedPosts = typedBlogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Structured Data */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              image: post.image,
              url: `https://roomvibe.vercel.app/vibefeed/${slug}`,
              author: {
                '@type': 'Organization',
                name: 'RoomVibe',
              },
              publisher: {
                '@type': 'Organization',
                name: 'RoomVibe',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://roomvibe.vercel.app/logo.png', // Replace with actual logo
                },
              },
            }),
          }}
        />
      </Head>

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
              className="flex items-center mb-8 hover:underline text-lg font-medium"
              style={{ color: post.theme.accent }}
            >
              ← Back to Vibe Feed
            </Link>

            {/* Article Header */}
            <div className="mb-12">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
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
                className="flex flex-wrap items-center gap-4 mb-6 text-sm"
                style={{ color: `${post.theme.text}90` }}
              >
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>{post.author}</span>
              </div>

              {/* Featured Image */}
              <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.map((item, index) => {
                const itemId = item.type === 'heading' ? item.text.toLowerCase().replace(/\s+/g, '-') : undefined;
                return (
                  <div key={index} id={itemId} className="mb-6">
                    {item.type === 'heading' && (
                      <div className="mt-8 mb-4 flex flex-col items-start gap-4">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl font-bold hover:underline"
                            style={{ color: post.theme.accent }}
                          >
                            {item.text}
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
                          <div className="relative w-48 h-48 mx-auto my-4 rounded-xl overflow-hidden">
                            <Image
                              src={item.image || '/product-images/strip-light2.webp'}
                              alt={item.text}
                              fill
                              className="object-contain"
                              quality={75}
                              sizes="192px"
                              loading="lazy"
                            />
                          </div>
                        )}
                        {/* Affiliate Buttons */}
                        {(item.url || item.temuUrl || item.aliexpressUrl) && (
                          <div className="flex flex-wrap gap-3">
                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                                style={{
                                  backgroundColor: post.theme.accent,
                                  color: post.theme.text,
                                }}
                              >
                                Shop on Amazon
                              </a>
                            )}
                            {item.temuUrl && (
                              <a
                                href={item.temuUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                                style={{
                                  backgroundColor: '#F97316', // Temu orange
                                  color: '#FFFFFF',
                                }}
                              >
                                Shop on Temu
                              </a>
                            )}
                            {item.aliexpressUrl && (
                              <a
                                href={item.aliexpressUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                                style={{
                                  backgroundColor: '#E11D48', // AliExpress red
                                  color: '#FFFFFF',
                                }}
                              >
                                Shop on AliExpress
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {item.type === 'paragraph' && (
                      <p
                        className="mb-4 leading-relaxed"
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
                  className="flex items-center mb-4 text-sm"
                  style={{ color: `${post.theme.text}90` }}
                >
                  <span>Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/vibefeed?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded-full text-sm hover:underline"
                      style={{
                        backgroundColor: `${post.theme.accent}20`,
                        color: post.theme.accent,
                      }}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div
              className="mt-12 p-8 rounded-lg shadow-lg"
              style={{ backgroundColor: `${post.theme.accent}10` }}
            >
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: post.theme.accent }}
              >
                Inspired by This Vibe?
              </h3>
              <p className="mb-6 text-lg" style={{ color: post.theme.text }}>
                Shop our curated collection of aesthetic decor and RGB lights to bring this look to your space!
              </p>
              <div className="flex flex-wrap gap-4">
                {/* <Link
                  href="/shop" // Replace with actual shop page URL
                  className="px-6 py-3 rounded-full text-lg font-medium"
                  style={{ backgroundColor: post.theme.accent, color: post.theme.text }}
                >
                  Shop RoomVibe
                </Link> */}
                <Link
                  href="/vibefeed"
                  className="px-6 py-3 rounded-full text-lg font-medium border"
                  style={{
                    borderColor: post.theme.accent,
                    color: post.theme.accent,
                  }}
                >
                  More VibeFeed Posts
                </Link>
                <a
                  href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://roomvibe.vercel.app/vibefeed/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-lg font-medium"
                  style={{ backgroundColor: post.theme.text, color: post.theme.background }}
                >
                  Share on X
                </a>
              </div>
            </div>

            {/* Related Posts */}
{relatedPosts.length > 0 && (
  <div className="mt-12">
    <h3
      className="text-2xl font-semibold mb-6"
      style={{ color: post.theme.accent }}
    >
      More Vibe Inspiration
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedPosts.map(relatedPost => (
        <Link
          key={relatedPost.id}
          href={`/vibefeed/${relatedPost.slug}`}
          className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[rgba(var(--theme-background),0.1)] backdrop-blur-md border border-[rgba(var(--theme-accent),0.2)]"
          style={{
            backgroundColor: `${post.theme.background}10`,
            borderColor: `${post.theme.accent}20`,
          }}
          aria-label={`Read more about ${relatedPost.title}`}
        >
          <div className="relative h-48 w-full">
            <Image
              src={relatedPost.image}
              alt={relatedPost.title}
              fill
              className="object-cover"
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
          <div className="p-3 sm:p-4">
            <h4
              className="text-base sm:text-lg font-bold mb-2"
              style={{ color: post.theme.accent }}
            >
              {relatedPost.title}
            </h4>
            <p
              className="text-xs sm:text-sm line-clamp-2"
              style={{ color: `${post.theme.text}90` }}
            >
              {relatedPost.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}
</div>

          {/* Table of Contents (Sticky on Desktop) */}
          {tableOfContents.length > 0 && (
            <aside className="lg:w-64 lg:sticky lg:top-24 lg:self-start hidden lg:block">
              <div
                className="p-6 rounded-lg shadow-md"
                style={{ backgroundColor: `${post.theme.text}10` }}
              >
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: post.theme.accent }}
                >
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
          )}
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}