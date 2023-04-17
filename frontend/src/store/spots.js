 // import { use } from "../../../backend/routes/api/spots";
import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "/spots/getAllSpots"
const GET_DETAILS = "/spots/GET_DETAILS"
const UPDATE_SPOT = "/spots/UPDATE_SPOT"
const REMOVE_SPOT = "/spots/REMOVE_SPOT"

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

export const editSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
})

export const getCurrentUsersSpots = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/current`)
    console.log('res from get current user revviews', res)
    if(res.ok) {
        const userSpots = await res.json()
        console.log('user spots', userSpots)
        dispatch(loadSpots(userSpots))
    } else {
        console.log('res iss not ok')
        const errors = await res.json()
        return errors
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    if(res.ok) {
        dispatch(removeSpot(spotId));
    } else {
        const errors = await res.json()
        return errors
    }
}

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

export const createSpot = (spot, imgs) => async (dispatch) => {
    let res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(spot)
    });
    const newSpot = await res.json();

    console.log('newspot: ', newSpot)
    if(res.ok) {
        dispatch(loadDetails(newSpot));

        for (let i = 0; i < imgs.length; i++) {
            res = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(imgs[i])
            });
        }

            const newSpotImg = await res.json();

            console.log('newspotimg: ', newSpotImg)

            if(res.ok) {
                dispatch(loadDetails(newSpotImg));
                // return newSpotImg;
            } else {
                const errors = await res.json()
                console.log(errors)
                return errors
            }
     }
    return newSpot;
}

export const updateSpot = (spot) => async (dispatch) => {
    const currentspots = await csrfFetch('/api/spots/current')

    console.log('current spots: ', currentspots)

    let res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(spot)
    });
    // console.log('res is here? :', res)

    if(res.ok) {
        // console.log('res is ok: ', res)
        const updatedSpot = await res.json()
        dispatch(editSpot(updatedSpot));
        return updatedSpot;
    }  else {
        const errors = await res.json()
        // console.log(errors)
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
        case UPDATE_SPOT: {
            return { ...state, [action.spot.id]: action.spot};
        }
        case REMOVE_SPOT: {
            const newState = {...state};
            console.log('action review id: ', action.reviewId)
            console.log('new state from reducer1: ', newState)
            // console.log('newState here ; ', newState)
            delete newState.spot[action.spotId];
            console.log('new state from reducer1: ', newState)
            return newState;
        }
        default:
            return state
    }
}

export default spotsReducer;
