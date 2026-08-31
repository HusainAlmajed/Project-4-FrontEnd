import { useState } from "react"
import { useNavigate } from "react-router"


const UserProfile = (props) => {

    const navegate = useNavigate()

    const [isEditing, setIsEditing] = useState(false)

    const [formData, setFormData] = useState({

        username: props.user.username,
        email: props.user.email,
        phone: props.user.phone

    })

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
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
                    <img
                        src={props.user.profileImage}
                        alt="Profile"
                    />

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
                <form>

                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

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