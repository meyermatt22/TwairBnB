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
            <button onClick={handleDelete} >DELETE</button>
        </>
    )
}

export default DeleteSpot;
