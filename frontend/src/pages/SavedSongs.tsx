import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Play, Heart } from "lucide-react";

const SavedSongs = () => {
  const songs = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: "5:55"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      album: "Appetite for Destruction",
      duration: "5:56"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop",
      title: "Don't Stop Believin'",
      artist: "Journey",
      album: "Escape",
      duration: "4:11"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop",
      title: "Livin' on a Prayer",
      artist: "Bon Jovi",
      album: "Slippery When Wet",
      duration: "4:09"
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=100&h=100&fit=crop",
      title: "I Want It That Way",
      artist: "Backstreet Boys",
      album: "Millennium",
      duration: "3:33"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-full bg-gradient-accent glow-effect">
              <Heart className="h-8 w-8 fill-current" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">Saved Songs</h1>
              <p className="text-muted-foreground">{songs.length} songs saved</p>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-muted-foreground font-medium w-12">#</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Title</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Artist</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Album</th>
                <th className="text-right p-4 text-muted-foreground font-medium">Duration</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr 
                  key={song.id}
                  className="group hover:bg-secondary/30 transition-all duration-300 cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center justify-center w-8">
                      <span className="group-hover:hidden text-muted-foreground">{song.id}</span>
                      <Play className="h-4 w-4 hidden group-hover:block fill-current text-primary" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={song.thumbnail} 
                        alt={song.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium">{song.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{song.artist}</td>
                  <td className="p-4 text-muted-foreground">{song.album}</td>
                  <td className="p-4 text-right text-muted-foreground">{song.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SavedSongs;
