import { useState } from "react"
import { useNavigate } from "react-router"
import UploadWidget from "../components/UploadWidget"
import "../styles/userProfil.css"


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
        <div className="profile-page">

            <div className="profile-header">
                <p className="profile-label">ACCOUNT</p>
                <h1>My Profile</h1>
                <p className="profile-subtitle">
                    Manage your personal information
                </p>
            </div>


            {!isEditing ? (

                <div className="profile-card">

                    <div className="profile-image-section">

                        {props.user.profileImage ? (
                            <img
                                className="profile-image"
                                src={props.user.profileImage}
                                alt="Profile"
                            />
                        ) : (
                            <div className="profile-image-placeholder">
                                {props.user.username?.charAt(0).toUpperCase()}
                            </div>
                        )}

                    </div>


                    <div className="profile-info">

                        <div className="profile-info-item">
                            <span>Username</span>
                            <p>{props.user.username}</p>
                        </div>

                        <div className="profile-info-item">
                            <span>Email</span>
                            <p>{props.user.email}</p>
                        </div>

                        <div className="profile-info-item">
                            <span>Phone</span>
                            <p>{props.user.phone}</p>
                        </div>

                    </div>


                    <div className="profile-actions">

                        <button
                            className="profile-edit-button"
                            onClick={handleEdite}
                        >
                            Edit Profile
                        </button>

                        <button
                            className="profile-signout-button"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>

                    </div>

                </div>

            ) : (

                <div className="profile-card edit-profile-card">

                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="profile-form-group">

                            <label htmlFor="username">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="profile-form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="profile-form-group">

                            <label htmlFor="phone">
                                Phone
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="profile-form-group">

                            <label>
                                Profile Image
                            </label>

                            <UploadWidget
                                setImage={handleImageUpload}
                            />

                        </div>


                        {props.user.profileImage && (

                            <div className="profile-preview">

                                <img
                                    src={props.user.profileImage}
                                    alt="Profile Preview"
                                />

                                <span>Profile image preview</span>

                            </div>

                        )}


                        <div className="profile-form-actions">

                            <button
                                className="profile-save-button"
                                type="submit"
                            >
                                Save Changes
                            </button>

                            <button
                                className="profile-cancel-button"
                                type="button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}

        </div>
    )
}

export default UserProfile