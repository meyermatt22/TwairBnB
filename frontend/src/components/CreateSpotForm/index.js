import CreateSpotImageForm from "../CreateSpotImgForm";
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
        price: "Price per night(USD)"

    }

    return (
        <div>
            <SpotForm spot={spot} />
            {/* <CreateSpotImageForm spot={spot}/> */}
        </div>
    )
}

export default CreateSpotForm;
