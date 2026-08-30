import { useState } from "react";
import { customerSignUp } from "../services/authServices";
import { useNavigate } from "react-router";


const CustomerSignUpForm = ({setUser}) => {
    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
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
            setMessage("Passwords do not match.")
            return
        }
        try {
            const { confirmPassword, ...userData } = formData

            const data = await customerSignUp(userData)

            localStorage.setItem("token", data.token)

            const user = JSON.parse(atob(data.token.split('.')[1])).payload

            setUser(user)

            navigate("/")
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <div>
            <h1>Customer Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <button type="submit">
                    Sign Up
                </button>

            </form>

            {message && <p>{message}</p>}
        </div>
    )
}

export default CustomerSignUpForm