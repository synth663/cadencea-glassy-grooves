import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const songs = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", plays: "2.4M", duration: "5:55" },
  { id: 2, title: "Don't Stop Believin'", artist: "Journey", plays: "1.8M", duration: "4:11" },
  { id: 3, title: "Sweet Caroline", artist: "Neil Diamond", plays: "1.5M", duration: "3:22" },
  { id: 4, title: "Livin' on a Prayer", artist: "Bon Jovi", plays: "1.3M", duration: "4:09" },
  { id: 5, title: "I Want It That Way", artist: "Backstreet Boys", plays: "1.2M", duration: "3:33" },
  { id: 6, title: "Total Eclipse of the Heart", artist: "Bonnie Tyler", plays: "1.1M", duration: "5:33" },
];

export const RecommendedSongs = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-8">Recommended For You</h2>

        <div className="space-y-3">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="glass-effect rounded-xl p-4 hover:bg-secondary/40 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground w-8 text-center font-medium">
                  {index + 1}
                </span>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/now-playing?id=${song.id}`)}
                  className="rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-300"
                >
                  <Play className="h-4 w-4 fill-current" />
                </Button>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{song.title}</h3>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>

                <div className="hidden md:block text-muted-foreground text-sm">
                  {song.plays} plays
                </div>

                <div className="text-muted-foreground text-sm">
                  {song.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
