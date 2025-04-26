import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  img: string;
  name: string;
  slug: string
}

const CategoryCard = ({ img, name, slug }: CategoryCardProps) => {
  return (
    <Link href={`/categories/${slug}`}>
    <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Blurred Background Image */}
      <div className="absolute inset-0">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover blur-[2px] brightness-75"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      
      {/* Centered Text */}
      <div className="relative h-full flex items-center justify-center p-4 text-center">
        <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
          {name}
        </h2>
      </div>
    </div>
    </Link>
  );
};

export default CategoryCard;