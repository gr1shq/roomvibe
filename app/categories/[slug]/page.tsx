// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import categories from '../../../data/categories.json';
import products from '../../../data/products_list.json';
import blogPosts from '../../../data/blog_post.json'; // Added for blog post integration
import ItemCard from '@/app/(components)/ItemCard';
import Footer from '@/app/(components)/Footer';
import Header from '@/app/(components)/Header';
import Image from 'next/image';

// Define interfaces
interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  theme: {
    background: string;
    text: string;
    accent: string;
  };
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  affiliateLinkAmazon: string;
  affiliateLinkTemu: string;
  affiliateLinkAliExpress?: string; // Optional to match ItemCard props
}

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
  content: Array<{
    type: 'heading' | 'paragraph';
    text: string;
  }>;
}

// Type the imported data
const typedCategories: Category[] = categories as Category[];
const typedProducts: Product[] = products as Product[];
const typedBlogPosts: BlogPost[] = blogPosts as BlogPost[];

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return typedCategories.map(category => ({
    slug: category.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = typedCategories.find(category => category.slug === params.slug);

  if (!category) {
    return {
      title: 'Category Not Found | RoomVibe',
    };
  }

  return {
    title: `${category.name} | RoomVibe`,
    description: category.description,
    keywords: category.name.split(' ').join(', '),
    openGraph: {
      title: category.name,
      description: category.description,
      images: [{ url: category.image, alt: category.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: category.name,
      description: category.description,
      images: [category.image],
    },
    alternates: {
      canonical: `/categories/${params.slug}`,
    },
  };
}

// Define the page component
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Await params if it's a Promise
  const resolvedParams = 'then' in params ? await params : params;
  const category = typedCategories.find(category => category.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  // Filter products and blog posts for this category
  const allProducts = typedProducts.filter(product => product.category === category.name);
  const relatedPosts = typedBlogPosts.filter(post => post.category === category.name);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header />
      </header>

      <main
        className="flex-grow transition-colors duration-300"
        style={{
          backgroundColor: category.theme.background,
          color: category.theme.text,
        }}
      >
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs for UX */}

          {/* Category Header */}
          <div className="max-w-4xl mb-8">
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ color: category.theme.accent }}
            >
              {category.name}
            </h1>
            <p className="text-lg md:text-xl leading-loose">{category.description}</p>
          </div>

          {/* Featured Image */}
          {category.image && (
            <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                priority
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Products Section */}
          <section className="mb-12">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: category.theme.accent }}
            >
              Products in {category.name}
            </h2>
            {allProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allProducts.map(product => (
                  <ItemCard
                    key={product.id}
                    img={product.image}
                    title={product.name}
                    category={product.category}
                    price={product.price}
                    amazonLink={product.affiliateLinkAmazon}
                    aliexpressLink={product.affiliateLinkAliExpress}
                    temuLink={product.affiliateLinkTemu}
                  />
                ))}
              </div>
            ) : (
              <p className="text-lg">No products found in this category.</p>
            )}
          </section>

          {/* Related Blog Posts Section (Optional) */}
          {relatedPosts.length > 0 && (
            <section>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: category.theme.accent }}
              >
                Related Blog Posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                  <Link
                    key={post.id}
                    href={`/vibe-feed/${post.slug}`}
                    className="block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    style={{ backgroundColor: `${category.theme.background}80` }}
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        quality={75}
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{ color: category.theme.text }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-sm mb-2"
                        style={{ color: `${category.theme.text}90` }}
                      >
                        {post.description}
                      </p>
                      <span
                        className="text-xs"
                        style={{ color: `${category.theme.text}80` }}
                      >
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
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
            '@type': 'CollectionPage',
            name: category.name,
            description: category.description,
            image: category.image,
            publisher: {
              '@type': 'Organization',
              name: 'RoomVibe',
              logo: {
                '@type': 'ImageObject',
                url: '/logo.png', // Replace with actual logo URL
              },
            },
          }),
        }}
      />
    </div>
  );
}