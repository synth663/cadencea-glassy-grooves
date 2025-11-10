// src/components/participant/ParticipantEventGrid.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import ParticipantService from "./ParticipantService";
import ParticipantEventCard from "./ParticipantEventCard";
import ParticipantCountModal from "./modals/ParticipantCountModal";
import ParticipantDetailsModal from "./modals/ParticipantDetailsModal";
import SlotPickModal from "./modals/SlotPickModal";

export default function ParticipantEventGrid() {
  const { user, loading } = useAuth();
  const nav = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [fetching, setFetching] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // flow state
  const [activeEvent, setActiveEvent] = useState(null);
  const [constraint, setConstraint] = useState(null);
  const [participantsCount, setParticipantsCount] = useState(1);
  const [participantsData, setParticipantsData] = useState([]);
  const [pickedSlot, setPickedSlot] = useState(null);

  // modals
  const [openCount, setOpenCount] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openSlot, setOpenSlot] = useState(false);

  const loadEvents = async () => {
    setFetching(true);
    try {
      const res = await ParticipantService.getAllEvents();
      setEvents(res.data);
    } catch {
      setAlert({
        open: true,
        message: "Failed to load events",
        severity: "error",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const requireLogin = () => {
    if (loading) return false;
    if (!user) {
      nav("/login");
      return false;
    }
    return true;
  };

  const startAddToCart = async (event) => {
    if (!requireLogin()) return;

    setActiveEvent(event);
    setParticipantsData([]);
    setPickedSlot(null);

    let c = null;
    if (event.constraint_id) {
      try {
        const res = await ParticipantService.getConstraintById(
          event.constraint_id
        );
        c = res.data;
      } catch {
        c = null;
      }
    }

    setConstraint(c); // storing for later

    // ------------------ FLOW DECISION RIGHT HERE ------------------
    if (!c || c.booking_type === "single") {
      setParticipantsCount(1);
      setOpenDetails(true);
      return;
    }

    if (c.booking_type === "multiple" && c.fixed) {
      setParticipantsCount(c.upper_limit || 1);
      setOpenDetails(true);
      return;
    }

    // multiple and not fixed
    setOpenCount(true);
  };

  const handleCountChosen = (n) => {
    setOpenCount(false);
    setParticipantsCount(n);
    setOpenDetails(true);
  };

  const handleParticipantsCollected = (list) => {
    setParticipantsData(list);
    setOpenDetails(false);
    setOpenSlot(true);
  };

  const handleSlotPicked = async (slot) => {
    setPickedSlot(slot);
    setOpenSlot(false);

    try {
      const cartRes = await ParticipantService.getOrCreateCart();
      const cartId = cartRes.data.id;

      const cartItemRes = await ParticipantService.createCartItem({
        cart: cartId,
        event: activeEvent.id,
        participants_count: participantsCount,
      });
      const cartItemId = cartItemRes.data.id;

      for (const p of participantsData) {
        await ParticipantService.createTempBooking({
          cart_item: cartItemId,
          name: p.name,
          email: p.email || null,
          phone_number: p.phone_number || null,
        });
      }

      await ParticipantService.createTempTimeslot({
        cart_item: cartItemId,
        slot: slot.id,
      });

      setAlert({ open: true, message: "Added to cart!", severity: "success" });

      // reset flow
      setActiveEvent(null);
      setConstraint(null);
      setParticipantsCount(1);
      setParticipantsData([]);
      setPickedSlot(null);
    } catch (e) {
      console.error(e);
      setAlert({
        open: true,
        message: "Failed to add to cart.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        🛒 Browse Events
      </Typography>

      <TextField
        placeholder="Search events..."
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {fetching ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {events
            .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
            .map((ev) => (
              <Grid item xs={12} sm={6} md={4} key={ev.id}>
                <ParticipantEventCard
                  event={ev}
                  onAddToCart={() => startAddToCart(ev)}
                />
              </Grid>
            ))}
        </Grid>
      )}

      {!!activeEvent && (
        <ParticipantCountModal
          open={openCount}
          onClose={() => {
            setOpenCount(false);
            setActiveEvent(null);
            setConstraint(null);
          }}
          constraint={constraint}
          onChoose={handleCountChosen}
        />
      )}

      {!!activeEvent && (
        <ParticipantDetailsModal
          open={openDetails}
          onClose={() => {
            setOpenDetails(false);
            setActiveEvent(null);
            setConstraint(null);
          }}
          count={participantsCount}
          onComplete={handleParticipantsCollected}
        />
      )}

      {!!activeEvent && (
        <SlotPickModal
          open={openSlot}
          onClose={() => {
            setOpenSlot(false);
            setActiveEvent(null);
            setConstraint(null);
          }}
          event={activeEvent}
          participantsCount={participantsCount}
          onPick={handleSlotPicked}
          fetchSlots={(eventId) => ParticipantService.getEventSlots(eventId)}
        />
      )}

      <Snackbar
        open={alert.open}
        autoHideDuration={3500}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
    </Box>
  );
}
