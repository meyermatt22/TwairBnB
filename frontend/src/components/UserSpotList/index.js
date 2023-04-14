import { useParams } from "react-router-dom";

const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { getCurrentUsersSpots } = require("../../store/spots");


const UserSpotList = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const spotList = useSelector((state) => Object.values(state.spots));
    console.log('userSpotList: ', spotList)
    console.log('userId: ', userId)

    useEffect(() => {
        console.log('useEffect on user spot list')
        dispatch(getCurrentUsersSpots(userId))
    }, [dispatch, userId])

    const userSpotList = []
    spotList.forEach(s => {
        if(s.ownerId === userId) userSpotList.push(s)
    })

    console.log('USERS SPOT LIST', UserSpotList)

    return (
        <>
        <h1>Manage Your Spots</h1>
        <div className="userSpots">
        {userSpotList?.map(({ city }) => (
            <div>{city}</div>
        ))}

        </div>
        </>
    )
}

export default UserSpotList
