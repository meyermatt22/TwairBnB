import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './Spots.css'
// import Tooltip from "./Tooltip";

const SpotList = () => {
    const dispatch = useDispatch();
    const spotList = useSelector((state) => Object.values(state.spots));

    if(spotList) {
        spotList.forEach(s => {if(s.avgRating === "NaN") s.avgRating = "New"})
    }

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    console.log('preview', spotList[0])
    return (
        <>
            <h1>Available Spots</h1>
            {spotList?.map(({ id, city, state, previewImage, name, avgRating, price }) => (

                <div>
                {/* <Tooltip> */}
                <div data-role='tile' key={id}> <img className='previewImg' src={previewImage}></img> {city} {state} {avgRating} {price} night </div>
                {/* </Tooltip> */}
                </div>

            ))}
        </>
    )
}
export default SpotList
