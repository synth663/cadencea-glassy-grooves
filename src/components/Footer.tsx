export const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border/50 py-12 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gradient mb-2">Cadencea</h3>
            <p className="text-muted-foreground text-sm">Your ultimate karaoke experience</p>
          </div>

          <div className="flex gap-8">
            <a
              href="#help"
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Help
            </a>
            <a
              href="#faq"
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Cadencea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
