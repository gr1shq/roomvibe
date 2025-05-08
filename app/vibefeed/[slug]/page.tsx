import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import blogPosts from '../../../data/blog_post.json';

type ContentItem = {
  type: 'heading' | 'paragraph';
  text: string;
  url?: string;
  temuUrl?: string;
  aliexpressUrl?: string;
  image?: string;
};

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
  theme: { background: string; text: string; accent: string };
  content: ContentItem[];
}

const typedBlogPosts: BlogPost[] = blogPosts as BlogPost[];

export async function generateStaticParams() {
  return typedBlogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = typedBlogPosts.find(post => post.slug === slug);

  if (!post) {
    return { title: 'Post Not Found | RoomVibe' };
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
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
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

  const tableOfContents = post.content
    .filter(item => item.type === 'heading')
    .map(item => ({
      text: item.text,
      id: item.text.toLowerCase().replace(/\s+/g, '-'),
    }));

  const relatedPosts = typedBlogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <nav className="mb-4 text-sm text-gray-600">
              <Link href="/" className="hover:text-pink-600">Home</Link> {' '}
              <Link href="/vibefeed" className="hover:text-pink-600">Vibe Feed</Link>{' '}
              <span>{post.title}</span>
            </nav>
            <Link
              href="/vibefeed"
              className="flex items-center mb-8 text-pink-600 hover:underline text-lg font-medium"
            >
              ← Back to Vibe Feed
            </Link>
            <div className="mb-12">
              <span className="inline-block px-3 py-1 bg-pink-600 text-white text-sm font-medium rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>{post.author}</span>
              </div>
              <div className="relative h-64 md:h-80 w-full rounded-md overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover opacity-90"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </div>
            </div>
            {tableOfContents.length >= 4 && (
              <div className="block lg:hidden mb-8 p-3 rounded-md bg-gray-50 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Table of Contents</h3>
                <ul className="space-y-1.5">
                  {tableOfContents.map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-xs text-gray-600 hover:text-pink-600 transition-colors duration-200"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="prose prose-lg max-w-none text-gray-900 bg-gradient-to-r from-pink-50 to-white rounded-md p-6">
              {post.content.map((item, index) => {
                const itemId = item.type === 'heading' ? item.text.toLowerCase().replace(/\s+/g, '-') : undefined;
                return (
                  <div key={index} id={itemId} className="mb-10">
                    {item.type === 'heading' && (
                      <div className="mt-12 mb-8 flex flex-col items-start gap-4">
                        <h2 className="text-2xl font-semibold text-gray-900">{item.text}</h2>
                        {item.image && (
                          <div className="relative w-64 h-64 mx-auto my-6 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.text}
                              fill
                              className="object-contain"
                              quality={75}
                              sizes="256px"
                              loading="lazy"
                            />
                          </div>
                        )}
                        {(item.url || item.temuUrl || item.aliexpressUrl) && (
                          <div className="flex flex-wrap gap-2">
                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 p-1.5 rounded-md border border-pink-600 hover:bg-pink-100 active:bg-pink-200 hover:scale-105 transition-all duration-200 ${index === 1 || index === post.content.length - 2 ? 'bg-pink-50' : ''}`}
                                title="Shop on Amazon"
                              >
                                <Image
                                  src="/img/amazon-logo.jpg"
                                  alt="Amazon"
                                  width={index === 1 || index === post.content.length - 2 ? 32 : 24}
                                  height={index === 1 || index === post.content.length - 2 ? 32 : 24}
                                  className="object-contain"
                                />
                                <span className="text-xs font-medium text-pink-600 hover:underline">Shop</span>
                              </a>
                            )}
                            {item.temuUrl && (
                              <a
                                href={item.temuUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 p-1.5 rounded-md border border-pink-600 hover:bg-pink-100 active:bg-pink-200 hover:scale-105 transition-all duration-200 ${index === 1 || index === post.content.length - 2 ? 'bg-pink-50' : ''}`}
                                title="Shop on Temu"
                              >
                                <Image
                                  src="/img/temu-logo.png"
                                  alt="Temu"
                                  width={index === 1 || index === post.content.length - 2 ? 32 : 24}
                                  height={index === 1 || index === post.content.length - 2 ? 32 : 24}
                                  className="object-contain"
                                />
                                <span className="text-xs font-medium text-pink-600 hover:underline">Shop</span>
                              </a>
                            )}
                            {item.aliexpressUrl && (
                              <a
                                href={item.aliexpressUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 p-1.5 rounded-md border border-pink-600 hover:bg-pink-100 active:bg-pink-200 hover:scale-105 transition-all duration-200 ${index === 1 || index === post.content.length - 2 ? 'bg-pink-50' : ''}`}
                                title="Shop on AliExpress"
                              >
                                <Image
                                  src="/img/aliexpress-logo.jpeg"
                                  alt="AliExpress"
                                  width={index === 1 || index === post.content.length - 2 ? 32 : 24}
                                  height={index === 1 || index === post.content.length - 2 ? 32 : 24}
                                  className="object-contain"
                                />
                                <span className="text-xs font-medium text-pink-600 hover:underline">Shop</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {item.type === 'paragraph' && (
                      <p className="mb-6 leading-relaxed text-gray-600">
                        {index === 1 && item.type === 'paragraph' ? (
                          <span className="block text-lg italic text-pink-600 border-l-4 border-pink-600 pl-4">
                            {item.text}
                          </span>
                        ) : (
                          item.text
                        )}
                      </p>
                    )}
                    {index < post.content.length - 1 && item.type !== 'heading' && (
                      <hr className="my-6 border-gray-200" />
                    )}
                  </div>
                );
              })}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <span>Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/vibefeed?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-pink-600 text-white text-sm rounded-full hover:bg-pink-500 active:bg-pink-600 transition-colors duration-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-12 p-6 rounded-md bg-pink-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Inspired by This Vibe?
              </h3>
              <p className="mb-6 text-base text-gray-600">
                Shop our curated collection of aesthetic decor to bring this look to your space!
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={post.content.find(item => item.type === 'heading' && item.url)?.url || 'https://amzn.to/default'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 active:bg-pink-600 hover:scale-105 transition-all duration-200"
                >
                  Shop Top Picks
                </a>
                <Link
                  href="/categories"
                  className="px-6 py-3 text-base font-medium text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50 active:bg-pink-100 transition-all duration-200"
                >
                  Explore Categories
                </Link>
                <Link
                  href="/vibefeed"
                  className="px-6 py-3 text-base font-medium text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50 active:bg-pink-100 transition-all duration-200"
                >
                  More Vibe Feed Posts
                </Link>
                <a
                  href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://roomvibe.vercel.app/vibefeed/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-base font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 active:bg-gray-900 transition-all duration-200"
                >
                  Share on X
                </a>
              </div>
            </div>
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 bg-gradient-to-r from-pink-50 to-white rounded-md p-3">More Vibe Inspiration</h3>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-hide">
                  {relatedPosts.map(relatedPost => (
                    <Link
                      key={relatedPost.id}
                      href={`/vibefeed/${relatedPost.slug}`}
                      className="snap-start flex-shrink-0 w-[240px] sm:w-[280px] bg-white rounded-md shadow-sm hover:scale-105 active:scale-95 transition-transform duration-200"
                    >
                      <div className="relative h-56 w-full">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover rounded-t-md opacity-90"
                          quality={75}
                          sizes="280px"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-pink-600 text-white text-xs font-medium rounded-full">
                          {relatedPost.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="text-base font-medium text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-200">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedPosts.length === 0 && (
              <div className="mt-12 text-center">
                <p className="text-base text-gray-600">
                  No related posts yet.{' '}
                  <Link href="/vibefeed" className="text-pink-600 hover:underline font-medium">
                    Explore all Vibe Feed posts
                  </Link>
                </p>
              </div>
            )}
          </div>
          {tableOfContents.length > 0 && (
            <aside className="lg:w-64 lg:sticky lg:top-24 lg:self-start hidden lg:block">
              <div className="p-6 rounded-md bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Table of Contents
                </h3>
                <ul className="space-y-2">
                  {tableOfContents.map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200"
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
      <Footer />
    </div>
  );
}