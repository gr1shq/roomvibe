import Image from 'next/image';
import Link from 'next/link';

interface ItemCardProps {
  img: string;
  title: string;
  category: string;
  price: string;
  amazonLink: string;
  aliexpressLink?: string;
  temuLink: string;
}

const ItemCard = ({ img, title, category, price, amazonLink, aliexpressLink, temuLink }: ItemCardProps) => (
  <div className="bg-white rounded-md shadow-sm w-[260px] sm:w-[300px] min-h-[400px] flex flex-col hover:scale-105 transition-transform duration-300">
    <Image
      src={img}
      alt={title}
      width={300}
      height={225}
      className="w-full h-[225px] object-cover rounded-t-md opacity-90"
      loading="lazy"
    />
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600">{category}</p>
        <p className="text-base font-semibold text-gray-900">{price}</p>
      </div>
      <div className="flex gap-2 flex-wrap mt-2">
        {amazonLink && (
          <Link
            target="_blank"
            href={amazonLink}
            className="inline-block px-3 py-1 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 transition-colors duration-300"
          >
            Amazon
          </Link>
        )}
        {temuLink && (
          <Link
            target="_blank"
            href={temuLink}
            className="inline-block px-3 py-1 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 transition-colors duration-300"
          >
            Temu
          </Link>
        )}
        {aliexpressLink && (
          <Link
            target="_blank"
            href={aliexpressLink}
            className="inline-block px-3 py-1 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 transition-colors duration-300"
          >
            AliExpress
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default ItemCard;