
const GET_ALL_SPOTS = "/spots.getAllSpots"
const GET_SPOT_IMAGES = "/spots.getSpotImages"

//regular action creator
const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    };
};

//thunk action creator
export const getAllSpots = () => async (dispatch) => {
  const res = await fetch('/api/spots');

  if(res.ok) {
    const data = await res.json();

    dispatch(loadSpots(data));
    return data
  }
}


const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            console.log('actions.spots: ', action.spots.Spots)
            const newState = {};
            action.spots.Spots.forEach(s => (newState[s.id] = s));
            return newState
        }
        default:
            return state
    }
}

export default spotsReducer;
