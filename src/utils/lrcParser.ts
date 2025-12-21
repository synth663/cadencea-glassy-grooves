export interface LyricLine {
  time: number; // in seconds
  text: string;
  active: boolean;
}

export function parseLRC(lrcContent: string): LyricLine[] {
  const lines = lrcContent.split('\n');
  const lyrics: LyricLine[] = [];
  
  // Regex to match [mm:ss.xx] timestamp format
  const timeRegex = /\[(\d{2}):(\d{2}\.\d{2})\]/;
  
  for (const line of lines) {
    const match = line.match(timeRegex);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseFloat(match[2]);
      const timeInSeconds = minutes * 60 + seconds;
      
      // Extract text after the timestamp
      const text = line.replace(timeRegex, '').trim();
      
      // Only add non-empty lyrics
      if (text) {
        lyrics.push({
          time: timeInSeconds,
          text,
          active: false,
        });
      }
    }
  }
  
  return lyrics;
}
