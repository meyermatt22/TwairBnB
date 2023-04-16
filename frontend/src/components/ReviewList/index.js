import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpotsReviews } from '../../store/reviews';
import { useParams } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import PostReviewModal from '../PostReviewModal';
import DeleteReview from '../DeleteReviewModal';
import "./ReviewList.css"


const ReviewList = ({OwnerId}) => {
    const { spotId } = useParams()

    const user = useSelector((state) => (state.session.user))
    const dispatch = useDispatch();
    const reviewsObj = useSelector((state) => state.reviews.spot)
    const reviews = Object.values(reviewsObj)

    // console.log('reviews object: ', reviewsObj)
    useEffect(() => {
        console.log('useEffect, reviewList: ')
        dispatch(getOneSpotsReviews(spotId))
    }, [dispatch, spotId, reviews.length]);


    console.log('owner id : ', OwnerId)

    let reviewFound = false
    if(user) {
        reviews.forEach(r => {
            if(r.userId === user.id || OwnerId === user.id ) {
                reviewFound = true
            }
        })
    }
    if(!user) {
        reviewFound = true
    }
    function PostAReview() {
        if(reviewFound === false) {
            return (
                <div >
                    <OpenModalButton modalComponent={<PostReviewModal spotId={spotId} />} buttonText="Post Your Review"/>
                </div>
            )
        }
    }
    function BeTheFirst() {
        if(reviewFound === false && reviews.length === 0) {
            return (
                <p>Be the first to post a review!</p>
            )
        }
    }




        for( let i = 0; i < reviews.length; i++) {
            let r = reviews[i]
            if(!r.review) return null
            if(user && r.User.firstName === user.firstName) {
                console.log("r.review.id", r)
                r.User.deleteOption = <OpenModalButton buttonText="DELETE" onButtonClick={(e) => e.stopPropagation()} modalComponent={<DeleteReview id={r.id} spotId={spotId} />}/>
            }
            const date = new Date(r.createdAt)
            const options = {
                month: "long", year: "numeric"
            }
            r.createdAt = date.toLocaleString("en-US", options)
        }

    

    return (
        <>
            <div className='spotReviews'>
                <PostAReview/>
                <BeTheFirst/>
                {reviews?.map(({ review, User, createdAt }) => (
                    <div className='reviewSection' key={review.id}>
                        <div className='userInfo'>
                            <h1>
                            {User.firstName}
                            </h1>
                            {createdAt}
                        </div>
                        <p>
                        {review}
                        </p>
                        {User.deleteOption}
                    </div>
                ))}
            </div>
        </>
    )
}

export default ReviewList
