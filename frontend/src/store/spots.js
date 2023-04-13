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
                return newSpotImg;
            } else {
                const errors = await res.json()
                return errors
            }


     } //else {
    //     const errors = await res.json()
    //     return errors
    // }
    return newSpot;
}

export const createSpotImages = (spot) => async (dispatch) => {
    console.log('CREATE SPOT IMAGES HIT ***')
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
