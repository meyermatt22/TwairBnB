import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";
import { createSpotReview } from "../../store/reviews";
import { getOneSpotsReviews } from "../../store/reviews";


const PostReviewModal = ({ spotId }) => {

    const dispatch = useDispatch();
    const [review, setReview] = useState("")
    const [stars, setStars] = useState(1)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const newReview = {
            spotId, stars, review
        }

        const resReview = await dispatch(createSpotReview(newReview))


        if(resReview.errors) {
            setErrors(resReview.errors)
        } else {
            dispatch(getOneSpotsReviews(spotId))
            closeModal()
        }

    }

    return (
        <form className="reviewModal" onSubmit={handleSubmit}>
            <h1>How was your stay?</h1>
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />
            <div>{stars}</div>
            <button type="submit">Submit Your Review</button>
        </form>
    )
}

export default PostReviewModal;
