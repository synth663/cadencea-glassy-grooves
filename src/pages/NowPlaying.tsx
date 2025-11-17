import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AlbumDisplay } from "@/components/nowplaying/AlbumDisplay";
import { LyricsPanel } from "@/components/nowplaying/LyricsPanel";
import { QueuePanel } from "@/components/nowplaying/QueuePanel";
import { PlayerControls } from "@/components/nowplaying/PlayerControls";
import { MicIndicator } from "@/components/nowplaying/MicIndicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NowPlaying() {
  const [searchParams] = useSearchParams();
  const [bgGradient, setBgGradient] = useState("linear-gradient(135deg, hsl(280 80% 20%), hsl(320 85% 25%), hsl(0 0% 5%))");
  const [accentColor, setAccentColor] = useState("hsl(280 80% 60%)");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // 4 minutes default
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(75);

  // Mock data - replace with actual data from your backend/state
  const currentSong = {
    id: searchParams.get("id") || "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    year: "1975",
    coverUrl: null, // Will use placeholder
    duration: 354,
  };

  const queueItems = [
    { id: "2", title: "Don't Stop Believin'", artist: "Journey", duration: 251 },
    { id: "3", title: "Sweet Child O' Mine", artist: "Guns N' Roses", duration: 356 },
    { id: "4", title: "Livin' on a Prayer", artist: "Bon Jovi", duration: 249 },
  ];

  const lyrics = [
    { time: 0, text: "Is this the real life?", active: false },
    { time: 3, text: "Is this just fantasy?", active: false },
    { time: 6, text: "Caught in a landslide", active: true },
    { time: 9, text: "No escape from reality", active: false },
    { time: 12, text: "Open your eyes", active: false },
    { time: 15, text: "Look up to the skies and see", active: false },
  ];

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev < duration ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: bgGradient }}
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60 pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main content area */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 p-6 pb-32">
          {/* Left Half - Album Display */}
          <div className="flex flex-col items-center justify-center space-y-6 relative">
            <MicIndicator />
            <AlbumDisplay song={currentSong} accentColor={accentColor} />
          </div>

          {/* Right Half - Tabs */}
          <div className="flex flex-col">
            <Tabs defaultValue="lyrics" className="flex-1 flex flex-col">
              <TabsList className="glass-effect mb-6 w-fit mx-auto">
                <TabsTrigger value="lyrics" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  Lyrics
                </TabsTrigger>
                <TabsTrigger value="queue" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  Queue
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lyrics" className="flex-1 mt-0">
                <LyricsPanel lyrics={lyrics} accentColor={accentColor} />
              </TabsContent>

              <TabsContent value="queue" className="flex-1 mt-0">
                <QueuePanel queue={queueItems} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Bottom Player Controls */}
        <PlayerControls
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          volume={volume}
          accentColor={accentColor}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onSeek={setCurrentTime}
          onVolumeChange={setVolume}
        />
      </div>
    </div>
  );
}
