// src/components/admin/modals/EventModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import EventService from "../EventService";

export default function EventModal({
  open,
  onClose,
  refreshEvents,
  editEventData,
}) {
  const [categories, setCategories] = useState([]);
  const [parentEvents, setParentEvents] = useState([]);

  const [form, setForm] = useState({
    parent_committee: "",
    name: "",
    parent_event: "",
    category: "",
    price: "0",
    exclusivity: false,
  });

  useEffect(() => {
    if (open) {
      EventService.getCategories().then((res) => setCategories(res.data));
      EventService.getParentEvents().then((res) => setParentEvents(res.data));
    }
  }, [open]);

  useEffect(() => {
    if (editEventData) {
      setForm({
        parent_committee: editEventData.parent_committee,
        name: editEventData.name,
        parent_event: editEventData.parent_event || "",
        category: editEventData.category || "",
        price: editEventData.price,
        exclusivity: editEventData.exclusivity,
      });
    } else {
      setForm({
        parent_committee: "",
        name: "",
        parent_event: "",
        category: "",
        price: "0",
        exclusivity: false,
      });
    }
  }, [editEventData, open]);

  const handleSubmit = async () => {
    if (editEventData) {
      await EventService.updateEvent(editEventData.id, form);
    } else {
      await EventService.createEvent(form);
    }
    refreshEvents();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {editEventData ? "Edit Event" : "Add New Event"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Parent Committee"
          fullWidth
          margin="dense"
          value={form.parent_committee}
          onChange={(e) =>
            setForm({ ...form, parent_committee: e.target.value })
          }
        />
        <TextField
          label="Event Name"
          fullWidth
          margin="dense"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField
          select
          label="Parent Event"
          fullWidth
          margin="dense"
          value={form.parent_event}
          onChange={(e) => setForm({ ...form, parent_event: e.target.value })}
        >
          <MenuItem value="">None</MenuItem>
          {parentEvents.map((pe) => (
            <MenuItem key={pe.id} value={pe.id}>
              {pe.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Category"
          fullWidth
          margin="dense"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <MenuItem value="">None</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="dense"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={form.exclusivity}
              onChange={(e) =>
                setForm({ ...form, exclusivity: e.target.checked })
              }
            />
          }
          label="Exclusive Event"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {editEventData ? "Save Changes" : "Create Event"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
