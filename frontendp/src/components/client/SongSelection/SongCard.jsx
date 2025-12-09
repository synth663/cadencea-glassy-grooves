import React from "react";
import { useNavigate } from "react-router-dom";

const SongCard = ({ song }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/songs/${song.id}`)}
      style={{
        cursor: "pointer",
        borderRadius: "8px",
        padding: "10px",
        background: "#1e1e1e",
        color: "white",
        boxShadow: "0 0 5px rgba(255,255,255,0.1)",
      }}
    >
      <img
        src={song.cover_image}
        alt="Cover"
        style={{ width: "100%", height: "180px", borderRadius: "8px" }}
      />
      <h3>{song.title}</h3>
      <p>Artist ID: {song.artist}</p>
    </div>
  );
};

export default SongCard;
