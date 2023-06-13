import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import './DeleteReviewModal.css'
import { getOneSpotsReviews } from "../../store/reviews";


const DeleteReview = ({id , spotId}) => {
    const dispatch = useDispatch();
    // const { spotId } = useParams()
    const history = useHistory()
    const { closeModal } = useModal()
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReview(id));
        dispatch(getOneSpotsReviews(spotId))
        history.push(`/spots/${spotId}`)
        closeModal()
    };


    return (
        <>
            <div className="deleteBox2">
                <h2>Confirm Delete</h2>
                <p id="pText2">Are you sure you want to remove this spot from your listings?</p>
                <button onClick={handleDelete} id="yesB2">Yes (Delete Review)</button>
                <button onClick={closeModal} id="noB2">No (Keep Review)</button>
            </div>
        </>
    )
}

export default DeleteReview;
