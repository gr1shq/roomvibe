import Image from "next/image";
import Link from "next/link";

interface BlogPostProps {
  id: number;
  image: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  slug: string;
}

const BlogCard = ({ id, image, title, category, date, excerpt, slug }: BlogPostProps) => {
  return (
    <Link href={`/vibefeed/${slug}`}>
      <div
        className="w-[280px] sm:w-[320px] rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative h-48 w-full group">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-pink-600/0 group-hover:bg-pink-600/10 transition-all duration-300"></div>
          <span className="absolute bottom-3 left-3 px-2 py-1 bg-pink-100 text-pink-800 text-xs font-medium rounded-full">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-1">{date}</p>
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">{excerpt}</p>
          <span className="text-sm text-pink-600 font-medium hover:underline">
            Read More
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;