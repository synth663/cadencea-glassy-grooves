import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import GroupIcon from "@mui/icons-material/Group";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";
import ParticipantService from "./ParticipantService";

export default function TicketPage() {
  const { bookedEventId } = useParams();
  const nav = useNavigate();

  const [bookedEvent, setBookedEvent] = useState(null);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  const ticketRef = useRef(null);

  const load = async () => {
    setLoading(true);
    try {
      // 1) booked event
      const beRes = await ParticipantService.getBookedEvent(bookedEventId);
      const be = beRes.data;
      setBookedEvent(be);

      // 2) event details (for venue)
      if (be?.event) {
        const detRes = await ParticipantService.getEventDetailsByEvent(
          be.event
        );
        const details = detRes.data?.[0] || null;
        setVenue(details?.venue || null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookedEventId]);

  const downloadImage = async () => {
    if (!ticketRef.current) return;
    const canvas = await html2canvas(ticketRef.current, {
      scale: 2, // nice crisp
      backgroundColor: "#ffffff",
    });
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `ticket_${bookedEventId}.png`;
    link.click();
  };

  if (loading) {
    return <Box sx={{ p: 4 }}>Loading ticket…</Box>;
  }

  if (!bookedEvent) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Ticket not found.</Typography>
        <Button
          sx={{ mt: 2 }}
          onClick={() => nav(-1)}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Box>
    );
  }

  const evName = bookedEvent.event_name;
  const date = bookedEvent.slot_info?.date;
  const start = bookedEvent.slot_info?.start_time;
  const end = bookedEvent.slot_info?.end_time;
  const team = bookedEvent.participants_count;
  const total = Number(bookedEvent.line_total || 0).toFixed(2);

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 720 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => nav(-1)}>
            Back
          </Button>

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={downloadImage}
          >
            Download
          </Button>
        </Stack>

        {/* The ticket */}
        <Card
          ref={ticketRef}
          sx={{
            borderRadius: 4,
            boxShadow: 6,
            overflow: "hidden",
            background:
              "linear-gradient(180deg, #ffffff 0%, #fafafa 70%, #f5f7ff 100%)",
          }}
        >
          {/* Top header bar */}
          <Box
            sx={{
              px: 4,
              py: 3,
              borderBottom: "1px dashed #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background:
                "linear-gradient(90deg, #111827, #1f2937 50%, #374151 100%)",
              color: "#fff",
            }}
          >
            <Stack direction="row" alignItems="center" gap={1.5}>
              <ConfirmationNumberIcon />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Entry Ticket
              </Typography>
            </Stack>
            <Chip
              label="CONFIRMED"
              color="success"
              variant="filled"
              size="small"
              sx={{ fontWeight: 700 }}
            />
          </Box>

          <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
            {/* Event name big */}
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 1, letterSpacing: 0.3 }}
            >
              {evName}
            </Typography>

            {/* Info grid */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              gap={3}
              sx={{ mt: 1 }}
            >
              <Stack direction="row" alignItems="center" gap={1.5}>
                <CalendarMonthIcon color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1">{date}</Typography>
                </Box>
              </Stack>

              <Stack direction="row" alignItems="center" gap={1.5}>
                <AccessTimeIcon color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Time
                  </Typography>
                  <Typography variant="body1">
                    {start} — {end}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" alignItems="center" gap={1.5}>
                <PlaceIcon color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Venue
                  </Typography>
                  <Typography variant="body1">{venue || "—"}</Typography>
                </Box>
              </Stack>

              <Stack direction="row" alignItems="center" gap={1.5}>
                <GroupIcon color="action" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Team Size
                  </Typography>
                  <Typography variant="body1">{team}</Typography>
                </Box>
              </Stack>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Participants */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Participants
            </Typography>
            {bookedEvent.participants?.length ? (
              <Stack gap={1}>
                {bookedEvent.participants.map((p) => (
                  <Stack
                    key={p.id}
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid #eee",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {p.email || "No email"} · {p.phone_number || "No phone"}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Typography color="text.secondary">
                No participants found.
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography color="text.secondary">Total Paid</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                ₹ {total}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
