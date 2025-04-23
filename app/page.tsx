import Footer from "./(components)/Footer";
import Header from "./(components)/Header";
import CategoriesSection from "./(sections)/CategoriesSection";
import HeroSection from "./(sections)/Hero";
import Slide from "./(sections)/Slide";
import WhyRoomVibe from "./(sections)/WhyRoomVibe";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>RoomVibe | Aesthetic Room Decor & RGB Lights</title>
        <meta
          name="description"
          content="Transform your space with RoomVibe is curated aesthetic room decor, RGB lights, and cozy upgrades. Shop now for the perfect room vibe!"
        />
        <meta name="keywords" content="aesthetic room decor, RGB lights, cozy room upgrades, room vibe ideas" />
        <link rel="canonical" href="https://www.roomvibe.vercel.app" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "RoomVibe",
              "url": "https://www.roomvibe.com",
              "description": "RoomVibe curates aesthetic room decor and mood-setting products like RGB lights.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.roomvibe.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Head>
      <header>
      <Header />
      </header>
      <main>
      <HeroSection />
      <Slide />
      <CategoriesSection />
      <WhyRoomVibe />
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  );
}
