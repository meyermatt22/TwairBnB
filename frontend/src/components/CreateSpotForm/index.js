import SpotForm from "../SpotForm";

const CreateSpotForm = () => {
    console.log('CreateSpotForm hit **')
    const spot = {
        address: ""
    }

    return <SpotForm spot={spot} formType="Create Spot"/>
}

export default CreateSpotForm;
