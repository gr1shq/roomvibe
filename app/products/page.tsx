'use client';

import { useState } from 'react';
import products from '@/data/products_list.json';
import categories from '@/data/categories.json';
import ItemCard from '@/app/(components)/ItemCard';
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  affiliateLinkAmazon: string;
  affiliateLinkTemu: string;
  affiliateLinkAliExpress?: string;
  tags?: string[];
}

// Type assertion to ensure products matches Product[]
const typedProducts: Product[] = products as Product[];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleTagsCount, setVisibleTagsCount] = useState(5); // Initial number of tags to show
  const [visibleProductsCount, setVisibleProductsCount] = useState(12); // Initial number of products to show

  // Validate products data
  const validProducts: Product[] = typedProducts.filter((product) => {
    const isValid =
      typeof product.id === 'number' &&
      typeof product.name === 'string' &&
      typeof product.category === 'string' &&
      typeof product.price === 'string' &&
      typeof product.image === 'string' &&
      typeof product.affiliateLinkAmazon === 'string' &&
      typeof product.affiliateLinkTemu === 'string' &&
      (product.affiliateLinkAliExpress === undefined ||
        typeof product.affiliateLinkAliExpress === 'string') &&
      (product.tags === undefined || Array.isArray(product.tags));
    if (!isValid) {
      console.warn('Invalid product:', product);
    }
    return isValid;
  });

  // Get available tags
  const availableTags = Array.from(
    new Set(validProducts.flatMap((p) => p.tags || []))
  ).filter((tag): tag is string => typeof tag === 'string');

  // Filter products
  const filteredProducts = validProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product) => {
      if (!selectedPriceRange) return true;
      const priceStr = product.price.replace('$', '').trim();
      const price = parseFloat(priceStr);
      if (isNaN(price)) {
        console.warn(`Invalid price for product ${product.name}: ${product.price}`);
        return false;
      }
      return (
        (selectedPriceRange === '0-25' && price <= 25) ||
        (selectedPriceRange === '25-50' && price > 25 && price <= 50) ||
        (selectedPriceRange === '50+' && price > 50)
      );
    })
    .filter((product) =>
      selectedTags.length === 0 ||
      selectedTags.every((tag) => product.tags?.includes(tag))
    )
    .sort((a, b) => b.id - a.id); // Newest first

  // Toggle tags visibility
  const toggleTagsVisibility = () => {
    setVisibleTagsCount((prev) =>
      prev === availableTags.length ? 5 : availableTags.length
    );
  };

  // Load more products
  const loadMoreProducts = () => {
    setVisibleProductsCount((prev) => prev + 12); // Load 12 more products
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
            All Products
          </h1>

          {/* Filters */}
          <div className="mb-8 space-y-6">
            {/* Search */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Search
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="mt-1 w-full sm:w-1/2 px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-600 focus:border-pink-600 text-sm sm:text-base"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 w-full sm:w-1/2 px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-600 focus:border-pink-600 text-sm sm:text-base"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price Range
              </label>
              <select
                id="price"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="mt-1 w-full sm:w-1/2 px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-600 focus:border-pink-600 text-sm sm:text-base"
              >
                <option value="">All Prices</option>
                <option value="0-25">$0 - $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50+">$50+</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {availableTags.slice(0, visibleTagsCount).map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTags((prev) =>
                        prev.includes(tag)
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag]
                      )
                    }
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full border ${
                      selectedTags.includes(tag)
                        ? 'bg-pink-600 text-white border-pink-600'
                        : 'bg-white text-gray-600 border-gray-300'
                    } hover:bg-pink-500 hover:text-white transition-colors duration-300`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {availableTags.length > 5 && (
                <button
                  onClick={toggleTagsVisibility}
                  className="mt-3 text-sm text-pink-600 hover:text-pink-700 font-medium focus:outline-none focus:ring-2 focus:ring-pink-600"
                >
                  {visibleTagsCount === availableTags.length
                    ? 'Show Less'
                    : `Show More (${availableTags.length - visibleTagsCount} more)`}
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base sm:text-lg text-gray-600">
                No products found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 py-8">
              {filteredProducts.slice(0, visibleProductsCount).map((product) => (
                <div
                  key={product.id}
                  className="relative w-full max-w-[260px] sm:max-w-[300px] mx-auto transition-transform duration-300"
                >
                  <ItemCard
                    img={product.image}
                    title={product.name}
                    category={product.category}
                    price={product.price}
                    amazonLink={product.affiliateLinkAmazon}
                    aliexpressLink={product.affiliateLinkAliExpress}
                    temuLink={product.affiliateLinkTemu}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleProductsCount < filteredProducts.length && (
            <div className="text-center mt-8">
              <button
                onClick={loadMoreProducts}
                className="px-6 py-2.5 bg-pink-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 transition-colors duration-300"
              >
                Load More ({filteredProducts.length - visibleProductsCount} more)
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}