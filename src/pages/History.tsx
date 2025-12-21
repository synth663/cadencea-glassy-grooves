import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Play, Download, Share2, History as HistoryIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  
  const tracks = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
      title: "Bohemian Rhapsody",
      duration: "5:55"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      title: "Sweet Child O' Mine",
      duration: "5:56"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop",
      title: "Don't Stop Believin'",
      duration: "4:11"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop",
      title: "Livin' on a Prayer",
      duration: "4:09"
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=100&h=100&fit=crop",
      title: "I Want It That Way",
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
              <HistoryIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">History</h1>
              <p className="text-muted-foreground">Your recently played songs</p>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-muted-foreground font-medium w-12">#</th>
                <th className="text-left p-4 text-muted-foreground font-medium w-16"></th>
                <th className="text-left p-4 text-muted-foreground font-medium">Title</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Duration</th>
                <th className="text-center p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track) => (
                <tr 
                  key={track.id}
                  className="group hover:bg-secondary/30 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                >
                  <td className="p-4 text-muted-foreground">{track.id}</td>
                  <td className="p-4">
                    <img 
                      src={track.thumbnail} 
                      alt={track.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium">{track.title}</td>
                  <td className="p-4 text-muted-foreground">{track.duration}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => navigate(`/now-playing?id=${track.id}`)}
                        className="p-2 rounded-full hover:bg-primary/20 transition-colors group-hover:glow-effect"
                      >
                        <Play className="h-4 w-4 text-primary fill-current" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-accent/20 transition-colors">
                        <Download className="h-4 w-4 text-accent" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-neon-cyan/20 transition-colors">
                        <Share2 className="h-4 w-4 text-neon-cyan" />
                      </button>
                    </div>
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

export default History;
