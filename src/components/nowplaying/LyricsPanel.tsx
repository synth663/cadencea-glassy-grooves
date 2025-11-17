import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Gauge, Type } from "lucide-react";
import { cn } from "@/lib/utils";

interface LyricLine {
  time: number;
  text: string;
  active: boolean;
}

interface LyricsPanelProps {
  lyrics: LyricLine[];
  accentColor: string;
}

export function LyricsPanel({ lyrics, accentColor }: LyricsPanelProps) {
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    }
  }, [lyrics]);

  const hasLyrics = lyrics && lyrics.length > 0;

  return (
    <div className="glass-effect rounded-2xl p-6 h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/30">
        <Button variant="ghost" size="sm" className="gap-2">
          <Gauge className="w-4 h-4" />
          Tempo
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Type className="w-4 h-4" />
          Syllables
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Zap className="w-4 h-4" />
          Sync
        </Button>
      </div>

      {/* Lyrics or Fallback */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {hasLyrics ? (
          <div className="space-y-6 py-8">
            {lyrics.map((line, index) => (
              <div
                key={index}
                ref={line.active ? activeLineRef : null}
                className={cn(
                  "transition-all duration-300 text-center leading-relaxed",
                  line.active 
                    ? "text-2xl font-medium scale-105" 
                    : "text-lg text-muted-foreground opacity-60"
                )}
                style={{
                  color: line.active ? accentColor : undefined,
                  textShadow: line.active ? `0 0 20px ${accentColor}40` : "none",
                }}
              >
                {line.text}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-muted-foreground text-center">
              No lyrics found — try Auto-Sync
            </p>
            <Button className="gap-2" style={{ backgroundColor: accentColor }}>
              <Zap className="w-4 h-4" />
              Auto-Sync Lyrics
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
