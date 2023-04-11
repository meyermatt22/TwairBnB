import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/reviews';
import { getOneSpot } from '../../store/spots';
import { useParams } from "react-router-dom";


const ReviewList = () => {
    const { spotId } = useParams()
    const reviews = useSelector((state) =>
    state.reviews ? state.reviews[spotId] : null
    )
    // if(state) {
    //     console.log(state.reviews)
    // }
    const dispatch = useDispatch();
    // const reviews = useSelector((state) => Object.values(state.reviews))

    if(reviews) {
        {console.log('list o reviews: ', reviews)}
    }

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId]);

    if(!reviews) return <>null</>


    return (
        <>{reviews}</>
    )
}

export default ReviewList
