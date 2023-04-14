import {  Link, Redirect } from "react-router-dom";


const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { getCurrentUsersSpots } = require("../../store/spots");


const UserSpotList = () => {

    const dispatch = useDispatch()

    const user = useSelector((state) => (state.session.user))

    const spotListObj = useSelector((state) => (state.spots));
    const userSpotList = Object.values(spotListObj)

    useEffect(() => {
        console.log('useEffect on user spot list')
        dispatch(getCurrentUsersSpots())
    }, [dispatch, user])

    if(!user) {
        return <Redirect to={"/"}></Redirect>
    }

    console.log('USERS SPOT LIST', userSpotList)

    return (
        <>
        <h1>Manage Your Spots</h1>
        <div className="userSpots">
            {userSpotList.length < 1 && <h1>Create a New Spot</h1>}
        {userSpotList.map(({ city, state, price, previewImage, avgRating, name, id }) => (
            <Link to={`/spots/${id}`} key={name}>
                 <img alt='' className='previewImg' src={previewImage}></img>
                 <div className='spotInfo'>
                    <div className='localPrice'>
                        <div>
                        {city}, {state}
                        </div>
                        <div>
                        ${price} night
                        </div>
                    </div>
                    <div className='rating'>
                    <img className='icon' alt='' src='https://cdn-icons-png.flaticon.com/128/929/929495.png'></img>
                    {avgRating}
                    </div>
                </div>
                <div className="buttons">
                    <button className="updateButton">Update</button>
                    <button className="deleteButton">Delete</button>
                </div>
            </Link>
        ))}


        </div>
        </>
    )
}

export default UserSpotList
