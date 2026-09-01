import { useState } from "react"
import { useNavigate } from "react-router"
import UploadWidget from "../components/UploadWidget"


const UserProfile = (props) => {

    const navegate = useNavigate()
    // const [profileImage, setProfileImage] = useState("")

    const [isEditing, setIsEditing] = useState(false)

    const [formData, setFormData] = useState({

        username: props.user.username,
        email: props.user.email,
        phone: props.user.phone,
        profileImage: props.user.profileImage || ""

    })

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleImageUpload = (imageUrl) => {
        setFormData({
            ...formData,
            profileImage: imageUrl
        })
    }

    const handleEdite = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setFormData({
            username: props.user.username,
            email: props.user.email,
            phone: props.user.phone
        })

        setIsEditing(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {

            const updatedUser = await props.updateUser(
                props.user._id,
                formData
            )


            props.setUser(updatedUser)

            setIsEditing(false)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
        navigate('/')
    }
    return (
        <div className="profile">

            <h1>My Profile</h1>

            {!isEditing ? (
                <div>
                    {props.user.profileImage && (
                        <img
                            src={props.user.profileImage}
                            alt="Profile"
                            width="150"
                        />
                    )}

                    <p>
                        <strong>Username:</strong>{" "}
                        {props.user.username}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {props.user.email}
                    </p>

                    <p>
                        <strong>Phone:</strong>{" "}
                        {props.user.phone}
                    </p>

                    <button onClick={handleEdite}>
                        Edit Profile
                    </button>

                    <button onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <label >Profile Image</label>

                    <UploadWidget setImage={handleImageUpload} />

                    {formData.profileImage && (
                        <img
                            src={formData.profileImage}
                            alt="Profile Preview"
                            width="150"
                        />
                    )}

                    <button type="submit">
                        Save Changes
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                </form>
            )}

        </div>
    )
}

export default UserProfile