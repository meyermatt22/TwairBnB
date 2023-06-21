import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpotsBookings } from "../../store/bookings";
import './BookingList.css'


const BookingList = ({ spot }) => {
  const { spotId } = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpotsBookings(spotId));
  }, [dispatch, spotId])

  const bookingsObj = useSelector((state) => state.bookings.spot)
  const bookings = Object.values(bookingsObj)

  const sortedBookings = bookings.sort((a,b) => {
    return (a.startDate < b.startDate) ? -1 : ((a.startDate > b.startDate) ? 1 : 0);
  })

  // console.log('bookinglist booking info: ', bookings[0].startDate)


  if(!bookings.length) return null
  return (
    <div id="bookingList">

        <h1>Current Reservations for {spot.name}</h1>
        <h3>Reservations must NOT interfere with the following dates:</h3>
        <div id="bookingsScroll">
            {sortedBookings?.map(({ startDate, endDate }) => (
                <div className="booked">
                    <div>{startDate.slice(0,10)} - {endDate.slice(0,10)}</div>
                </div>
            ))}
        </div>
    </div>
  )

};

export default BookingList
