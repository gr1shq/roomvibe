'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';
import ItemCard from '@/app/(components)/ItemCard';
import products from '../../data/products_list.json';
import categories from '../../data/categories.json';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = Array.from(
    new Set(products.flatMap((p: any) => p.tags || []))
  ).filter(Boolean);

  const filteredProducts = products
    .filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product: any) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product: any) => {
      if (!selectedPriceRange) return true;
      const price = parseFloat(product.price.replace('$', '')); // Remove $ and parse
      if (isNaN(price)) {
        console.log(`Invalid price for product ${product.name}: ${product.price}`);
        return false; // Skip invalid prices
      }
      return (
        (selectedPriceRange === '0-25' && price <= 25) ||
        (selectedPriceRange === '25-50' && price > 25 && price <= 50) ||
        (selectedPriceRange === '50+' && price > 50)
      );
    })
    .filter((product: any) =>
      selectedTags.length === 0 || selectedTags.every((tag) => product.tags?.includes(tag))
    )
    .sort((a: any, b: any) => b.id - a.id); // Newest first

  // Debug filtered products and price parsing
  useEffect(() => {
    console.log(
      'Filtered Products:',
      filteredProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        parsedPrice: parseFloat(p.price.replace('$', '')),
      }))
    );
  }, [filteredProducts]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumbs */}
          <div className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600">
              Home
            </Link>{' '}
            &gt; Products
          </div>

          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
            All Products
          </h1>

          {/* Filters and Search */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              aria-label="Search products"
            />

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((category: any) => (
                <option key={category.slug} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={selectedPriceRange}
              onChange={(e) => {
                console.log('Selected Price Range:', e.target.value);
                setSelectedPriceRange(e.target.value);
              }}
              className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              aria-label="Filter by price range"
            >
              <option value="">All Prices</option>
              <option value="0-25">$0 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50+">$50+</option>
            </select>
          </div>

          {/* Tag Filters */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Filter by Tags</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTags((prev) =>
                      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                    )
                  }
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTags.includes(tag)
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  } hover:bg-pink-500 hover:text-white transition-all duration-300`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No Products Found
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Try adjusting your filters or explore our categories.
              </p>
              <Link
                href="/categories"
                className="inline-block px-6 py-3 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 transition-all duration-300"
              >
                Explore Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
              {filteredProducts.map((product: any) => (
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
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}