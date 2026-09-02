import { useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../services/authServices";
import "../styles/customerSignUp.css";

const SignInForm = ({ setUser }) => {
    const navigate = useNavigate()

    const initialState = {
        email: '',
        password: '',
    }

    const [formData, setFormData] = useState(initialState)

    const [message, setMessage] = useState("")

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const data = await signIn(formData)

            localStorage.setItem("token", data.token)

            const user = JSON.parse(atob(data.token.split('.')[1])).payload

            setUser(user)

            navigate("/dashboard")
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">
                    <h1>Sign In</h1>
                    <p>Welcome back! Sign in to continue</p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

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
                            required
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
                            required
                        />

                    </div>


                    <button
                        className="auth-submit"
                        type="submit"
                    >
                        Sign In
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

export default SignInForm