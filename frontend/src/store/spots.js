import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "/spots/getAllSpots"
const GET_DETAILS = "/spots/GET_DETAILS"


export const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    };
};

export const loadDetails = (spot) => ({
    type: GET_DETAILS,
    spot,
});



//thunk action creator
export const getAllSpots = () => async (dispatch) => {
  const res = await fetch('/api/spots');

  if(res.ok) {
    const data = await res.json();

    dispatch(loadSpots(data));
    return data
  };
};

export const getOneSpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)

    if(res.ok) {
        const spotDetails = await res.json()
        console.log('spotdetails: ', spotDetails)
        dispatch(loadDetails(spotDetails))
    } else {
        const errors = await res.json()
        return errors
    };
};

export const createSpot = (spot) => async (dispatch) => {
    const res = await fetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(spot)
    });

    if(res.ok) {
        const newSpot = await res.json();
        dispatch(loadDetails(newSpot));
        return newSpot;
    } else {
        const errors = await res.json()
        return errors
    }
}

export const createSpotImages = (spot) => async (dispatch) => {
    console.log('CREATE SPOT IMAGES HIT ***')
    const res = await csrfFetch(`/api/spots/${spot}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(spot)
    });

    if(res.ok) {
        const newSpotImg = await res.json();
        dispatch(loadDetails(newSpotImg));
        return newSpotImg;
    } else {
        const errors = await res.json()
        return errors
    }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = {};
            action.spots.Spots.forEach(s => (newState[s.id] = s));
            return newState
        }
        case GET_DETAILS: {
            return { ...state, [action.spot.id]: action.spot};
        }
        default:
            return state
    }
}

export default spotsReducer;
