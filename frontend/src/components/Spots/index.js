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
    const [maxPrice, setMaxPrice] = useState(100000000)
    const [minPrice, setMinPrice] = useState(0)
    const [query, setQuery] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false);
    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);
    const spotList = useSelector((state) => Object.values(state.spots));

    if(spotList) {
        spotList.forEach(s => {if(s.avgRating === "NaN") s.avgRating = "New"})
    }
    const [queryList, setQueryList] = useState(spotList)
    // console.log('spotlist info' , queryList)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        let searchedProp = query
        console.log(query)

        const search = { searchedProp, minPrice, maxPrice }

        const resSearch = await dispatch(createSearchThunk(search))

        // let realRes = []

        resSearch.forEach( s => {
            s.previewImage = s.SpotImages[0]['url']
            let total = 0
            let rNum = s.Reviews.length
            s.Reviews.forEach( r => {
                total += r.stars
            })
            s.avgRating = total / rNum
        })
        console.log("=========> here =====>", resSearch)
        setQueryList(resSearch)
        // setHasSubmitted(false)

    }

    if (!hasSubmitted) return (
        <div id='SpotList'>
            <div className='formDiv'>
            <div className='SearchArea'>
            <form onSubmit={handleSubmit}>
            <input id='searchBar' placeholder='spot name' onChange={event => setQuery(event.target.value)}/>

            <select className='minPrice' name='minimumP' onChange={(e) => setMinPrice(e.target.value)}>
                <option value={0}>Minimum [none]</option>
                <option value={50}>Minimum $50.00</option>
                <option value={100}>Minimum $100.00</option>
                <option value={150}>Minimum $150.00</option>
                <option value={200}>Minimum $200.00</option>
                <option value={300}>Minimum $300.00</option>
                <option value={500}>Minimum $500.00</option>
            </select>
            <select className='maxPrice' name='maximumP' onChange={(e) => setMaxPrice(e.target.value)}>
                <option value={100000000}>Maximum [none]</option>
                <option value={100}>Maximum $100.00</option>
                <option value={200}>Maximum $200.00</option>
                <option value={300}>Maximum $300.00</option>
                <option value={500}>Maximum $500.00</option>
                <option value={750}>Maximum $750.00</option>
                <option value={1000}>Maximum $1000.00</option>
            </select>

            <button type='submit'>Filter Spots</button>

            </form>

            </div>
            <h1 className='SearchText'>Please enter a query to filter available spots</h1>

            </div>
        <div className='spotList'>


            {spotList?.map(({ id, city, state, previewImage, name, avgRating, price }) => (

                <Link to={`/spots/${id}`} key={id} className='spotLink' >
                    <div className='spotTile' title={name}>
                    {/* <Tooltip> */}
                        <div data-role='tile' key={id}>
                            <div className='imageBox'>
                            <img alt='' src={previewImage} className='previewImg'></img>

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
        </div>
    )

    if(!queryList.length) return (
        <div id='SpotList'>
            <div className='formDiv'>
            <div className='SearchArea'>
            <form onSubmit={handleSubmit}>
            <input id='searchBar' placeholder='spot name' onChange={event => setQuery(event.target.value)}/>

            <select className='minPrice' name='minimumP' onChange={(e) => setMinPrice(e.target.value)}>
                <option value={0}>Minimum [none]</option>
                <option value={50}>Minimum $50.00</option>
                <option value={100}>Minimum $100.00</option>
                <option value={150}>Minimum $150.00</option>
                <option value={200}>Minimum $200.00</option>
                <option value={300}>Minimum $300.00</option>
                <option value={500}>Minimum $500.00</option>
            </select>
            <select className='maxPrice' name='maximumP' onChange={(e) => setMaxPrice(e.target.value)}>
                <option value={100000000}>Maximum [none]</option>
                <option value={100}>Maximum $100.00</option>
                <option value={200}>Maximum $200.00</option>
                <option value={300}>Maximum $300.00</option>
                <option value={500}>Maximum $500.00</option>
                <option value={750}>Maximum $750.00</option>
                <option value={1000}>Maximum $1000.00</option>
            </select>

            <button type='submit'>Filter Spots</button>

            </form>

            </div>
            <h1 className='SearchText'>Your Search yeilded 0 results. Please try again</h1>

            </div>
        </div>
    )

    return (
        <div id='SpotList'>
             <div className='formDiv'>
            <div className='SearchArea'>
            <form onSubmit={handleSubmit}>
            <input id='searchBar' placeholder='spot name' onChange={event => setQuery(event.target.value)}/>

            <select className='minPrice' name='minimumP' onChange={(e) => setMinPrice(e.target.value)}>
                <option value={0}>Minimum [none]</option>
                <option value={50}>Minimum $50.00</option>
                <option value={100}>Minimum $100.00</option>
                <option value={150}>Minimum $150.00</option>
                <option value={200}>Minimum $200.00</option>
                <option value={300}>Minimum $300.00</option>
                <option value={500}>Minimum $500.00</option>
            </select>
            <select className='maxPrice' name='maximumP' onChange={(e) => setMaxPrice(e.target.value)}>
                <option value={100000000}>Maximum [none]</option>
                <option value={100}>Maximum $100.00</option>
                <option value={200}>Maximum $200.00</option>
                <option value={300}>Maximum $300.00</option>
                <option value={500}>Maximum $500.00</option>
                <option value={750}>Maximum $750.00</option>
                <option value={1000}>Maximum $1000.00</option>
            </select>

            <button type='submit'>Filter Spots</button>

            </form>

            </div>
            <h1 className='SearchText'>The following locations match your specifications</h1>

            </div>
        <div className='spotList'>


            {queryList?.map(({ id, city, state, previewImage, name, avgRating, price }) => (

                <Link to={`/spots/${id}`} key={id} className='spotLink' >
                    <div className='spotTile' title={name}>
                    {/* <Tooltip> */}
                        <div data-role='tile' key={id}>
                            <div className='imageBox'>
                            <img alt='' src={previewImage} className='previewImg'></img>

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
        </div>
    )
}
export default SpotList
