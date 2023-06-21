import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteBookingThunk } from "../../store/bookings";

const DeleteBooking = ({bookingId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteBookingThunk(bookingId))
        history.push(`/bookings/current`)
        closeModal()
    }

    return (
        <>
            <div className="deleteBox2">
                <h2>Confirm Delete</h2>
                <p id="pText2">Are you sure you want to remove this booking from your Reservations?</p>
                <button onClick={handleDelete} id="yesB2">Yes (Delete Reservation)</button>
                <button onClick={closeModal} id="noB2">No (Keep my Reservation)</button>
            </div>
        </>
    )
}

export default DeleteBooking;
