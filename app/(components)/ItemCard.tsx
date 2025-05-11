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
  <div className="bg-white rounded-md shadow-sm w-[260px] sm:w-[300px] min-h-[400px] flex flex-col transition-transform duration-300">
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
        <p className="text-sm text-gray-600 mt-1">{category}</p>
        <p className="text-base font-semibold text-gray-900 mt-1">{price}</p>
        <p className="text-sm italic text-gray-500 mt-1">Prices are approximate and may vary by seller.</p>
      </div>
      <div className="flex gap-3 flex-wrap mt-4">
        {amazonLink && (
          <Link
            target="_blank"
            href={amazonLink}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-sm"
            aria-label={`Buy ${title} on Amazon`}
          >
            <Image src="/img/amazon-logo.jpg" alt="Amazon" width={20} height={20} className="mr-2" />
            Amazon
          </Link>
        )}
        {temuLink && (
          <Link
            target="_blank"
            href={temuLink}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-sm"
            aria-label={`Buy ${title} on Temu`}
          >
            <Image src="/img/temu-logo.png" alt="Temu" width={20} height={20} className="mr-2" />
            Temu
          </Link>
        )}
        {aliexpressLink && (
          <Link
            target="_blank"
            href={aliexpressLink}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-sm"
            aria-label={`Buy ${title} on AliExpress`}
          >
            <Image src="/img/aliexpress-logo.jpeg" alt="AliExpress" width={20} height={20} className="mr-2" />
            AliExpress
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default ItemCard;