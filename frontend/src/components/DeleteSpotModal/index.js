import { useDispatch } from "react-redux";
import { deleteSpot, getCurrentUsersSpots } from "../../store/spots";
import { useModal } from "../../context/Modal";

import './DeleteSpotModal.css'


const DeleteSpot = ({id}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(id));
        dispatch(getCurrentUsersSpots());
        closeModal()
    };



    // if(!spot) return null

    return (
        <>
            <div className="deleteBox">
                <h2>Confirm Delete</h2>
                <p id="pText">Are you sure you want to remove this spot from the listings?</p>
                <button onClick={handleDelete} id="yesB">Yes (Delete Spot)</button>
                <button onClick={closeModal} id="noB">No (Keep Spot)</button>
            </div>
        </>
    )
}

export default DeleteSpot;
