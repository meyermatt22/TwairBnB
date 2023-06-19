import { csrfFetch } from "./csrf";

const GET_BOOKINGS = "/spots/GET_BOOKINGS";

export const loadBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings,
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

const initialState = { spot: {} };

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS: {
      const newState = { ...state, spot: {} };
      action.bookings.forEach((b) => (newState.spot[b.id] = b));
      return newState;
    }
    default:
      return state;
  }
};

export default bookingReducer;
