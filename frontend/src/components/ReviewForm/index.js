import PostReviewModal from "../PostReviewModal";


const ReviewForm = () => {
    const data = {
        review: "",
        stars: 0
    }

    return <PostReviewModal data={data} />
}

export default ReviewForm
