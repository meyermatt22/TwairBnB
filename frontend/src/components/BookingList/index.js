import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpotsBookings } from "../../store/bookings";
import './BookingList.css'


const BookingList = () => {
  const { spotId } = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpotsBookings(spotId));
  }, [dispatch, spotId])

  const bookingsObj = useSelector((state) => state.bookings.spot)
  const bookings = Object.values(bookingsObj)

  console.log('bookinglist booking info: ', bookings)


  if(!bookings.length) return null
  return (
    <div id="bookingList">

        <h1>bookinglist component</h1>
        <div>
            {bookings?.map(({ startDate, endDate }) => (
                <div>

                    <div>{startDate}</div>
                    <div>{endDate}</div>
                </div>
            ))}
        </div>
    </div>
  )

};

export default BookingList
