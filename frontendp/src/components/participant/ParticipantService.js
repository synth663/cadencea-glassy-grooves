import { appApiClient } from "../../api/endpoints";

const ParticipantService = {
  // Events
  getAllEvents: () => appApiClient.get("/events/browse/"),
  getConstraintById: (id) => appApiClient.get(`/constraints/${id}/`),
  getConstraintForEvent: (eventId) =>
    appApiClient.get(`/constraints/?event=${eventId}`),

  // Slots
  getEventSlots: (eventId) =>
    appApiClient.get(`/event-slots/?event_id=${eventId}`),
  getEventSlotById: (id) => appApiClient.get(`/event-slots/${id}/`),

  // Cart
  getOrCreateCart: () => appApiClient.get("/cart/"),
  getCart: () => appApiClient.get("/cart/"),
  createCartItem: (data) => appApiClient.post("/cartitems/", data),
  updateCartItem: (id, data) => appApiClient.patch(`/cartitems/${id}/`, data),
  deleteCartItem: (id) => appApiClient.delete(`/cartitems/${id}/`),

  // Temp participants
  createTempBooking: (data) => appApiClient.post("/tempbookings/", data),
  updateTempBooking: (id, data) =>
    appApiClient.patch(`/tempbookings/${id}/`, data),
  deleteTempBooking: (id) => appApiClient.delete(`/tempbookings/${id}/`),

  // Temp time slot
  createTempTimeslot: (data) => appApiClient.post("/temp-timeslots/", data),
  updateTempTimeslot: (id, data) =>
    appApiClient.patch(`/temp-timeslots/${id}/`, data),
  deleteTempTimeslot: (id) => appApiClient.delete(`/temp-timeslots/${id}/`),

  // Bookings
  getMyBookings: () => appApiClient.get("/bookings/"),
  getBookedEvent: (bookedEventId) =>
    appApiClient.get(`/booked-events/${bookedEventId}/`),

  // Event details (for venue etc.)
  getEventDetailsByEvent: (eventId) =>
    appApiClient.get(`/event-details/?event=${eventId}`),
};

export default ParticipantService;
