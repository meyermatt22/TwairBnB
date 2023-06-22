import { csrfFetch } from "./csrf";

const GET_BOOKINGS = "/spots/GET_BOOKINGS";
const GET_BOOKINGS_CURR = "/spots/GET_BOOKINGS_CURR";
const CREATE_BOOKING = "/spots/CREATE_BOOKING";
const REMOVE_BOOKING = "/bookings/REMOVE_BOOKINGS";

export const loadBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings,
});

export const loadBookingsAction = (bookings) => ({
  type: GET_BOOKINGS_CURR,
  bookings,
});

export const createBooking = (booking) => ({
  type: CREATE_BOOKING,
  booking,
});

export const removeBookingAction = (bookingId) => ({
  type: REMOVE_BOOKING,
  bookingId,
});

export const getOneSpotsBookings = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (res.ok) {
    const spotBookings = await res.json();
    dispatch(loadBookings(spotBookings.Bookings));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const getCurrentUsersBookings = () => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/current`)


  if(res.ok) {
    const userBookings = await res.json()
    console.log("inside getcurr thunk., ", userBookings)

      dispatch(loadBookingsAction(userBookings))
  } else {

      const errors = await res.json()
      return errors
  }
}

export const createSpotBooking = (booking) => async (dispatch) => {
  const { spotId, startDate, endDate, userId } = booking;
  const newBooking = { startDate, endDate, spotId, userId };

  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBooking),
  });

  if (res.ok) {
    const newBooking = await res.json();
    dispatch(createBooking(newBooking));
    return newBooking;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeBookingAction(bookingId));
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = { spot: {} };

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS: {
      const newState = { ...state, spot: {} };
      action.bookings.forEach((b) => (newState.spot[b.id] = b));
      return newState;
    }
    case GET_BOOKINGS_CURR: {
      const newState = { ...state, spot: {} };
      action.bookings.Bookings.forEach((b) => (newState.spot[b.id] = b));
      return newState;
    }
    case CREATE_BOOKING: {
      const newState = { ...state, spot: { ...state.spot } };
      newState.spot[action.booking.id] = action.booking;
      return newState;
    }
    case REMOVE_BOOKING: {
      const newState = { ...state, spot: { ...state.spot } };
      delete newState[action.bookingId];
      return newState;
    }
    default:
      return state;
  }
};

export default bookingReducer;
