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
    <Link href={`/categories/${slug}`}>
      <div className="w-[260px] sm:w-[300px] rounded-md overflow-hidden bg-white shadow-sm hover:shadow-sm transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-48 w-full">
          <Image
            src={img}
            alt={name}
            fill
            className="object-cover rounded-t-md opacity-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {name}
          </h2>
          <p className="text-sm font-medium text-pink-600 mt-1 hover:underline">
            Explore this vibe
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;