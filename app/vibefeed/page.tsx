// app/vibe-feed/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import Header from '../(components)/Header'
import Footer from '../(components)/Footer'
import blogPosts from '../../data/blog_post.json'

export default function VibeFeed() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header />
      </header>
      
      <main className="flex-grow bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
              Vibe Feed
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Curated inspiration, design secrets, and fresh vibes for your space
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-6 rounded-full" />
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-2 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <Link 
                    href={`/vibefeed/${post.slug}`}
                    className="inline-flex items-center text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Message */}
          {blogPosts.length === 1 && (
            <div className="text-center mt-20">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                More Vibes Coming Soon...
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                We're brewing fresh content to elevate your space. Stay tuned for regular drops of design inspiration, 
                DIY tips, and vibe makeovers.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  )
}