import Image from "next/image"
import Link from "next/link"


interface BlogPostProps {
    id: number
    image: string
    title: string
    category: string
    date: string
    excerpt: string
}


const BlogCard = ({id, image, title, category, date, excerpt}: BlogPostProps ) => {
  return (
    <div>
        <div 
              key={id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                  {category}
                </div>
              </div>
              
              <div className="p-6">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {date}
                </span>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-2 mb-3 line-clamp-2">
                  {title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {excerpt}
                </p>
                <Link 
                  href={`/vibe-feed/${id}`}
                  className="inline-flex items-center text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
    </div>
  )
}

export default BlogCard
