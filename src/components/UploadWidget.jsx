import { useEffect, useRef } from "react"

const UploadWidget = (props) => {

    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect(() => {

        cloudinaryRef.current = window.cloudinary

        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "gbbu5lso",
                uploadPreset: "thiqah",
                sources: ["local", "camera"],
                multiple: false,
            },
            (error, result) => {

                if (!error && result.event === "success") {
                    console.log("Uploaded:", result.info)

                    props.setImage(result.info.secure_url)
                }
            }
        )

    }, [])

    return (
        <button
            type="button"
            onClick={() => widgetRef.current.open()}
        >
            Upload File 
        </button>
    )
}

export default UploadWidget