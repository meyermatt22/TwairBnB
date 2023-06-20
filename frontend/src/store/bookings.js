import { csrfFetch } from "./csrf";

const GET_BOOKINGS = "/spots/GET_BOOKINGS";
const CREATE_BOOKING = "/spots/CREATE_BOOKING";

export const loadBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings,
});

export const createBooking = (booking) => ({
  type: CREATE_BOOKING,
  booking,
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

export const createSpotBooking = (booking) => async (dispatch) => {
  const { spotId, startDate, endDate, userId } = booking;
  const newBooking = { startDate, endDate, spotId, userId };

  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBooking),
  });

  console.log('createSpotBooking thunk', res)
  if (res.ok) {
    const newBooking = await res.json();
    dispatch(createBooking(newBooking));
    return newBooking;
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
    case CREATE_BOOKING: {
      const newState = { ...state, spot: { ...state.spot } };
      newState.spot[action.booking.id] = action.booking;
      return newState;
    }
    default:
      return state;
  }
};

export default bookingReducer;
