"use client";

import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  img: string;
  name: string;
  slug: string;
}

const CategoryCard = ({ img, name, slug }: CategoryCardProps) => {
  return (
    <Link
      href={`/categories/${slug}`}
      aria-label={`Explore ${name} category`}
      className="group block"
    >
      <div className="w-[260px] sm:w-[300px] overflow-hidden transition-all duration-300 hover:bg-gray-50">
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={img}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {name}
          </h2>
          <p className="text-sm font-medium text-pink-600 mt-1 transition-colors duration-300 group-hover:underline group-hover:text-pink-700">
            Explore this vibe
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;