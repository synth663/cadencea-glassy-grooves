import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function BookingSuccessPage() {
  const nav = useNavigate();
  const { id } = useParams();

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Booking Confirmed! ✅
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Your Booking ID: {id}
      </Typography>

      <Button variant="contained" onClick={() => nav("/home")}>
        Go Home
      </Button>
    </Box>
  );
}
