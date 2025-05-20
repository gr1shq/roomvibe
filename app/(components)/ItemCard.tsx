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
  <div className="w-[260px] sm:w-[300px] flex flex-col">
    {/* Image Section */}
    <Image
      src={img}
      alt={title}
      width={300}
      height={200} // Slightly reduced height for balance
      className="w-full h-[200px] object-cover"
      loading="lazy"
    />

    {/* Content Section */}
    <div className="pt-3 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-600 mt-1">{category}</p>
        <p className="text-lg font-bold text-gray-900 mt-2">{price}</p>
        <p className="text-xs text-gray-500 mt-1">Prices are approximate and may vary by seller.</p>
      </div>

      {/* Affiliate Links */}
      <div className="flex gap-2 justify-center mt-3">
        {amazonLink && (
          <Link
            target="_blank"
            href={amazonLink}
            className="p-2 bg-gray-100 rounded-full hover:bg-orange-500 transition-colors duration-300"
            aria-label={`Buy ${title} on Amazon`}
          >
            <Image src="/img/amazon-logo.jpg" alt="Amazon" width={20} height={20} />
          </Link>
        )}
        {temuLink && (
          <Link
            target="_blank"
            href={temuLink}
            className="p-2 bg-gray-100 rounded-full hover:bg-red-500 transition-colors duration-300"
            aria-label={`Buy ${title} on Temu`}
          >
            <Image src="/img/temu-logo.png" alt="Temu" width={20} height={20} />
          </Link>
        )}
        {aliexpressLink && (
          <Link
            target="_blank"
            href={aliexpressLink}
            className="p-2 bg-gray-100 rounded-full hover:bg-blue-500 transition-colors duration-300"
            aria-label={`Buy ${title} on AliExpress`}
          >
            <Image src="/img/aliexpress-logo.jpeg" alt="AliExpress" width={20} height={20} />
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default ItemCard;