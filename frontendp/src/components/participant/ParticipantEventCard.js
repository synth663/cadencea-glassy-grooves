import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

export default function ParticipantEventCard({ event, onAddToCart }) {
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
        <Button variant="contained" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
