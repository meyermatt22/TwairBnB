// import CreateSpotImageForm from "../CreateSpotImgForm";
import SpotForm from "../SpotForm";

const CreateSpotForm = () => {
    console.log('CreateSpotForm hit **')
    const spot = {
        address: "address",
        city: "City",
        state: "STATE",
        country: "Country",
        name: "Name of your spot",
        description: "Please write at least 30 characters",
        price: "Price per night(USD)",
        lat: 50,
        lng: -50,
        url: "Preview Image URL",
        url1: "Image URL",
        url2: "Image URL",
        url3: "Image URL",
        url4: "Image URL",
        preview: true
    }

    return (
        <div>
            <SpotForm spot={spot} />
            {/* <CreateSpotImageForm spot={spot}/> */}
        </div>
    )
}

export default CreateSpotForm;
