import { csrfFetch } from "./csrf";

const GET_REVIEWS = "/spots/:spotId/reviews"
const CREATE_REVIEW = "/reviews/CREATE_REVIEW"
const REMOVE_REVIEW = "/reviews/REMOVE_REVIEWS"

export const loadReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews,
    }
}

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if(res.ok) {
        dispatch(removeReview(reviewId))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const createSpotReview = (spot) => async (dispatch) => {

    const { spotId, review, stars } = spot
    const newReview = {review, stars}

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newReview)
    });

    if(res.ok) {
        const newReview = await res.json();
        dispatch(createReview(newReview));
        return newReview
    } else {
        const errors = await res.json();
        return errors
    }
}

export const getOneSpotsReviews = (spotId) => async (dispatch) => {

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(res.ok) {
        const spotReviews = await res.json()
        dispatch(loadReviews(spotReviews.Reviews))
    } else {
        const errors = await res.json()
        return errors
    };
};

const initialState = {spot: {}};

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REVIEWS: {
            const newState = {...state, spot: {}};
            action.reviews.forEach(r => (newState.spot[r.id] = r))
            return newState
        }
        case CREATE_REVIEW: {
            const newState = {...state, spot: {...state.spot}}
            newState.spot[action.review.id] = action.review
            return newState
        }
        case REMOVE_REVIEW: {
            const newState = {...state, spot: {...state.spot}};
            delete newState[action.reviewId];
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer;
