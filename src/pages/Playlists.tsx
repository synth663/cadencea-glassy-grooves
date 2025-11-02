import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Grid, List, MoreVertical, Share2, Trash2, UserPlus, ChevronRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Playlists = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedPlaylist, setExpandedPlaylist] = useState<number | null>(null);
  const navigate = useNavigate();

  // Mock songs for expanded view
  const mockSongs = [
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
  ];

  const playlists = [
    {
      id: 1,
      title: "Rock Classics",
      coverArt: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop",
      songCount: 42,
    },
    {
      id: 2,
      title: "Party Hits",
      coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      songCount: 35,
    },
    {
      id: 3,
      title: "80s & 90s",
      coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      songCount: 58,
    },
    {
      id: 4,
      title: "Karaoke Favorites",
      coverArt: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
      songCount: 28,
    },
    {
      id: 5,
      title: "Pop Collection",
      coverArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
      songCount: 51,
    },
    {
      id: 6,
      title: "Love Songs",
      coverArt: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=400&fit=crop",
      songCount: 33,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">My Playlists</h1>
            <p className="text-muted-foreground">{playlists.length} playlists</p>
          </div>
          <div className="flex gap-2 glass-effect rounded-full p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-all ${
                viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/50"
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-all ${
                viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/50"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="glass-effect rounded-xl p-4 hover:bg-secondary/30 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/playlists/${playlist.id}`)}
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.coverArt}
                    alt={playlist.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-effect border-border/50 bg-card/95 backdrop-blur-xl">
                      <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50">
                        <Share2 className="mr-2 h-4 w-4" />
                        <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Invite Collaborators</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-destructive/50 text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="font-semibold mb-1">{playlist.title}</h3>
                <p className="text-sm text-muted-foreground">{playlist.songCount} songs</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-effect rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-muted-foreground font-medium w-12"></th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Playlist</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Songs</th>
                  <th className="text-right p-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {playlists.map((playlist) => (
                  <>
                    <tr
                      key={playlist.id}
                      className="group hover:bg-secondary/30 transition-all duration-300 cursor-pointer border-b border-border/50"
                      onClick={() => setExpandedPlaylist(expandedPlaylist === playlist.id ? null : playlist.id)}
                    >
                      <td className="p-4">
                        <ChevronRight
                          className={`h-5 w-5 transition-transform duration-300 ${
                            expandedPlaylist === playlist.id ? "rotate-90" : ""
                          }`}
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={playlist.coverArt}
                            alt={playlist.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <span className="font-medium">{playlist.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{playlist.songCount} songs</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button 
                                className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="glass-effect border-border/50 bg-card/95 backdrop-blur-xl">
                              <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50">
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50">
                                <UserPlus className="mr-2 h-4 w-4" />
                                <span>Invite Collaborators</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer hover:bg-destructive/50 text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                    {expandedPlaylist === playlist.id && (
                      <tr>
                        <td colSpan={4} className="p-0">
                          <div className="bg-secondary/20 animate-accordion-down">
                            <table className="w-full">
                              <tbody>
                                {mockSongs.map((song, index) => (
                                  <tr
                                    key={song.id}
                                    className="group hover:bg-secondary/30 transition-all duration-300 cursor-pointer"
                                  >
                                    <td className="p-3 pl-16 w-16">
                                      <div className="flex items-center justify-center">
                                        <span className="group-hover:hidden text-sm">{index + 1}</span>
                                        <Play className="h-3 w-3 hidden group-hover:block fill-primary text-primary" />
                                      </div>
                                    </td>
                                    <td className="p-3 w-16">
                                      <img
                                        src={song.thumbnail}
                                        alt={song.title}
                                        className="w-10 h-10 rounded-lg object-cover"
                                      />
                                    </td>
                                    <td className="p-3">
                                      <span className="font-medium text-sm">{song.title}</span>
                                    </td>
                                    <td className="p-3 text-right text-muted-foreground text-sm pr-8">
                                      {song.duration}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Playlists;
