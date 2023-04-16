import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";


const DeleteSpot = ({id}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(id));
        closeModal()
    };



    // if(!spot) return null

    return (
        <>
            <div className="deleteBox">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to remove this spot from the listings?</p>
                <button onClick={handleDelete} >Yes (Delete Spot)</button>
                <button onClick={closeModal} >No (Keep Spot)</button>
            </div>
        </>
    )
}

export default DeleteSpot;
