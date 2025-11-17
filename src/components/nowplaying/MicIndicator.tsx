import { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

type MicState = "idle" | "recording" | "denied";

export function MicIndicator() {
  const [micState, setMicState] = useState<MicState>("idle");

  useEffect(() => {
    // Check microphone permission
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => setMicState("idle"))
      .catch(() => setMicState("denied"));
  }, []);

  return (
    <div className="absolute top-6 left-6 flex items-center gap-2">
      <div className="relative">
        <div 
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center glass-effect transition-all duration-300",
            micState === "recording" && "animate-pulse",
            micState === "denied" && "opacity-50"
          )}
          style={{
            backgroundColor: micState === "recording" ? "hsl(0 84% 60% / 0.2)" : "transparent",
            boxShadow: micState === "recording" ? "0 0 20px hsl(0 84% 60% / 0.4)" : "none",
          }}
        >
          {micState === "denied" ? (
            <MicOff className="w-5 h-5 text-destructive" />
          ) : (
            <Mic className="w-5 h-5 text-destructive" />
          )}
        </div>
        
        {micState === "recording" && (
          <div className="absolute inset-0 rounded-full border-2 border-destructive/40 animate-ping" />
        )}
      </div>

      {micState === "denied" && (
        <div className="glass-effect px-3 py-1 rounded-lg text-xs text-destructive-foreground">
          Mic required for recording
        </div>
      )}
    </div>
  );
}
