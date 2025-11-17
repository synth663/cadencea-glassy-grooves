import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroProps {
  onGetStarted?: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-semibold mb-6 from-pink-400 to-purple-500 bg-clip-text text-gradient leading-tight">
          Welcome to Cadencea
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 mb-12 font-light">
          Your ultimate karaoke experience awaits
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="text-base"
            onClick={handleGetStarted}
          >
            GET STARTED
          </Button>
        </div>
      </div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-magenta/20 rounded-full blur-3xl"></div>
    </section>
  );
};
