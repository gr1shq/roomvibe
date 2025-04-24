// app/vibe-feed/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import blogPosts from '../../../data/blog_post.json';

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}

// Generate minimal metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found | RoomVibe',
    };
  }

  return {
    title: `${post.title} | RoomVibe`,
    description: post.description,
    alternates: {
      canonical: `/vibe-feed/${slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href="/vibe-feed"
        className="flex items-center text-pink-500 hover:text-pink-600 mb-8 transition-colors"
      >
        Back to Vibe Feed
      </Link>

      {/* Article Header */}
      <div className="mb-12">
        <span className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 mb-6">
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
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.content.map((item, index) => {
          switch (item.type) {
            case 'heading':
              return (
                <h2
                  key={index}
                  className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-white"
                >
                  {item.text}
                </h2>
              );
            case 'paragraph':
              return (
                <p
                  key={index}
                  className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed"
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
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <span className="text-gray-500 dark:text-gray-400">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Minimal Structured Data for SEO */}
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