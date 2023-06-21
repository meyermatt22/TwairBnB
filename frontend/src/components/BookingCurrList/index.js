import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUsersBookings } from "../../store/bookings";
import './BookingCurrList.css'

const BookingCurrList = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUsersBookings())
  }, [dispatch])

  const bookingsObj = useSelector((state) => state.bookings.spot)
  const bookings = Object.values(bookingsObj)
    console.log("===========>: ",bookings)


  if(!bookings.length) return <h1>yoyoyo</h1>
  return (
    <div id="currentBookings">
        <div> hello</div>
        <div> {bookings[0]?.startDate}</div>
        <div id="bookingsArea">
            {bookings?.map(({ startDate, endDate }) => {
                <div >
                <div>{startDate} {endDate} </div>
            </div>
            })}
        </div>
    </div>
  )
};

export default BookingCurrList;
