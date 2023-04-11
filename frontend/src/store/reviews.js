const GET_ALL_REVIEWS = "/reviews.GET_ALL_REVIEWS"
const GET_REVIEWS = "/reviews.GET_REVIEWS"

export const loadReviews = (spot) => ({
    type: GET_REVIEWS,
    spot
})



export const getAllReviews = () => async (dispatch) => {
    const res = await fetch('/api/reviews');

    if(res.ok) {
        console.log('res, ', res)
      const data = await res.json();

      dispatch(loadReviews(data));
      return data
    };
  };

export const getReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if(res.ok) {
        const data = await res.json()
        console.log('data stuff: ',res)
    }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REVIEWS: {
            return { ...state, [action.review.spotId]: action.review}
        }
        default:
            return state
    }
}

export default reviewReducer
