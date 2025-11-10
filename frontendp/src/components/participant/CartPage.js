// src/components/participant/CartPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  Tooltip,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

import ParticipantService from "./ParticipantService";
import ParticipantDetailsModal from "./modals/ParticipantDetailsModal";
import SlotPickModal from "./modals/SlotPickModal";

export default function CartPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // constraints cache { [eventId]: constraintObj|null }
  const [constraints, setConstraints] = useState({});

  // for adding extra participants (delta)
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalCount, setAddModalCount] = useState(0);
  const [addTargetItem, setAddTargetItem] = useState(null);

  // for changing slot
  const [slotModalOpen, setSlotModalOpen] = useState(false);
  const [slotTargetItem, setSlotTargetItem] = useState(null);
  const [slotTeamCount, setSlotTeamCount] = useState(0);

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

  const showError = (msg) =>
    setAlert({ open: true, message: msg, severity: "error" });
  const showInfo = (msg) =>
    setAlert({ open: true, message: msg, severity: "success" });

  const getConstraint = async (eventId) => {
    if (constraints[eventId] !== undefined) return constraints[eventId];
    try {
      const res = await ParticipantService.getConstraintForEvent(eventId);
      const c = res.data && res.data.length > 0 ? res.data[0] : null;
      setConstraints((prev) => ({ ...prev, [eventId]: c }));
      return c;
    } catch {
      setConstraints((prev) => ({ ...prev, [eventId]: null }));
      return null;
    }
  };

  const canEditCount = (constraint) => {
    if (!constraint) return false; // single
    if (constraint.booking_type === "single") return false;
    if (constraint.booking_type === "multiple" && constraint.fixed)
      return false;
    return true; // multiple open range
  };

  const validateCount = (constraint, newCount) => {
    if (!constraint || constraint.booking_type === "single") {
      return newCount === 1 ? null : "This event allows only one participant.";
    }
    if (constraint.booking_type === "multiple" && constraint.fixed) {
      const target = constraint.upper_limit || 1;
      return newCount === target
        ? null
        : `This fixed event requires exactly ${target} participants.`;
    }
    if (constraint.booking_type === "multiple" && !constraint.fixed) {
      const lo = constraint.lower_limit ?? 1;
      const hi = constraint.upper_limit ?? 1;
      if (newCount < lo || newCount > hi) {
        return `Team size must be between ${lo} and ${hi}.`;
      }
      return null;
    }
    return "Invalid constraint.";
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Remove this event from cart?")) return;
    await ParticipantService.deleteCartItem(itemId);
    await loadCart();
    showInfo("Removed from cart.");
  };

  // Save inline participant row
  const handleSaveParticipant = async (p) => {
    if (!p.name.trim()) return showError("Participant name is required.");
    await ParticipantService.updateTempBooking(p.id, {
      name: p.name,
      email: p.email || null,
      phone_number: p.phone_number || null,
    });
    showInfo("Saved.");
  };

  // Remove participant (only allowed for multiple non-fixed)
  const handleRemoveParticipant = async (item, participant) => {
    const c = await getConstraint(item.event);
    if (!canEditCount(c)) {
      return showError("Cannot remove participants for this event.");
    }
    const newCount = item.participants_count - 1;
    const err = validateCount(c, newCount);
    if (err) return showError(err);

    await ParticipantService.deleteTempBooking(participant.id);
    await ParticipantService.updateCartItem(item.id, {
      participants_count: newCount,
    });

    await loadCart();
    showInfo("Participant removed.");
  };

  // Add one participant (open modal to collect 1 participant)
  const handleAddOneParticipant = async (item) => {
    const c = await getConstraint(item.event);
    if (!canEditCount(c)) {
      return showError("Cannot add participants for this event.");
    }
    const newCount = item.participants_count + 1;
    const err = validateCount(c, newCount);
    if (err) return showError(err);

    setAddTargetItem(item);
    setAddModalCount(1);
    setAddModalOpen(true);
  };

  // after collecting extra participants via modal
  const onAddParticipantsCollected = async (list) => {
    const item = addTargetItem;
    if (!item) return;
    const extra = list.length;

    await ParticipantService.updateCartItem(item.id, {
      participants_count: item.participants_count + extra,
    });

    for (const p of list) {
      await ParticipantService.createTempBooking({
        cart_item: item.id,
        name: p.name,
        email: p.email || null,
        phone_number: p.phone_number || null,
      });
    }

    const updatedCart = (await ParticipantService.getCart()).data;
    const updatedItem = updatedCart.items.find((ci) => ci.id === item.id);
    if (updatedItem?.temp_timeslot?.slot) {
      const slotRes = await ParticipantService.getEventSlotById(
        updatedItem.temp_timeslot.slot
      );
      const s = slotRes.data;
      if (!s.unlimited_participants) {
        const need = updatedItem.participants_count;
        if ((s.available_participants ?? 0) < need) {
          setSlotTargetItem(updatedItem);
          setSlotTeamCount(need);
          setSlotModalOpen(true);
          setAddModalOpen(false);
          await loadCart();
          return;
        }
      }
    }

    setAddTargetItem(null);
    setAddModalOpen(false);
    await loadCart();
    showInfo("Participant added.");
  };

  // change count by directly typing a number and saving
  const [countDraft, setCountDraft] = useState({}); // { [cartItemId]: number }
  const handleCountDraftChange = (itemId, val) => {
    setCountDraft((prev) => ({ ...prev, [itemId]: val }));
  };

  const handleSaveCount = async (item) => {
    const target = Number(countDraft[item.id] ?? item.participants_count);
    const c = await getConstraint(item.event);
    const err = validateCount(c, target);
    if (err) return showError(err);

    const current = item.participants_count;
    if (target === current) return;

    if (target < current) {
      const delta = current - target;
      const toDelete = item.temp_participants.slice(-delta);
      for (const p of toDelete) {
        await ParticipantService.deleteTempBooking(p.id);
      }
      await ParticipantService.updateCartItem(item.id, {
        participants_count: target,
      });
      await loadCart();
      showInfo("Updated team size.");
      return;
    }

    if (target > current) {
      const delta = target - current;
      setAddTargetItem(item);
      setAddModalCount(delta);
      setAddModalOpen(true);
    }
  };

  // change slot
  const handleChangeSlot = (item) => {
    setSlotTargetItem(item);
    setSlotTeamCount(item.participants_count);
    setSlotModalOpen(true);
  };

  const onSlotPicked = async (slot) => {
    const item = slotTargetItem;
    if (!item) return;

    if (item.temp_timeslot) {
      await ParticipantService.updateTempTimeslot(item.temp_timeslot.id, {
        cart_item: item.id,
        slot: slot.id,
      });
    } else {
      await ParticipantService.createTempTimeslot({
        cart_item: item.id,
        slot: slot.id,
      });
    }

    setSlotTargetItem(null);
    setSlotModalOpen(false);
    await loadCart();
    showInfo("Slot updated.");
  };

  // helpers
  const lineTotal = (item) =>
    Number(item.event_price || 0) * Number(item.participants_count || 0) || 0;

  const grandTotal =
    cart?.items?.reduce((sum, it) => sum + lineTotal(it), 0) || 0;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Your Cart
      </Typography>

      {loading ? (
        <Typography>Loading cart…</Typography>
      ) : !cart || !cart.items?.length ? (
        <Typography color="text.secondary">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* LEFT: Cart Items */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {cart.items.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={2}
                      >
                        <Box>
                          <Typography variant="h6">
                            {item.event_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Price per participant: ₹
                            {Number(item.event_price || 0).toFixed(2)}
                          </Typography>
                        </Box>

                        <Stack direction="row" alignItems="center" gap={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Cost: ₹ {lineTotal(item).toFixed(2)}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={2}
                        sx={{ mt: 2 }}
                      >
                        <Stack direction="row" alignItems="center" gap={1}>
                          <TextField
                            label="Team Size"
                            size="small"
                            type="number"
                            sx={{ width: 120 }}
                            value={
                              countDraft[item.id] ?? item.participants_count
                            }
                            onChange={(e) =>
                              handleCountDraftChange(
                                item.id,
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                          />
                          <Tooltip title="Save team size">
                            <span>
                              <IconButton
                                color="primary"
                                onClick={() => handleSaveCount(item)}
                              >
                                <SaveIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Stack>

                        <Tooltip title="Remove from cart">
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>

                      <Divider sx={{ my: 1.5 }} />

                      {/* Participants list */}
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Participants
                      </Typography>

                      {item.temp_participants.map((p) => (
                        <Grid
                          container
                          spacing={1}
                          alignItems="center"
                          key={p.id}
                          sx={{ mb: 1 }}
                        >
                          <Grid item xs={12} md={3}>
                            <TextField
                              size="small"
                              fullWidth
                              label="Name"
                              value={p.name}
                              onChange={(e) =>
                                (p.name = e.target.value) &&
                                setCart({ ...cart })
                              }
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              size="small"
                              fullWidth
                              label="Email"
                              value={p.email || ""}
                              onChange={(e) =>
                                (p.email = e.target.value) &&
                                setCart({ ...cart })
                              }
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              size="small"
                              fullWidth
                              label="Phone"
                              value={p.phone_number || ""}
                              onChange={(e) =>
                                (p.phone_number = e.target.value) &&
                                setCart({ ...cart })
                              }
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Stack direction="row" gap={1}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<SaveIcon />}
                                onClick={() => handleSaveParticipant(p)}
                              >
                                Save
                              </Button>
                              <Button
                                size="small"
                                color="error"
                                startIcon={<RemoveCircleOutlineIcon />}
                                onClick={() => handleRemoveParticipant(item, p)}
                              >
                                Remove
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      ))}

                      {/* Add participant (only when allowed by constraint) */}
                      <Stack direction="row" gap={1} sx={{ mt: 1 }}>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={() => handleAddOneParticipant(item)}
                        >
                          Add Participant
                        </Button>
                      </Stack>

                      <Divider sx={{ my: 1.5 }} />

                      {/* Slot */}
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Typography variant="subtitle2">
                          Selected Slot:
                        </Typography>
                        {item.temp_timeslot ? (
                          <Typography variant="body2">
                            Slot #{item.temp_timeslot.slot}
                          </Typography>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No slot selected.
                          </Typography>
                        )}

                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<ChangeCircleIcon />}
                          onClick={() => handleChangeSlot(item)}
                        >
                          Change Slot
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* RIGHT: Summary */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{ p: 2, borderRadius: 3, position: "sticky", top: 24 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Cart Summary
              </Typography>

              {cart.items.map((it) => (
                <Box key={it.id} sx={{ mb: 1.5 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">
                      {it.event_name} × {it.participants_count}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      ₹ {lineTotal(it).toFixed(2)}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    ₹{Number(it.event_price || 0).toFixed(2)} per participant
                  </Typography>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  Total
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  ₹ {grandTotal.toFixed(2)}
                </Typography>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Add extra participants (delta) */}
      {addTargetItem && (
        <ParticipantDetailsModal
          open={addModalOpen}
          onClose={() => {
            setAddModalOpen(false);
            setAddTargetItem(null);
          }}
          count={addModalCount}
          onComplete={onAddParticipantsCollected}
        />
      )}

      {/* Change slot modal */}
      {slotTargetItem && (
        <SlotPickModal
          open={slotModalOpen}
          onClose={() => {
            setSlotModalOpen(false);
            setSlotTargetItem(null);
          }}
          event={{ id: slotTargetItem.event, name: slotTargetItem.event_name }}
          participantsCount={slotTeamCount}
          onPick={onSlotPicked}
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
