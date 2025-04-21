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

        
        
{/* Amazon-style button - bold, orange, with a gradient effect */}
<Link href={link} target="_blank">
<button className="w-full py-2 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-md font-bold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
    {button}
</button>
</Link>

{/* Temu-style button - bright red, playful, with a slight shadow */}
<Link href={link2} target="_blank">
<button className="w-full py-2 px-4 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors shadow-sm hover:shadow-md mt-4">
  {button2}
</button>
</Link>
      </div>
    </div>
  )
}

export default ItemCard