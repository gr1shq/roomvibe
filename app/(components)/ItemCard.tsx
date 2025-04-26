import Image from "next/image"
import Link from "next/link"

interface ItemCardProps {
    img: string
    title: string
    category: string
    price: string
    amazonLink?: string  // Optional
    aliexpressLink?: string  // Optional
    temuLink?: string  // Optional
}

const ItemCard = ({ img, title, category, price, amazonLink, aliexpressLink, temuLink }: ItemCardProps) => {
  // Determine which platforms are available
  const availablePlatforms = [
    { name: 'Amazon', link: amazonLink, color: 'yellow-600', 
      bg: 'bg-gradient-to-r from-yellow-400 to-yellow-500', icon: 'smile' },
    { name: 'AliExpress', link: aliexpressLink, color: 'orange-600', 
      bg: 'bg-gradient-to-r from-orange-500 to-red-600', icon: 'cart' },
    { name: 'Temu', link: temuLink, color: 'red-500', 
      bg: 'bg-gradient-to-r from-red-500 to-pink-600', icon: 'rocket' }
  ].filter(platform => platform.link) // Only keep platforms with links

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
          loading="lazy"
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
        
        <div className="mb-4">
  <p className="text-green-500 text-sm font-medium">
    {price}
    <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
      Approximate Price
    </span>
  </p>
  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
    Actual price may vary by retailer
  </p>
</div>

        {/* Platform labels if we have any links */}
        {availablePlatforms.length > 0 && (
          <div className="flex flex-wrap gap-x-4 mb-2 text-xs font-semibold">
            {availablePlatforms.map(platform => (
              <span key={platform.name} className={`text-${platform.color}`}>
                {platform.name}
              </span>
            ))}
          </div>
        )}

        {/* Dynamic buttons - only show if link exists */}
        {availablePlatforms.map(platform => (
          <Link 
            key={platform.name}
            href={platform.link!} 
            target="_blank"
            className="block mb-3 last:mb-0"
          >
            <button className={`w-full py-2 px-4 ${platform.bg} text-${platform.name === 'Amazon' ? 'black' : 'white'} rounded-md font-bold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg flex items-center justify-center gap-2`}>
              {platform.icon === 'smile' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
                  <path d="M12 16c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/>
                  <path d="M12 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/>
                </svg>
              )}
              {platform.icon === 'cart' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
              {platform.icon === 'rocket' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              See on {platform.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ItemCard