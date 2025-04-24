// app/vibe-feed/[slug]/page.tsx
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import blogPosts from '../../../data/blog_post.json';

// Define a type for content items
type ContentItem = {
  type: 'heading' | 'paragraph' | 'list'; // Added 'list' for richer content
  text?: string;
  items?: string[]; // For list items
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
  readingTime?: string; // Added for UX
}

// Type the blogPosts import
const typedBlogPosts: BlogPost[] = blogPosts as BlogPost[];

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return typedBlogPosts.map(post => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = typedBlogPosts.find(post => post.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | RoomVibe',
    };
  }

  return {
    title: `${post.title} | RoomVibe`,
    description: post.description,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.image, alt: post.title }],
      type: 'article',
      publishedTime: post.date,
      authors: post.author,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    alternates: {
      canonical: `/vibefeed/${params.slug}`,
    },
  };
}

// Define the page component
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }; // Handle both Promise and object
}) {
  // Await params if it's a Promise (for async compatibility)
  const resolvedParams = 'then' in params ? await params : params;
  const post = typedBlogPosts.find(post => post.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Generate TOC for UX
  const toc = post.content
    .filter(item => item.type === 'heading')
    .map((item, index) => ({
      id: `section-${index}`,
      text: item.text || '',
    }));

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
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Breadcrumbs for UX */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <Link href="/" style={{ color: post.theme.accent }}>
              Home
            </Link>{' '}
            &gt;{' '}
            <Link href="/vibefeed" style={{ color: post.theme.accent }}>
              Vibe Feed
            </Link>{' '}
            &gt; <span style={{ color: post.theme.text }}>{post.title}</span>
          </nav>

          {/* Table of Contents for UX */}
          {toc.length > 0 && (
            <div className="sticky top-4 self-start mb-8">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: post.theme.accent }}
              >
                Table of Contents
              </h3>
              <ul className="list-none">
                {toc.map(item => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} style={{ color: post.theme.text }}>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Header */}
          <article>
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
              className="text-3xl md:text-5xl font-bold mb-4"
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
              {post.readingTime && (
                <div className="flex items-center">{post.readingTime}</div>
              )}
            </div>

            {/* Featured Image */}
            <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Article Content */}
            <div className="max-w-none">
              {post.content.map((item, index) => {
                switch (item.type) {
                  case 'heading':
                    return (
                      <h2
                        key={index}
                        id={`section-${index}`}
                        className="text-2xl font-bold mt-8 mb-4"
                        style={{ color: post.theme.accent }}
                      >
                        {item.text}
                      </h2>
                    );
                  case 'paragraph':
                    return (
                      <p
                        key={index}
                        className="mb-6 leading-loose"
                        style={{ color: post.theme.text }}
                      >
                        {item.text}
                      </p>
                    );
                  case 'list':
                    return (
                      <ul
                        key={index}
                        className="list-disc pl-6 mb-6"
                        style={{ color: post.theme.text }}
                      >
                        {item.items?.map((listItem, i) => (
                          <li key={i}>{listItem}</li>
                        ))}
                      </ul>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div
                className="mt-12 pt-8"
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

            {/* Social Sharing for UX */}
            <div className="flex gap-4 mt-8">
              <a
                href={`https://x.com/intent/post?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/vibe-feed/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: post.theme.accent }}
              >
                Share on X
              </a>
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/vibe-feed/${post.slug}`
                )}&description=${encodeURIComponent(post.description)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: post.theme.accent }}
              >
                Pin on Pinterest
              </a>
            </div>
          </article>
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
            author: {
              '@type': 'Organization',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'RoomVibe',
              logo: {
                '@type': 'ImageObject',
                url: '/favicon.ico', // Replace with actual logo URL
              },
            },
            image: post.image,
            keywords: post.tags,
          }),
        }}
      />
    </div>
  );
}