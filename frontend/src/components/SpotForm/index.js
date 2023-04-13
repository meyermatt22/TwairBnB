import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { createSpot } from "../../store/spots"
import SpotImageForm from "../SpotImageForm";

const SpotForm = ({ spot }) => {
    console.log('SpotForm hit ***')
    const history = useHistory();
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [country, setCountry] = useState(spot?.country)
    const [name, setName] = useState(spot?.name)
    const [description, setDescription] = useState(spot?.description)
    const [price, setPrice] = useState(spot?.price)
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        console.log('SpotForm handle submit hit ***')
        e.preventDefault();
        setErrors({});
        spot = { ...spot, address, city, state, country, name, description, price };

        // if(formType === "Create Spot") {
            const newSpot = await dispatch(createSpot(spot))
            spot = newSpot;
        // }
        console.log('history update1: ',history)
        if(spot.errors) {
            setErrors(spot.errors)
        } else {
            history.push(`/spots/${spot.id}`)
        }
        console.log('history update2: ',history)
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create a new Spot</h1>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            {/* {formType} */}
            {/* <div className="errors">{errors.address}</div> */}
            <div className="locationInfo">
                <div>
                    <label>
                    Country <div className="errors">{errors.country}</div>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    </label>
                </div>
                <div>
                    <label>
                    Street Address <div className="errors">{errors.address}</div>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    </label>
                </div>
                <div>
                    <label>
                    City <div className="errors">{errors.city}</div>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    </label>
                    <label> ,
                    State <div className="errors">{errors.state}</div>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    </label>
                </div>
            </div>
            <div className="description">
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wif or parking, and what you love about the neighborhood.</p>
                <label>
                  <div className="errors">{errors.description}</div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
            </div>
            <div className="spotName">
                <label>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <div className="errors">{errors.name}</div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </label>
            </div>
            <div className="spotPrice">
                <label>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div className="errors">{errors.price}</div>
                $ <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                </label>
            </div>
            {/* {SpotImageForm(spot)} */}
                <div className="submitButton">
                 <button type="submit">Create new Spot</button>
                </div>
        </form>
    )
}

export default SpotForm