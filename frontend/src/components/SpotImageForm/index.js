import { useHistory } from "react-router-dom";
import { createSpotImages } from "../../store/spots";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SpotImageForm = ({ spot }) => {
    console.log('SpotImageForm accessed ***')
    const history = useHistory()
    const [url, setUrl] = useState(spot?.url)
    const [url1, setUrl1] = useState(spot?.url1)
    const [url2, setUrl2] = useState(spot?.url2)
    const [url3, setUrl3] = useState(spot?.url3)
    const [url4, setUrl4] = useState(spot?.url4)
    const [preview, setPreview] = useState(true)
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        console.log('handle submit for spotimageform hit ****')
        e.preventDefault();
        setErrors({})
        spot = { ...spot, url, preview}

        const newSpotImg = await dispatch(createSpotImages(spot))
        spot = newSpotImg

        console.log('history push attempt')
        if(spot.errors) {
            setErrors(spot.errors)
        } else {
            history.push(`/spots/${spot.id}`)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="spotImageForm">
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <div>
                    <label>
                     <div className="errors">{errors.url}</div>
                       <input
                           type="text"
                           value={url}
                           onChange={(e) => setUrl(e.target.value)}
                       />
                    </label>
                </div>
                <div>
                    <label>
                     <div className="errors">{errors.url1}</div>
                       <input
                           type="text"
                           value={url1}
                           onChange={(e) => setUrl1(e.target.value)}
                       />
                    </label>
                </div>
                <div>
                    <label>
                     <div className="errors">{errors.url2}</div>
                       <input
                           type="text"
                           value={url2}
                           onChange={(e) => setUrl2(e.target.value)}
                       />
                    </label>
                </div>
                <div>
                    <label>
                     <div className="errors">{errors.url3}</div>
                       <input
                           type="text"
                           value={url3}
                           onChange={(e) => setUrl3(e.target.value)}
                       />
                    </label>
                </div>
                <div>
                    <label>
                     <div className="errors">{errors.url4}</div>
                       <input
                           type="text"
                           value={url4}
                           onChange={(e) => setUrl4(e.target.value)}
                       />
                    </label>
                </div>
            </div>
        </form>
    )
}

export default SpotImageForm
