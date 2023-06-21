import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUsersBookings } from "../../store/bookings";
import "./BookingCurrList.css";
import { getAllSpots } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import DeleteBooking from "../BookingDeleteModal";

const BookingCurrList = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUsersBookings());
    dispatch(getAllSpots());
  }, [dispatch]);

  const today = new Date().toISOString();

  console.log("==========> newnew :", today);
  const spotList = useSelector((state) => Object.values(state.spots));
  const bookingsObj = useSelector((state) => state.bookings.spot);
  const bookings = Object.values(bookingsObj);
  const sortedBookings = bookings.sort((a, b) => {
    return a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0;
  });
  //   console.log("===========>: ", spotList);

  if (!bookings.length) return <h1>yoyoyo</h1>;
  return (
    <div id="currentBookings">
      <h1> My Bookings </h1>
      <div id="bookingsArea">
        {sortedBookings?.map(({ startDate, endDate, spotId, id }) => (
          <div className="bookSingle">
            <div className="bookContent">
              {spotList
                ?.filter((s) => {
                  if (s.id === spotId) return s;
                })
                .map(({ name }) => (
                  <div className="bookName">{name}</div>
                ))}
              Booked from {startDate.slice(0, 10)} until {endDate.slice(0, 10)}{" "}
              <div className="modalBtn">
                {today < startDate && (
                  <OpenModalButton
                    buttonText="Remove Reservation"
                    onButtonClick={(e) => e.stopPropagation()}
                    modalComponent={<DeleteBooking bookingId={id} />}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCurrList;
