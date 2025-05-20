"use client";

import Image from "next/image";
import Link from "next/link";

interface InspirationCardProps {
  image: string;
  title: string;
  slug: string;
  basePath: string;
  description?: string; // Optional for category or room description
  category?: string; // Optional for category badge
  product?: {
    // Optional for hover effect on slug pages
    id: number;
    name: string;
    image: string;
    affiliate_url: string;
    price: number;
  };
  isFeatured?: boolean; // Optional for "Featured Vibe" badge
}

const InspirationCard = ({
  image,
  title,
  slug,
  basePath,
  description,
  category,
  product,
  isFeatured = false,
}: InspirationCardProps) => {
  return (
    <div
      className="bg-white rounded-md shadow-sm hover:scale-105 transition-transform duration-300 group"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <Link href={`${basePath}/${slug}`} itemProp="url">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-t-md opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            itemProp="image"
          />
          {category && (
            <div className="absolute bottom-4 left-4 bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
              {category}
            </div>
          )}
          {isFeatured && !category && (
            <span className="absolute top-2 left-2 px-2 py-1 bg-pink-600 text-white text-xs rounded-full">
              Featured Vibe
            </span>
          )}
          {product && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <div className="text-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="mx-auto mb-2 rounded-md"
                />
                <p className="text-sm font-medium text-white">{product.name}</p>
                <p className="text-sm text-white">${product.price.toFixed(2)}</p>
                <Link
                  href={product.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-3 py-1 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500"
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                >
                  Shop Now
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h4
            className="text-lg font-medium text-gray-900 mt-2 mb-3 line-clamp-2"
            itemProp="name"
          >
            {title}
          </h4>
          {description && (
            <p
              className="text-sm text-gray-600 line-clamp-3"
              itemProp="description"
            >
              {description}
            </p>
          )}
          <div className="mt-3">
            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 transition-colors duration-300">
              Explore
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InspirationCard;