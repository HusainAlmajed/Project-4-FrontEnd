import { useState } from "react";
import { ownerSignUp } from "../services/authServices";
import { useNavigate } from "react-router";


const OwnerSignUpForm = (props) => {
    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',

        name: '',
        type: '',
    }


    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters."
        }

        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter."
        }

        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter."
        }

        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number."
        }

        if (!/[!@#$%^&*]/.test(password)) {
            return "Password must contain at least one special character."
        }

        return ""
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const passwordError = validatePassword(formData.password)
        if (passwordError) {
            setMessage(passwordError)
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match. ")
            return
        }

        try {
            const { confirmPassword, ...ownerData } = formData

            const data = await ownerSignUp(ownerData)

            localStorage.setItem("token", data.token)
            setMessage("Owner account created successfully!")
            navigate('/')
        } catch (error) {
            setMessage(error.message)
        }
    }


    return (
        <form onSubmit={handleSubmit}>

            <h2>Owner Sign Up</h2>

            <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />

            <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            <h3>Business Details</h3>

            <input
                name="name"
                placeholder="Business Name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                name="type"
                placeholder="Business Type"
                value={formData.type}
                onChange={handleChange}
            />

            <button type="submit">
                Create Account
            </button>

            {message && <p>{message}</p>}

        </form>
    )

}
export default OwnerSignUpForm