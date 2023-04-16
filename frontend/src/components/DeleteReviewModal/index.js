import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";


const DeleteReview = ({id , spotId}) => {
    const dispatch = useDispatch();
    // const { spotId } = useParams()
    const history = useHistory()
    const { closeModal } = useModal()
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReview(id));
        history.push(`/spots/${spotId}`)
        closeModal()
    };


    return (
        <>
            <div className="deleteBox">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to remove this spot from the listings?</p>
                <button onClick={handleDelete} >Yes (Delete Review)</button>
                <button onClick={closeModal} >No (Keep Review)</button>
            </div>
        </>
    )
}

export default DeleteReview;
