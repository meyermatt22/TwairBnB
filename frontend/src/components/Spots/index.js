import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';

const SpotList = () => {
    const dispatch = useDispatch();
    // console.log('state: ', dispatch(getAllSpots()))
    const spotList = useSelector((state) => Object.values(state.spots));
    // console.log('spotsList: ', spotList)

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    return (
        <>
            <h1>Available Spots</h1>
            {spotList?.map(({ id, city, state }) => (
                <div key={id}>{city}, {state}</div>
            ))}
        </>
    )
}
export default SpotList
