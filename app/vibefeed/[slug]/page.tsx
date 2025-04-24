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
  type: 'heading' | 'paragraph';
  text: string;
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
  const resolvedParams = 'then' in params ? await params : params;
  const post = typedBlogPosts.find(post => post.slug === resolvedParams.slug);

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
      canonical: `/vibe-feed/${resolvedParams.slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }; // Fixed type to support both Promise and object
}) {
  const resolvedParams = 'then' in params ? await params : params; // Resolve params
  const post = typedBlogPosts.find(post => post.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            href="/vibefeed"
            className="flex items-center mb-8 transition-colors hover:opacity-80"
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
                priority
                quality={75} // Added for SEO (image optimization)
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-none">
            {post.content.map((item, index) => {
              switch (item.type) {
                case 'heading':
                  return (
                    <h2
                      key={index}
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
                      className="mb-6 leading-relaxed"
                      style={{ color: post.theme.text }}
                    >
                      {item.text}
                    </p>
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
                url: '/logo.png', // Replace with actual logo URL
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