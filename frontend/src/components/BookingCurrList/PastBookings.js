import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUsersBookings } from "../../store/bookings";
import { getAllSpots } from "../../store/spots";
import './BookingCurrList.css'
import { getCurrentUsersReviews } from "../../store/reviews";
import { Link } from "react-router-dom";

const PastBookings = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUsersBookings());
    dispatch(getAllSpots());
    // dispatch(getCurrentUsersReviews());
  }, [dispatch]);

  const today = new Date().toISOString();

  const bookingsObj = useSelector((state) => state.bookings.spot);
//   const reviewsObj = useSelector((state) => state.reviews.spot);
  const bookings = Object.values(bookingsObj);
//   const reviews = Object.values(reviewsObj);
  const sortedBookings = bookings.sort((a, b) => {
    return b.startDate < a.startDate ? -1 : b.startDate > a.startDate ? 1 : 0;
  });
  const spotList = useSelector((state) => Object.values(state.spots));

  return (
    <div id="pastBookings">
      <h2> Past Bookings </h2>
      <div id="fBookingArea">
        {sortedBookings?.map(({ startDate, endDate, spotId, id }) => (
          <div className="sorted">
            {today >= endDate && (
              <div className="bookSingle">
                <div className="spotInfo">
                {spotList
                  ?.filter((s) => {
                    if (s.id === spotId) return s;
                  })
                  .map(({ name, id }) => (
                    <Link to={`/spots/${id}`} key={id} className="bookName">{name}</Link>
                  ))}
                </div>
                Booked from {startDate.slice(0, 10)} until{" "}
                {endDate.slice(0, 10)}{" "}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastBookings;
