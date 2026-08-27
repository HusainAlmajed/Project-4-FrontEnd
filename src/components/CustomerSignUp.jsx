import { useState } from "react";
import { customerSignUp } from "../services/authServices";
import { useNavigate } from "react-router";


const CustomerSignUpForm = (props) => {
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
}