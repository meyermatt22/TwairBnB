import { useState, useEffect } from "react";
import { Modal, useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createSpotBooking, getOneSpotsBookings } from "../../store/bookings";
import BookingList from "../BookingList";
import './BookingModal.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BookingModal = ({ spotId, spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});

  const user = useSelector((state) => state.session.user);
  const userId = user.id;

  const bookingsObj = useSelector((state) => state.bookings.spot);
  const bookings = Object.values(bookingsObj);

  useEffect(() => {
    dispatch(getOneSpotsBookings(spotId));
  }, [dispatch, spotId]);

  function validate(startDate, endDate) {
    const errorsObj = {};
    bookings.forEach((b) => {
      if (startDate > b.startDate && startDate <= b.endDate) {
        errorsObj.startDate = "Start date conflicts with an existing booking";
      }
      if (endDate > b.startDate && endDate < b.endDate) {
        errorsObj.endDate = "End date conflicts with an existing booking";
      }
    });
    return errorsObj;
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBooking = {
      spotId,
      userId,
      endDate,
      startDate,
    };

    const errors = validate(startDate, endDate);

    if (errors && Object.values(errors) && Object.values(errors).length) {
      return setErrors(errors);
    }

    if (errors.length) return errors;

    const resBooking = await dispatch(createSpotBooking(newBooking));

    if (resBooking.errors) {
      setErrors(resBooking.errors);
    } else {
      dispatch(getOneSpotsBookings(spotId));
      history.push('/bookings/current')
      closeModal();
    }
  };

  return (
    <form className="bookingModal" onSubmit={handleSubmit}>
      <h1>book a stay today!</h1>
      {/* <div className="errors"> {[errors]}</div> */}
      <div className="form-input-box">
        <label for="startDate">startDate: </label>
        <input
          type="date"
          name="startDate"
          required
          onChange={(e) => setStartDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          ></input>
      </div>
          <div>
          {errors.startDate}
          </div>
      <div className="form-input-box">
        <label for="endDate">endDate: </label>
        <input
          type="date"
          name="endDate"
          required
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate}
          ></input>
      </div>
          <div>
          {errors.endDate}
          </div>
      <div id="spotBookings">
      <BookingList spot={spot}/>
      </div>
      <button type="submit" className="submitReview">
        Book it!
      </button>
    </form>
  );
};

export default BookingModal;
