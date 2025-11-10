// src/components/participant/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ParticipantService from "./ParticipantService";

export default function CheckoutPage() {
  const nav = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await ParticipantService.getCart();
      setCart(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const lineTotal = (item) =>
    Number(item.event_price || 0) * Number(item.participants_count || 0) || 0;

  const grandTotal =
    cart?.items?.reduce((sum, it) => sum + lineTotal(it), 0) || 0;

  if (loading) return <Box sx={{ p: 4 }}>Loading...</Box>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Your cart is empty.</Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => nav("/cart")}>
          Back to cart
        </Button>
      </Box>
    );
  }

  const handlePlaceBooking = async () => {
    try {
      const res = await ParticipantService.placeBooking();
      const bookingId = res.data.id;
      nav(`/booking-success/${bookingId}`);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to place booking");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        {/* LEFT SIDE - ORDER SUMMARY */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Order Summary
              </Typography>

              {cart.items.map((item) => (
                <Box key={item.id} sx={{ mb: 2 }}>
                  <Typography variant="h6">{item.event_name}</Typography>
                  <Typography variant="body2">
                    Price per participant: ₹
                    {Number(item.event_price).toFixed(2)}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Team size: <b>{item.participants_count}</b>
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Slot:{" "}
                    <b>
                      {item.temp_timeslot
                        ? `Slot #${item.temp_timeslot.slot}`
                        : "Not selected"}
                    </b>
                  </Typography>

                  <Typography sx={{ mt: 1, fontWeight: 600 }}>
                    Participants:
                  </Typography>
                  {item.temp_participants.map((p) => (
                    <Typography key={p.id} variant="caption" display="block">
                      • {p.name} — {p.email || "No email"} —{" "}
                      {p.phone_number || "No phone"}
                    </Typography>
                  ))}

                  <Typography sx={{ mt: 1, fontWeight: 600 }}>
                    Cost: ₹ {lineTotal(item).toFixed(2)}
                  </Typography>

                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}

              <Typography variant="h6" sx={{ mt: 2, textAlign: "right" }}>
                Total: ₹ {grandTotal.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT SIDE - PAYMENT AND BOOK BUTTON */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Payment
            </Typography>

            {/* Later Payment UI Will Come Here */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Payment integration will be here later.
            </Typography>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handlePlaceBooking}
            >
              Book Now
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
