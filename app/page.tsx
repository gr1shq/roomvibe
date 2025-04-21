import Footer from "./(components)/Footer";
import Header from "./(components)/Header";
import CategoriesSection from "./(sections)/CategoriesSection";
import HeroSection from "./(sections)/Hero";
import Slide from "./(sections)/Slide";
import WhyRoomVibe from "./(sections)/WhyRoomVibe";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Slide />
      <CategoriesSection />
      <WhyRoomVibe />
      <Footer />
    </div>
  );
}
