
import SpotForm from "../SpotForm";

const CreateSpotForm = () => {
    
    const spot = {
        address: "",
        city: "",
        state: "",
        country: "",
        name: "",
        description: "",
        price: "",
        lat: 50,
        lng: -50,
        url: "",
        url1: "",
        url2: "",
        url3: "",
        url4: "",
        preview: true
    }

    return (
        <div>
            <SpotForm spot={spot} formType="Create Spot"/>
        </div>
    )
}

export default CreateSpotForm;
