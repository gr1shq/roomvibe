import { notFound } from 'next/navigation';
import Head from 'next/head';
import categories from '../../../data/categories.json';
import products from '../../../data/products_list.json';
import ItemCard from '@/app/(components)/ItemCard';
import Footer from '@/app/(components)/Footer';
import Header from '@/app/(components)/Header';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  affiliateLinkAmazon: string;
  affiliateLinkTemu: string;
  affiliateLinkAliExpress: string;
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((category: Category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((category: Category) => category.slug === slug) as Category | undefined;

  if (!category) {
    notFound();
  }

  const allProducts = products
    .filter((product: Product) => product.category === category.name)
    .slice(0, 12); // Cap at 12 products

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>{`${category.name} | RoomVibe Aesthetic Decor`}</title>
        <meta
          name="description"
          content={`Discover ${category.name} decor at RoomVibe. ${category.description}`}
        />
        <meta
          name="keywords"
          content={`${category.name.toLowerCase()}, aesthetic room decor, RGB lights, cozy essentials`}
        />
        <link rel="canonical" href={`https://www.roomvibe.vercel.app/categories/${slug}`} />
      </Head>

      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              {category.name}
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              {category.description}
            </p>
          </div>

          {allProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No products available in this category yet.{' '}
                <Link
                  href="/products"
                  className="text-pink-600 hover:underline font-medium"
                >
                  Explore all products
                </Link>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
              {allProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="relative w-[260px] sm:w-[300px] mx-auto hover:scale-105 transition-transform duration-300"
                >
                  <ItemCard
                    img={product.image}
                    title={product.name}
                    category={product.category}
                    price={product.price}
                    amazonLink={product.affiliateLinkAmazon}
                    aliexpressLink={product.affiliateLinkAliExpress || undefined}
                    temuLink={product.affiliateLinkTemu}
                  />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-pink-600 text-white text-xs rounded-full z-10">
                      Top Pick
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/categories"
              className="inline-block px-6 py-3 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 transition-all duration-300"
            >
              Explore More
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}