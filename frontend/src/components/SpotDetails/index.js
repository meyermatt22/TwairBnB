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

    const spotImgs = []
    if(details.SpotImages) {
        details.SpotImages.forEach(i => {
            spotImgs.push(i)
        });
    }
    // console.log('spotimgs: ', spotImgs)

    return (
        <>
         <div>
            <h1>{details.name}</h1>
            <h4>{details.city}, {details.state}, {details.country}</h4>
            <div className="spotImages">
                {spotImgs?.map(({ url }) => (
                    <img alt="" src={url}></img>
                ))}
            </div>
            {/* <img src={details.SpotImages[0].url}></img> */}
            <h1>Hosted by {details.firstName} {details.lastName}</h1>

         </div>
        </>
    )
}

export default SpotDetails;
