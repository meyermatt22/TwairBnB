import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";
import { createSpotReview } from "../../store/reviews";
import { getOneSpotsReviews } from "../../store/reviews";
import StarRatingInput from "../StarRatingInput";
import './PostReviewModal.css'


const PostReviewModal = ({ spotId }) => {

    const dispatch = useDispatch();
    const [review, setReview] = useState("")
    const [stars, setStars] = useState(1)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const history = useHistory()

    function validate(review) {
        const errorsObj = {}
        if(review.length < 30) errorsObj.review = "review must be at least 30 characters"
        return errorsObj
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const newReview = {
            spotId, stars, review
        }

        const errors = validate(review)

        if(errors && Object.values(errors) && Object.values(errors).length) {
            return setErrors(errors)
        }

        const resReview = await dispatch(createSpotReview(newReview))


        if(resReview.errors) {
            setErrors(resReview.errors)
        } else {
            dispatch(getOneSpotsReviews(spotId))
            closeModal()
        }

    }
    const onChange = (number) => {
        setStars(parseInt(number));
    };

    let charCount = false

    if(review.length < 9) {
    charCount = true
    } else {
    charCount = false
    }



    return (
        <form className="reviewModal" onSubmit={handleSubmit}>
            <h1>How was your stay?</h1>
            <div className="errors"> {errors.review}</div>
            <textarea
                className="reviewBox"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Leave your review here..."
            />
            <div className="starsInput">
                <StarRatingInput
                    disabled={false} onChange={onChange} stars={stars}
                /> Stars
            </div>
            <button type="submit" className="submitReview" >Submit Your Review</button>
        </form>
    )
}

export default PostReviewModal;
