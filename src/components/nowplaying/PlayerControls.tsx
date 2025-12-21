import { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PlayerControlsProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  accentColor: string;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

export function PlayerControls({
  currentTime,
  duration,
  isPlaying,
  volume,
  accentColor,
  onPlayPause,
  onSeek,
  onVolumeChange,
}: PlayerControlsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewTime, setPreviewTime] = useState<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = Math.max(0, Math.min(duration, percentage * duration));
    onSeek(newTime);
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setPreviewTime(Math.max(0, Math.min(duration, percentage * duration)));
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border/30 backdrop-blur-xl">
      {/* Progress Bar */}
      <div 
        ref={progressRef}
        className="relative h-2 bg-secondary/40 cursor-pointer group"
        onClick={handleProgressClick}
        onMouseMove={handleProgressHover}
        onMouseLeave={() => setPreviewTime(null)}
      >
        <div
          className="absolute top-0 left-0 h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: accentColor,
          }}
        />
        
        {/* Preview bubble */}
        {previewTime !== null && (
          <div
            className="absolute -top-8 glass-effect px-2 py-1 rounded text-xs"
            style={{
              left: `${(previewTime / duration) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            {formatTime(previewTime)}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[100px]">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10"
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14"
            onClick={onPlayPause}
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6" fill="currentColor" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume & Settings */}
        <div className="flex items-center gap-4 min-w-[200px] justify-end">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={([v]) => onVolumeChange(v)}
              max={100}
              className="w-24"
            />
          </div>
          
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
