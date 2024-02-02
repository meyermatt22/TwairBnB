import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import {
  editBookingAction,
  getOneSpotsBookings,
  updateBookingThunk,
} from "../../store/bookings";
import { useEffect, useState } from "react";

const EditBooking = ({ id, spotId, starting, ending }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [startDate, setStartDate] = useState(starting);
  const [endDate, setEndDate] = useState(ending);
  const [errors, setErrors] = useState({});


  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedBooking = {
      startDate,
      endDate,
      spotId,
      id,
    };

    const resBooking = await dispatch(editBookingAction(updatedBooking));

    if (resBooking.errors) {
      setErrors(resBooking.errors);
    } else {
      // dispatch(getOneSpotsBookings(spotId));
      history.push("/bookings/current");
      closeModal();
    }
  };

  return (
    <form className="bookingModal" onSubmit={handleEdit}>
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
          defaultValue={startDate.slice(0,10)}
        ></input>
      </div>
      <div>{errors.startDate}</div>
      <div className="form-input-box">
        <label for="endDate">endDate: </label>
        <input
          type="date"
          name="endDate"
          required
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate}
          defaultValue={endDate.slice(0,10)}
        ></input>
      </div>
      <div>{errors.endDate}</div>
      <div id="spotBookings">{/* <BookingList spot={spot}/> */}</div>
      <button type="submit" className="submitReview">
        Book it!
      </button>
    </form>
  );
};

export default EditBooking;
