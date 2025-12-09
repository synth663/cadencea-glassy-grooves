import React from "react";
import SongCard from "./SongCard";

const SongGrid = ({ songs }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
      }}
    >
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
};

export default SongGrid;
