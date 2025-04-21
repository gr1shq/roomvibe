import { notFound } from 'next/navigation';
import categories from '../../../data/categories.json';
import products from '../../../data/products_list.json';
import ItemCard from '@/app/(components)/ItemCard';
import Footer from '@/app/(components)/Footer';
import Header from '@/app/(components)/Header';

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
  const { slug } = await params; // Await params to get the slug
  const category = categories.find((category: Category) => category.slug === slug) as Category | undefined;

  if (!category) {
    notFound();
  }

  const allProducts = products.filter((product: Product) => product.category === category.name);

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
          <div className="max-w-4xl">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: category.theme.accent }}
            >
              {category.name}
            </h1>
            <h2 className="text-xl md:text-2xl">{category.description}</h2>
          </div>

          {/* Responsive grid for product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
            {allProducts.map((product) => (
              <ItemCard
                key={product.id}
                img={product.image}
                title={product.name}
                category={product.category}
                price={product.price}
                button="See on Amazon"
                button2="See on Temu"
                link={product.affiliateLinkAmazon}
                link2={product.affiliateLinkTemu}
              />
            ))}
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}