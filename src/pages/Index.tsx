import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrendingCarousel } from "@/components/TrendingCarousel";
import { RecommendedSongs } from "@/components/RecommendedSongs";
import { Footer } from "@/components/Footer";

const Index = () => {
  const trendingRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleGetStarted = () => {
    trendingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    
    // Focus search bar after scroll completes
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 800);
  };

  return (
    <div className="min-h-screen">
      <Navbar searchInputRef={searchInputRef} />
      <Hero onGetStarted={handleGetStarted} />
      <div ref={trendingRef}>
        <TrendingCarousel />
      </div>
      <RecommendedSongs />
      <Footer />
    </div>
  );
};

export default Index;
