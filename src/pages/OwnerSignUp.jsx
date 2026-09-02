import { useState } from "react";
import { ownerSignUp } from "../services/authServices";
import { useNavigate } from "react-router";
import "../styles/ownerSignUp.css";


const OwnerSignUpForm = ({ setUser }) => {
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
            const user = JSON.parse(atob(data.token.split('.')[1])).payload

            setUser(user)
            navigate('/')
        } catch (error) {
            setMessage(error.message)
        }
    }


    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">
                    <h1>Owner Sign Up</h1>
                    <p>Create your owner and business account</p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* ================= ACCOUNT DETAILS ================= */}

                    <div className="form-section">

                        <h3>Account Details</h3>

                        <div className="form-group">
                            <label htmlFor="username">
                                Username
                            </label>

                            <input
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
                                name="email"
                                type="email"
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
                                name="password"
                                type="password"
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
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                    </div>


                    {/* ================= BUSINESS DETAILS ================= */}

                    <div className="form-section">

                        <div className="section-title">
                            <h3>Business Details</h3>
                            <p>Tell us about your business</p>
                        </div>


                        <div className="form-group">

                            <label htmlFor="name">
                                Business Name
                            </label>

                            <input
                                name="name"
                                placeholder="Enter your business name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="type">
                                Business Type
                            </label>

                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Type
                                </option>

                                <option value="shop">
                                    Shop
                                </option>

                                <option value="property">
                                    Property
                                </option>

                                <option value="insurance">
                                    Insurance
                                </option>

                            </select>

                        </div>

                    </div>


                    <button
                        className="auth-submit"
                        type="submit"
                    >
                        Create Account
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
export default OwnerSignUpForm