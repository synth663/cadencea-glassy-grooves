// src/components/admin/EventGrid.jsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EventSlotsListModal from "./modals/EventSlotsModal";
import EventSlotListModal from "./modals/EventSlotModal";

import EventCard from "./EventCard";
import EventDetailsModal from "./modals/EventDetailsModal";
import EventService from "./EventService";
import EventModal from "./modals/EventModal";
import ParticipationConstraintModal from "./modals/ParticipationConstraintModal";
import OrganiserModal from "./modals/OrganiserModal";
import { useAuth } from "../../context/useAuth"; // <--- ADD THIS

export default function EventGrid() {
  const { user } = useAuth(); // <--- GET USER
  const role = user?.role; // role = "admin" or "organiser"

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [editEventData, setEditEventData] = useState(null);

  const [openOrgModal, setOpenOrgModal] = useState(false);
  const [eventIdForOrg, setEventIdForOrg] = useState(null);
  const [currentOrgIds, setCurrentOrgIds] = useState([]);

  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [eventIdForDetails, setEventIdForDetails] = useState(null);
  const [detailsIdToEdit, setDetailsIdToEdit] = useState(null);

  const [openEventModal, setOpenEventModal] = useState(false);
  const [constraintIdToEdit, setConstraintIdToEdit] = useState(null);

  const [openConstraintModal, setOpenConstraintModal] = useState(false);
  const [eventIdForConstraint, setEventIdForConstraint] = useState(null);
  const [slotsOpen, setSlotsOpen] = useState(false);
  const [slotsEventId, setSlotsEventId] = useState(null);
  const [slotsEventName, setSlotsEventName] = useState("");

  const handleOpenSlots = (eventId, name) => {
    setSlotsEventId(eventId);
    setSlotsEventName(name || "");
    setSlotsOpen(true);
  };

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await EventService.getAllEvents();
      setEvents(res.data);
    } catch {
      setAlert({
        open: true,
        message: "Failed to load events",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenConstraintModal = (id) => {
    setEventIdForConstraint(id);
    setOpenConstraintModal(true);
  };

  const handleOpenEditConstraint = (constraintId, eventId) => {
    setEventIdForConstraint(eventId);
    setConstraintIdToEdit(constraintId);
    setOpenConstraintModal(true);
  };

  const handleOpenEditEvent = (eventObj) => {
    setEditEventData(eventObj);
    setOpenEventModal(true);
  };

  const handleOpenAddDetails = (eventId) => {
    setEventIdForDetails(eventId);
    setDetailsIdToEdit(null);
    setOpenDetailsModal(true);
  };

  const handleOpenEditDetails = (detailsId, eventId) => {
    setEventIdForDetails(eventId);
    setDetailsIdToEdit(detailsId);
    setOpenDetailsModal(true);
  };

  const handleAddOrganisers = (eventId, orgIds) => {
    setEventIdForOrg(eventId);
    setCurrentOrgIds(orgIds);
    setOpenOrgModal(true);
  };

  const handleEditOrganisers = (eventId, orgIds) => {
    setEventIdForOrg(eventId);
    setCurrentOrgIds(orgIds);
    setOpenOrgModal(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        🎉 College Events
      </Typography>

      {role === "admin" && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenEventModal(true)}
          sx={{ mb: 3 }}
        >
          Add Event
        </Button>
      )}

      <TextField
        placeholder="Search events..."
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {events
            .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
            .map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard
                  event={event}
                  role={role}
                  onAddConstraints={handleOpenConstraintModal}
                  onEditConstraints={handleOpenEditConstraint}
                  onAddDetails={handleOpenAddDetails}
                  onEditDetails={handleOpenEditDetails}
                  onAddOrganisers={handleAddOrganisers}
                  onEditOrganisers={handleEditOrganisers}
                  onOpenSlots={handleOpenSlots} // <--- PASS DOWN
                  onDelete={fetchEvents}
                  onEditEvent={handleOpenEditEvent}
                />
              </Grid>
            ))}
        </Grid>
      )}

      <EventModal
        open={openEventModal}
        onClose={() => {
          setOpenEventModal(false);
          setEditEventData(null);
        }}
        refreshEvents={fetchEvents}
        editEventData={editEventData}
      />

      <OrganiserModal
        open={openOrgModal}
        onClose={() => setOpenOrgModal(false)}
        eventId={eventIdForOrg}
        currentOrganiserIds={currentOrgIds}
        refreshEvents={fetchEvents}
      />

      <ParticipationConstraintModal
        open={openConstraintModal}
        onClose={() => {
          setOpenConstraintModal(false);
          setConstraintIdToEdit(null);
        }}
        eventId={eventIdForConstraint}
        constraintId={constraintIdToEdit}
        refreshEvents={fetchEvents}
      />

      <EventDetailsModal
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        eventId={eventIdForDetails}
        detailsId={detailsIdToEdit}
        refreshEvents={fetchEvents}
      />
      <EventSlotsListModal
        open={slotsOpen}
        onClose={() => setSlotsOpen(false)}
        eventId={slotsEventId}
        eventName={slotsEventName}
      />

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
    </Box>
  );
}
