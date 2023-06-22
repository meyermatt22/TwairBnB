import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUsersBookings } from "../../store/bookings";
import { getAllSpots } from "../../store/spots";
import "./BookingCurrList.css";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteBooking from "../BookingDeleteModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const FutureBookings = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const bookingsObj = useSelector((state) => state.bookings.spot);
  const bookings = Object.values(bookingsObj);
  const sortedBookings = bookings.sort((a, b) => {
    return a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0;
  });
  const spotList = useSelector((state) => Object.values(state.spots));
  let empty = true;

  useEffect(() => {
    dispatch(getCurrentUsersBookings());
    dispatch(getAllSpots());
  }, [dispatch, bookings.length, empty]);

  const today = new Date().toISOString();

  bookings.forEach((b) => {
    if (today < b.endDate) empty = false;
  });

  console.log("=========> ====>", empty);

  return (
    <div id="futureBookings">
      <h2> Future Bookings </h2>
      <div id="fBookingArea">
        {sortedBookings?.map(({ startDate, endDate, spotId, id }) => (
          <div>
            {today < endDate && (
              <div className="bookSingle">
                <div className="spotInfo">
                  {spotList
                    ?.filter((s) => {
                      if (s.id === spotId) return s;
                    })
                    .map(({ name, id }) => (
                      <Link to={`/spots/${id}`} key={id} className="bookName">
                        {name}
                      </Link>
                    ))}
                </div>
                Booked from {startDate.slice(0, 10)} until{" "}
                {endDate.slice(0, 10)}{" "}
                <OpenModalButton
                  buttonText="Remove Reservation"
                  onButtonClick={(e) => e.stopPropagation()}
                  modalComponent={<DeleteBooking bookingId={id} />}
                />
              </div>
            )}
          </div>
        ))}
        {empty && (
          <h2 className="emptyDiv">
            {" "}
            It looks like you have no upcoming bookings. <br/> <br/> click{" "}
            <button>here</button> to explore new places to stay!
          </h2>
        )}
      </div>
    </div>
  );
};

export default FutureBookings;
