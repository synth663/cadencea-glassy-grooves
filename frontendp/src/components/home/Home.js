import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to the Karaoke App 🎤</h1>

      <p style={styles.text}>
        Sing your favorite songs, view synced lyrics, and enjoy a smooth karaoke
        experience.
      </p>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/songs")}>
          🎶 Browse Songs
        </button>

        <button style={styles.button} onClick={() => navigate("/profile")}>
          👤 View Profile
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
  },
  header: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "40px",
    color: "#555",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#1e88e5",
    color: "white",
  },
};
