import { useState } from "react";
import { GripVertical, Play, X, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QueueItem {
  id: string;
  title: string;
  artist: string;
  duration: number;
}

interface QueuePanelProps {
  queue: QueueItem[];
}

export function QueuePanel({ queue }: QueuePanelProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(false);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-effect rounded-2xl p-6 h-full flex flex-col">
      {/* Queue Controls */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/30">
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-2", isShuffled && "text-primary")}
          onClick={() => setIsShuffled(!isShuffled)}
        >
          <Shuffle className="w-4 h-4" />
          Shuffle
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-2", repeatMode && "text-primary")}
          onClick={() => setRepeatMode(!repeatMode)}
        >
          <Repeat className="w-4 h-4" />
          Repeat
        </Button>
      </div>

      {/* Queue List */}
      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {queue.map((item, index) => (
          <div
            key={item.id}
            className="glass-effect rounded-xl p-3 flex items-center gap-3 group hover:bg-primary/10 transition-all duration-200 cursor-pointer"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-8 text-center text-sm text-muted-foreground">
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.title}</p>
              <p className="text-sm text-muted-foreground truncate">{item.artist}</p>
            </div>

            <div className="flex items-center gap-2">
              {hoveredId === item.id && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              )}
              
              <span className="text-sm text-muted-foreground bg-muted/30 px-2 py-1 rounded-md min-w-[48px] text-center">
                {formatDuration(item.duration)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
