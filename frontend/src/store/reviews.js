import { csrfFetch } from "./csrf";

const GET_REVIEWS = "/spots/:spotId/reviews"

export const loadReviews = (reviews) => {
    console.log('loadReviews running: ')
    return {
        type: GET_REVIEWS,
        reviews,
    }
}

export const getOneSpotsReviews = (spotId) => async (dispatch) => {
    console.log('getonespotsreviews running')
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    console.log('this is res from fetch reviews')

    if(res.ok) {
        console.log('res is .ok')
        const spotReviews = await res.json()
        console.log('spot reviews: ', spotReviews)
        dispatch(loadReviews(spotReviews.Reviews))
    } else {
        console.log('res is not ok')
        const errors = await res.json()
        return errors
    };
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REVIEWS: {
            console.log('get reviews case runnign in Reducer')
            const newState = {};
            action.reviews.forEach(r => (newState[r.id] = r))
            return newState
        }
        default:
            console.log('review reducer: default case')
            return state
    }
}

export default reviewReducer;
