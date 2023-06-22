import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './Spots.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { createSearchThunk } from '../../store/search';
// import Tooltip from "./Tooltip";

const SpotList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);
    const spotList = useSelector((state) => Object.values(state.spots));
    const [maxPrice, setMaxPrice] = useState(100000000)
    const [minPrice, setMinPrice] = useState(0.001)
    const [query, setQuery] = useState('')

    if(spotList) {
        spotList.forEach(s => {if(s.avgRating === "NaN") s.avgRating = "New"})
    }
    const [queryList, setQueryList] = useState(spotList)
    // console.log('spotlist info' , queryList)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const searchedProp = query
        console.log(query)

        const search = { searchedProp, minPrice, maxPrice }

        const resSearch = await dispatch(createSearchThunk(search))

        console.log("=========> here =====>", resSearch)
        setQueryList(resSearch)


    }

    return (
        <div className='spotList'>
            <form onSubmit={handleSubmit}>
            <input id='searchBar' onChange={event => setQuery(event.target.value)}/>
            <button type='submit'>sub button</button>

            </form>


            {queryList?.map(({ id, city, state, SpotImages, name, avgRating, price }) => (

                <Link to={`/spots/${id}`} key={id} className='spotLink' >
                    <div className='spotTile' title={name}>
                    {/* <Tooltip> */}
                        <div data-role='tile' key={id}>
                            <div className='imageBox'>
                            <img alt='' src={SpotImages[0]['url']} className='previewImg'></img>

                            </div>
                            <div className='spotInfo'>
                                <div className='localPrice'>
                                    <div className='price'>
                                    {city}, {state}
                                    </div>
                                    <div className='price'>
                                    ${price} per night
                                    </div>
                                </div>
                                <div className='rating'>
                                <img className='icon' alt='' src='https://cdn-icons-png.flaticon.com/128/929/929495.png'></img>
                                {avgRating}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

            ))}
        </div>
    )
}
export default SpotList
