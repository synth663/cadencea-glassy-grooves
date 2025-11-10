// src/components/admin/EventCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventService from "./EventService";

export default function EventCard({
  event,
  role,
  onAddConstraints,
  onEditConstraints,
  onAddDetails,
  onEditDetails,
  onAddOrganisers,
  onEditOrganisers,
  onEditEvent,
  onOpenSlots, // <--- NEW
  onDelete,
}) {
  const handleDelete = async () => {
    if (window.confirm(`Delete event "${event.name}"?`)) {
      await EventService.deleteEvent(event.id);
      onDelete();
    }
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 4, p: 1 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Committee: {event.parent_committee}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ₹{event.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Exclusive: {event.exclusivity ? "Yes" : "No"}
        </Typography>
      </CardContent>

      <CardActions>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button
            variant="outlined"
            size="small"
            onClick={() => onEditEvent(event)}
          >
            Edit Event
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => {
              if (event.constraint_id)
                onEditConstraints(event.constraint_id, event.id);
              else onAddConstraints(event.id);
            }}
          >
            {event.constraint_id ? "Edit Constraints" : "Add Constraints"}
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => {
              if (event.details_id) onEditDetails(event.details_id, event.id);
              else onAddDetails(event.id);
            }}
          >
            {event.details_id ? "Edit Details" : "Add Details"}
          </Button>

          {/* Manage Slots — admin & organiser */}
          <Button
            variant="contained"
            size="small"
            onClick={() => onOpenSlots(event.id, event.name)}
          >
            Manage Slots
          </Button>

          {/* ONLY admin can manage organisers */}
          {role === "admin" && (
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                if (event.organisers?.length > 0)
                  onEditOrganisers(event.id, event.organisers);
                else onAddOrganisers(event.id, event.organisers);
              }}
            >
              {event.organisers?.length > 0
                ? "Edit Organisers"
                : "Add Organisers"}
            </Button>
          )}

          {/* ONLY admin can delete event */}
          {role === "admin" && (
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
