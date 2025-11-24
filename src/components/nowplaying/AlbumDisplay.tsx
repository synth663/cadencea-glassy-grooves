import { Music } from "lucide-react";

interface Song {
  title: string;
  artist: string;
  album?: string;
  year?: string;
  coverUrl?: string | null;
}

interface AlbumDisplayProps {
  song: Song;
  accentColor: string;
}

export function AlbumDisplay({ song, accentColor }: AlbumDisplayProps) {
  return (
    <div className="w-full max-w-sm space-y-4">
      {/* Album Cover */}
      <div 
        className="aspect-square rounded-2xl glass-effect overflow-hidden flex items-center justify-center"
        style={{ boxShadow: `0 8px 32px ${accentColor}30` }}
      >
        {song.coverUrl ? (
          <img 
            src={song.coverUrl} 
            alt={song.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted/20">
            <Music className="w-20 h-20 text-muted-foreground/40" />
          </div>
        )}
      </div>

      {/* Song Metadata */}
      <div className="text-center space-y-2 px-4">
        <h1 className="text-2xl font-semibold text-foreground">
          {song.title}
        </h1>
        <p className="text-base text-muted-foreground">
          {song.artist}
        </p>
        {song.album && (
          <p className="text-sm text-muted-foreground/60">
            {song.album} {song.year && `• ${song.year}`}
          </p>
        )}
      </div>
    </div>
  );
}
