import {  useHistory, Redirect, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";



const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { getCurrentUsersSpots } = require("../../store/spots");


const UserSpotList = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector((state) => (state.session.user))

    const spotListObj = useSelector((state) => (state.spots));
    const userSpotList = Object.values(spotListObj)

    useEffect(() => {
        console.log('useEffect on user spot list')
        dispatch(getCurrentUsersSpots())
    }, [dispatch])

    const handleButtonClick = (spotId, e, action) => {
        e.stopPropagation();
        history.push(`/spots/${spotId}/${action}`)
    }

    if(!user) {
        return <Redirect to={"/"}></Redirect>
    }

    console.log('USERS SPOT LIST', userSpotList)

    return (
        <>
        <h1>Manage Your Spots</h1>
        <div className="userSpots">
            {userSpotList.length < 1 && <NavLink to={`/spots/new`}>
          Create a New Spot
        </NavLink>}
        {userSpotList.map(({ city, state, price, previewImage, avgRating, name, id }) => (
            <div onClick={ () => history.push(`/spots/${id}`)} key={id}>
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
                <div className="UDbuttons">
                    <button className="updateButton" onClick={(e) => handleButtonClick(id,e, 'edit')}>Update</button>
                    <OpenModalButton buttonText="DELETE" onButtonClick={(e) => e.stopPropagation()} modalComponent={<h2>wonka</h2>}/>
                </div>
            </div>
        ))}


        </div>
        </>
    )
}

export default UserSpotList
