import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrendingCarousel } from "@/components/TrendingCarousel";
import { RecommendedSongs } from "@/components/RecommendedSongs";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TrendingCarousel />
      <RecommendedSongs />
      <Footer />
    </div>
  );
};

export default Index;
