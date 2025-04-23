import Image from "next/image"
import Link from "next/link"

interface ItemCardProps {
    img: string
    title: string
    category: string
    price: string
    button: string
    button2: string
    link: string
    link2: string
}

const ItemCard = ({img, title, category, price, button, button2, link, link2}: ItemCardProps) => {
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image 
          src={img} 
          alt={title} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {title}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            {category}
        </p>
        
        <p className="text-green-500 text-sm mb-4 line-clamp-3">
          {price}
        </p>

        {/* Platform labels */}
        <div className="flex justify-between mb-2 text-xs font-semibold">
          <span className="text-orange-600">AliExpress</span>
          <span className="text-red-500">Temu</span>
        </div>
        
        {/* AliExpress button - orange/red gradient with shopping cart icon */}
        <Link href={link} target="_blank">
          <button className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-md font-bold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {button}
          </button>
        </Link>

        {/* Temu button - bright red with rocket icon */}
        <Link href={link2} target="_blank">
          <button className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-md font-bold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {button2}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ItemCard