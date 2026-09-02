import { useState } from "react";
import { customerSignUp } from "../services/authServices";
import { useNavigate } from "react-router";
import "../styles/customerSignUp.css";


const CustomerSignUpForm = ({ setUser }) => {
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
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">
                    <h1>Customer Sign Up</h1>
                    <p>Create your account to get started</p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="phone">
                            Phone
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>


                    <button
                        className="auth-submit"
                        type="submit"
                    >
                        Sign Up
                    </button>

                </form>


                {message && (
                    <p className="auth-message">
                        {message}
                    </p>
                )}

            </div>

        </div>
    )
}

export default CustomerSignUpForm