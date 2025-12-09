import React, { useEffect, useState } from "react";
import ClientService from "../ClientService";
import SongGrid from "./SongGrid";

const SongSelectionPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ClientService.getSongs()
      .then((res) => {
        setSongs(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading songs...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Select a Song</h1>
      <SongGrid songs={songs} />
    </div>
  );
};

export default SongSelectionPage;
