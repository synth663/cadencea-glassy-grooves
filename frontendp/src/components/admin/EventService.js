// src/components/admin/EventService.js
import { appApiClient as AxiosInstance } from "../../api/endpoints";

const EventService = {
  // Events
  getAllEvents: () => AxiosInstance.get("/events/"),
  getEventById: (id) => AxiosInstance.get(`/events/${id}/`),
  createEvent: (data) => AxiosInstance.post("/events/", data),
  updateEvent: (id, data) => AxiosInstance.put(`/events/${id}/`, data),
  deleteEvent: (id) => AxiosInstance.delete(`/events/${id}/`),

  // Constraints
  getConstraints: () => AxiosInstance.get("/constraints/"),
  getConstraintById: (id) => AxiosInstance.get(`/constraints/${id}/`),
  createConstraint: (data) => AxiosInstance.post("/constraints/", data),
  updateConstraint: (id, data) =>
    AxiosInstance.put(`/constraints/${id}/`, data),

  // Details
  getEventDetails: () => AxiosInstance.get("/event-details/"),
  getEventDetailById: (id) => AxiosInstance.get(`/event-details/${id}/`),
  createEventDetails: (data) => AxiosInstance.post("/event-details/", data),
  updateEventDetails: (id, data) =>
    AxiosInstance.put(`/event-details/${id}/`, data),

  // Organisers
  getOrganisers: () => AxiosInstance.get("/organisers/"),
  addOrganiser: (data) => AxiosInstance.post("/organisers/", data),
  deleteOrganiser: (id) => AxiosInstance.delete(`/organisers/${id}/`),

  // Categories / Parent Events (for EventModal)
  getCategories: () => AxiosInstance.get("/categories/"),
  getParentEvents: () => AxiosInstance.get("/parent-events/"),

  // ----- Event Slots -----
  // list slots for an event via query param (server filters)
  getEventSlots: (eventId) =>
    AxiosInstance.get(`/event-slots/?event_id=${eventId}`),
  getEventSlotById: (id) => AxiosInstance.get(`/event-slots/${id}/`),
  createEventSlot: (data) => AxiosInstance.post("/event-slots/", data),
  updateEventSlot: (id, data) => AxiosInstance.put(`/event-slots/${id}/`, data),
  deleteEventSlot: (id) => AxiosInstance.delete(`/event-slots/${id}/`),
};

export default EventService;
