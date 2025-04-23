import Head from 'next/head';
import categories from '../../data/categories.json';
import CategoryCard from '../(components)/CategoryCard';
import Header from '../(components)/Header';
import Footer from '../(components)/Footer';

const Page = () => {
  return (
    <div className="min-h-screen bg-[#100720]">
      <Head>
        <title>RoomVibe Categories | Aesthetic Room Decor & RGB Lights</title>
        <meta
          name="description"
          content="Explore RoomVibe is curated categories of aesthetic room decor, RGB lights, cozy essentials, and more. Find your perfect room vibe today!"
        />
        <meta name="keywords" content="aesthetic room decor, RGB lights, cozy room essentials, room vibe categories" />
        <link rel="canonical" href="https://www.roomvibe.vercel.app/categories" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                ${categories
                  .map(
                    (category, index) => `
                  {
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "url": "https://www.roomvibe.com/category/${category.slug}"
                  }
                `
                  )
                  .join(',')}
              ]
            }
          `}
        </script>
      </Head>
      <header>
      <Header />
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="flex flex-col gap-3 mb-12 md:mb-16">
          <h1 className="text-[#F0EFFF] font-bold text-4xl md:text-6xl text-center">
            Explore Aesthetic Room Decor by Category
          </h1>
          <h2 className="text-[#B8B5FF] font-bold text-2xl md:text-3xl text-center">
            Find Cozy Lights, RGB Setups, and More for Your Perfect Room Vibe
          </h2>
          <p className="text-[#D3D3FF] max-w-3xl mx-auto text-center mt-4">
            At RoomVibe, we curate the best aesthetic room decor to transform your space. Browse our categories to discover RGB lights for gaming setups, cozy essentials for relaxing vibes, and smart devices for modern rooms.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map((category) => (
            <div key={category.id} className="w-[280px] sm:w-[320px]">
              <CategoryCard img={category.image} name={category.name} slug={category.slug} />
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        {/* <section className="my-12 text-center">
          <h3 className="text-[#F0EFFF] font-bold text-2xl mb-4">
            Join the RoomVibe Community
          </h3>
          <p className="text-[#D3D3FF] mb-4">Get exclusive room decor tips and deals!</p>
          <form className="flex justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-lg bg-[#1A0B3A] text-[#D3D3FF] w-full"
            />
            <button className="p-2 bg-[#B8B5FF] text-[#100720] rounded-r-lg">
              Subscribe
            </button>
          </form>
        </section> */}
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  );
};

export default Page;