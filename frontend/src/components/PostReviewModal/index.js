import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";


const PostReviewModal = ({ data }) => {

    const dispatch = useDispatch();
    const [review, setReview] = useState("")
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const history = useHistory()

    const createReview = async (e) => {
        e.preventDefault();
        setErrors({})

        data = { ...data, stars, review};

        const newReview = await dispatch(createReview(data))
        data = newReview

        if(data.errors) {
            setErrors(data.errors)
        } else {
            history.push(`/spots/${data.id}`)
        }

    }

    return (
        <form className="reviewModal" onSubmit={createReview}>
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
