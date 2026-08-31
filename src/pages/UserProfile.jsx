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
        <div>
            <h1>{props.user.username} Profile</h1>
            <img src={props.user.profileImage} alt="Profile" />

            <p>Username: {props.user.username}</p>
            <p>Email: {props.user.email}</p>
            <p>Phone: {props.user.phone}</p>
            {props.user.role === "owner" && (
                <>
                    <p>Buisness Information</p>
                </>
            )}
        </div>
    )
}

export default UserProfile