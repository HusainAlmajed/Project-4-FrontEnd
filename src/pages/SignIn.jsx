import { useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../services/authServices";

const SignInForm = ({setUser}) => {
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
        <div>
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
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

                <button type="submit">
                    Sign In
                </button>

            </form>

            {message && <p>{message}</p>}
        </div>
    )
}

export default SignInForm