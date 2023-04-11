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
        <div className='spotList'>

            {spotList?.map(({ id, city, state, previewImage, name, avgRating, price }) => (

                <div className='spotTile'>
                {/* <Tooltip> */}
                    <div data-role='tile' key={id}>
                        <img className='previewImg' src={previewImage}></img>
                        <div className='spotInfo'>
                            <div className='localPrice'>
                                <div>
                                {city}, {state}
                                </div>
                                <div>
                                {price} night
                                </div>
                            </div>
                            <div className='rating'>
                            {avgRating}
                            </div>
                        </div>
                    </div>
                    {/* </Tooltip> */}
                </div>

            ))}
        </div>
    )
}
export default SpotList
