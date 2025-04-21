import categories from '../../data/categories.json'
import CategoryCard from '../(components)/CategoryCard'
import Header from '../(components)/Header'
import Footer from '../(components)/Footer'

const Page = () => {
  return (
    <div className="min-h-screen bg-[#100720]">
      <header>
        <Header />
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="flex flex-col gap-3 mb-12 md:mb-16">
          <h1 className="text-[#F0EFFF] font-bold text-4xl md:text-6xl text-center">
            Explore Room Vibes by Category
          </h1>
          <h2 className="text-[#B8B5FF] font-bold text-2xl md:text-3xl text-center">
            Find your favorite aesthetic essentials by theme — from cozy lights to RGB setups.
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 ">
          {categories.map((category) => (
            <div key={category.id} className="w-[280px] sm:w-[320px]"> {/* Fixed width for cards */}
              <CategoryCard img={category.image} name={category.name} slug={category.slug} />
            </div>
          ))}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Page