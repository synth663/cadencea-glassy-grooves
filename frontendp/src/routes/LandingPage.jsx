import React, { useState } from "react";
import LoginModal from "./LoginModal"; // Adjust path as necessary
import { motion } from "framer-motion";

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0F0F13", // Dark background to match theme
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      {/* Example Header Content */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: "3rem", marginBottom: "1rem" }}
      >
        Welcome to Cadencea
      </motion.h1>

      <p style={{ color: "#888", marginBottom: "2rem" }}>
        Experience the future of event management.
      </p>

      {/* THE TRIGGER BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsLoginOpen(true)}
        style={{
          padding: "12px 32px",
          fontSize: "1rem",
          fontWeight: "bold",
          color: "white",
          background: "linear-gradient(90deg, #AD30DE 0%, #E1306C 100%)",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(173, 48, 222, 0.4)",
        }}
      >
        Login
      </motion.button>

      {/* THE MODAL COMPONENT */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </div>
  );
}