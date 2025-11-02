import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Play } from "lucide-react";

const PlaylistDetail = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would be fetched based on the id
  const playlist = {
    id: id,
    title: "Rock Classics",
    coverArt: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop",
    songCount: 5,
  };

  const songs = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      title: "Bohemian Rhapsody",
      duration: "5:55",
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop",
      title: "Stairway to Heaven",
      duration: "8:02",
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop",
      title: "Hotel California",
      duration: "6:30",
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
      title: "Sweet Child O' Mine",
      duration: "5:56",
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=100&h=100&fit=crop",
      title: "Dream On",
      duration: "4:27",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Playlist Header */}
        <div className="glass-effect rounded-2xl p-8 mb-8 flex items-center gap-8">
          <img
            src={playlist.coverArt}
            alt={playlist.title}
            className="w-48 h-48 rounded-xl object-cover shadow-lg"
          />
          <div>
            <p className="text-sm text-muted-foreground mb-2">PLAYLIST</p>
            <h1 className="text-5xl font-bold text-gradient mb-4">{playlist.title}</h1>
            <p className="text-muted-foreground">{playlist.songCount} songs</p>
          </div>
        </div>

        {/* Songs Table */}
        <div className="glass-effect rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-muted-foreground font-medium w-16">#</th>
                <th className="text-left p-4 text-muted-foreground font-medium w-16"></th>
                <th className="text-left p-4 text-muted-foreground font-medium">Title</th>
                <th className="text-right p-4 text-muted-foreground font-medium w-24">Duration</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => (
                <tr
                  key={song.id}
                  className="group hover:bg-secondary/30 transition-all duration-300 cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center justify-center">
                      <span className="group-hover:hidden">{index + 1}</span>
                      <Play className="h-4 w-4 hidden group-hover:block fill-primary text-primary" />
                    </div>
                  </td>
                  <td className="p-4">
                    <img
                      src={song.thumbnail}
                      alt={song.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4">
                    <span className="font-medium">{song.title}</span>
                  </td>
                  <td className="p-4 text-right text-muted-foreground">
                    {song.duration}
                  </td>
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

export default PlaylistDetail;
