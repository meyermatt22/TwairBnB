import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { createSpot } from "../../store/spots"

const SpotForm = ({ spot }) => {
    console.log('SpotForm')
    const history = useHistory();
    const [address, setAddress] = useState(spot?.address)
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        spot = { ...spot, address };

        // if(formType === "Create Spot") {
            const newSpot = await dispatch(createSpot(spot))
            spot = newSpot;
        // }
        if(spot.errors) {
            setErrors(spot.errors)
        } else {
            history.push(`/spots/${spot.id}`)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>spotForm</h1>
            {/* {formType} */}
            <div className="errors">{errors.address}</div>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
        </form>
    )
}

export default SpotForm
