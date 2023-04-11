import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";
import '../Spots/Spots.css'
import './SpotDetails.css'

const SpotDetails = () => {
    const { spotId } = useParams()

    const details = useSelector((state) =>
    state.spots ? state.spots[spotId] : null
    );

    let ownerFirstName = ""
    let ownerLastName = ""
    if(details && details.Owner) {
        ownerFirstName = details.Owner.firstName
        ownerLastName = details.Owner.lastName
    }
    console.log('details: ',details)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId]);

    const spotImgs = []
    if(details && details.SpotImages) {
        details.SpotImages.forEach(i => {
            spotImgs.push(i)
        });
    }
    // console.log('spotimgs: ', spotImgs)

    if(details) { return (
        <>
         <div>
            <h1>{details.name}</h1>
            <h4>{details.city}, {details.state}, {details.country}</h4>
            <div className="spotImages">
                {spotImgs?.map(({ url }) => (
                    <img alt="" className="previewImg" src={url}></img>
                ))}
            </div>
            <div className="infoLeft">
                <h1>Hosted by {ownerFirstName} {ownerLastName}</h1>
                <p>{details.description}</p>
            </div>
            <div className="infoBox">
                <div className="topInfoBox">
                    <div className="topInfoLeft">
                    ${details.price} night
                    </div>
                    <div className="topInfoRight">
                        {details.avgStarRating} - {details.numReviews} reviews
                    </div>
                </div>
                <div className="bottomInfoBox">
                    <button className="reserve">Reserve</button>
                </div>
            </div>
         </div>
        </>
    )}
}

export default SpotDetails;
