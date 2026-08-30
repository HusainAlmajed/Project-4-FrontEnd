import { useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../services/authServices";

const SignInForm = () => {
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
}