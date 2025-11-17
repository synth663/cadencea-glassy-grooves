import { useState, useEffect, useRef } from "react";
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
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock data - replace with actual data from your backend/state
  const currentSong = {
    id: searchParams.get("id") || "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    year: "1975",
    coverUrl: null, // Will use placeholder
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Demo audio file
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

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    // Set initial volume
    audio.volume = volume / 100;

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
  }, [volume]);

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: bgGradient }}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentSong.audioUrl} preload="metadata" />
      
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
          onSeek={handleSeek}
          onVolumeChange={setVolume}
        />
      </div>
    </div>
  );
}
