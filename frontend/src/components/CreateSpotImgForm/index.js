import SpotImageForm from "../SpotImageForm";

const CreateSpotImageForm = () => {
    console.log('CreateSpotImgForm hit ****')
    const spot = {
        url: "Image URL",
        preview: true
    }

    return <SpotImageForm spot={spot} />
}

export default CreateSpotImageForm
