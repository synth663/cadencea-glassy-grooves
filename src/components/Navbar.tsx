import { useState } from "react";
import { Search, Library, User, Heart, ListMusic, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AuthDialog } from "@/components/AuthDialog";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gradient">Cadencea</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search songs, artists, or playlists..."
                className="w-full pl-12 rounded-full glass-effect border-border/50 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
                  <Library className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-effect border-border/50 bg-card/95 backdrop-blur-xl">
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => navigate("/saved-songs")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Saved Songs</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => navigate("/playlists")}
                >
                  <ListMusic className="mr-2 h-4 w-4" />
                  <span>Playlists</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => navigate("/history")}
                >
                  <History className="mr-2 h-4 w-4" />
                  <span>History</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button 
              className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
              onClick={() => setAuthDialogOpen(true)}
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-12 rounded-full glass-effect border-border/50"
            />
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};
