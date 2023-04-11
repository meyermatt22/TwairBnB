import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";

const SpotDetails = () => {
    const { spotId } = useParams()

    const details = useSelector((state) =>
    state.spots ? state.spots[spotId] : null
    );
    console.log('details: ',details)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId]);

    return (
        <>
         <div>
            {details.name}
            {details.city}, {details.state}, {details.country}
            {details.SpotImages[0].id}
         </div>
        </>
    )
}

export default SpotDetails;
