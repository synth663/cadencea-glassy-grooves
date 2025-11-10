import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useNavigate } from "react-router-dom";
import ParticipantService from "./ParticipantService";

export default function MyBookings() {
  const nav = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await ParticipantService.getMyBookings();
      setBookings(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        My Bookings
      </Typography>

      {loading ? (
        <Typography>Loading…</Typography>
      ) : bookings.length === 0 ? (
        <Typography color="text.secondary">No bookings yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {bookings.map((b) => (
            <Grid item xs={12} key={b.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    gap={2}
                  >
                    <Stack direction="row" alignItems="center" gap={1}>
                      <ConfirmationNumberIcon />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Booking #{b.id}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={2}>
                      <Stack direction="row" gap={1} alignItems="center">
                        <CalendarMonthIcon fontSize="small" />
                        <Typography variant="body2">
                          {new Date(b.created_at).toLocaleString()}
                        </Typography>
                      </Stack>
                      <Chip
                        label={b.status?.toUpperCase() || "CONFIRMED"}
                        color={b.status === "cancelled" ? "error" : "success"}
                        size="small"
                      />
                      <Stack direction="row" gap={1} alignItems="center">
                        <PaymentsIcon fontSize="small" />
                        <Typography variant="body2">
                          Total: ₹ {Number(b.total_amount || 0).toFixed(2)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    {b.booked_events.map((be) => (
                      <Grid item xs={12} md={6} key={be.id}>
                        <Card
                          variant="outlined"
                          sx={{ borderRadius: 2, height: "100%" }}
                        >
                          <CardContent>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600 }}
                            >
                              {be.event_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Team size: {be.participants_count} • Cost: ₹{" "}
                              {Number(be.line_total || 0).toFixed(2)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                              sx={{ mt: 0.5 }}
                            >
                              Slot #{be.slot} • {be.slot_info?.date} •{" "}
                              {be.slot_info?.start_time} -{" "}
                              {be.slot_info?.end_time}
                            </Typography>

                            <Stack direction="row" gap={1} sx={{ mt: 1.5 }}>
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => nav(`/ticket/${be.id}`)}
                              >
                                View Ticket
                              </Button>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
