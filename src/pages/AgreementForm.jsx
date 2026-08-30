import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import * as agreementServices from "../services/agreement.js"

const AgreementForm = (props) => {
    const navigate = useNavigate()
    const { agreementId } = useParams()

    const initialState = {
        type: "",
        startDate: "",
        endDate: "",
        status: "active",
        description: "",
    }

    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (agreementId) {
                await props.handleUpdateAgreement(agreementId, formData)
            } else {
                await props.handleAddAgreement(formData)
            }

            setFormData(initialState)
            navigate("/agreements-list")
        } catch (error) {
            console.error("Error submitting agreement form:", error)
        }
    }

    useEffect(() => {
        const fetchAgreement = async () => {
            try {
                const agreementData = await agreementServices.show(agreementId)

                setFormData({
                    type: agreementData.type,
                    startDate: agreementData.startDate ,
                    endDate: agreementData.endDate,
                    status: agreementData.status ,
                    description: agreementData.description ,
                })
            } catch (error) {
                console.error("Error fetching agreement:", error)
            }
        }

        if (agreementId) {
            fetchAgreement()
        }

        return () => {
            setFormData(initialState)
        }
    }, [agreementId])

    return (
        <div>
            <h1>{agreementId ? "Edit Agreement" : "Create Agreement"}</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Type:
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="warranty">Warranty</option>
                        <option value="insurance">Insurance</option>
                    </select>
                </label>

                <br />

                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </label>

                <br />

                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </label>

                <br />

                <label>
                    Status:
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="active">Active</option>
                        <option value="expiring soon">Expiring Soon</option>
                        <option value="expired">Expired</option>
                    </select>
                </label>

                <br />

                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter a brief description of the agreement"
                    />
                </label>

                <br />

                <button type="submit">
                    {agreementId ? "Update Agreement" : "Create Agreement"}
                </button>
            </form>
        </div>
    )
}

export default AgreementForm
