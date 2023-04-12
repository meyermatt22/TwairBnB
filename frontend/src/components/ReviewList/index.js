import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadReviews } from '../../store/reviews';
import { getOneSpotsReviews } from '../../store/reviews';
import { useParams } from "react-router-dom";


const ReviewList = () => {
    const { spotId } = useParams()
    // const reviews = useSelector((state) =>
    // state.reviews ? state.reviews[spotId] : null
    // )
    // // if(state) {
    // //     console.log(state.reviews)
    // // }
    const dispatch = useDispatch();
    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)

    console.log('list o reviews: ', reviews)

    useEffect(() => {
        console.log('useEffect, reviewList: ')
        dispatch(getOneSpotsReviews(spotId))
    }, [dispatch, spotId]);

    // if(!reviews) return <>null</>


    return (
        <>
            <div className='spotReviews'>
                {reviews?.map(({ review, User, createdAt }) => (
                    <div className='reviewSection'>
                        <div className='userInfo'>
                            <h3>
                            {User.firstName}
                            </h3>
                            {createdAt}
                        </div>
                        <p>
                        {review}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ReviewList
