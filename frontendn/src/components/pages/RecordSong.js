import React, { useState, useRef } from "react";
import AxiosInstance from "../Axios";

export default function RecordSong() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [songName, setSongName] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      chunksRef.current = [];
      setAudioBlob(blob);
      setAudioURL(URL.createObjectURL(blob));
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const uploadSong = async () => {
    if (!audioBlob || !songName) {
      alert("Please record a song and enter a name.");
      return;
    }

    const formData = new FormData();
    formData.append("name", songName);
    formData.append("file", audioBlob, `${songName}.webm`);

    try {
      await AxiosInstance.post("/songs/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Song uploaded successfully!");
      setSongName("");
      setAudioURL(null);
      setAudioBlob(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎙 Record Your Song</h2>

      <input
        type="text"
        placeholder="Enter song name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        style={styles.input}
      />

      <div style={styles.buttonContainer}>
        {!isRecording ? (
          <button style={styles.recordBtn} onClick={startRecording}>
            🔴 Start Recording
          </button>
        ) : (
          <button style={styles.stopBtn} onClick={stopRecording}>
            ⏹ Stop Recording
          </button>
        )}
      </div>

      {audioURL && (
        <div style={styles.playerContainer}>
          <p>Preview:</p>
          <audio controls src={audioURL} />
        </div>
      )}

      {audioBlob && (
        <button style={styles.uploadBtn} onClick={uploadSong}>
          ⬆️ Upload Song
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  title: { marginBottom: "15px" },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  buttonContainer: { marginBottom: "15px" },
  recordBtn: {
    background: "#d9534f",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  stopBtn: {
    background: "#0275d8",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  uploadBtn: {
    background: "#5cb85c",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    marginTop: "15px",
    cursor: "pointer",
  },
  playerContainer: { marginTop: "15px" }
};
