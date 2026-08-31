import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import * as agreementServices from "../services/agreement.js"
import * as documentServices from "../services/document"

const AgreementForm = (props) => {
    const navigate = useNavigate()
    const { agreementId } = useParams()

    const initialState = {
        type: "",
        startDate: "",
        endDate: "",
        status: "active",
        description: "",

        // customer information
        customerPhone: "",

        // asset information
        assetName: "",
        assetType: "",
    }

    const documentInitialState = {
        title: '',
        documentType: 'contract',
        url: '',
    }

    const [documentData , setDocumentData] = useState(documentInitialState)
    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState("")

    const calculateStatus = (endDate) => {
    if (!endDate) return "active"

    const today = new Date()
    const end = new Date(endDate)

    today.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)

    if (end < today) {
        return "expired"
    }

    const differenceInTime = end.getTime() - today.getTime()
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24)

    if (differenceInDays <= 30) {
        return "expiring soon"
    }

    return "active"
}

    const handleDocumentChange = (event) => {
        setDocumentData({
            ...documentData,
            [event.target.name]: event.target.value,
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        

        try {

            const status = calculateStatus(formData.endDate)
            const agreementData = {
                ...formData,
                status: status,
            }

            if (agreementId) {
                await props.handleUpdateAgreement(agreementId, agreementData)
            } else {
                const newAgreement = await props.handleAddAgreement(agreementData)

                await documentServices.create({
                    ...documentData,
                    agreement: newAgreement._id,
            })
        }

            setFormData(initialState)
            setDocumentData(documentInitialState)
            navigate("/agreements-list")
        } catch (error) {
            setMessage(error.message)
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
                    name: agreementData.asset.name,
                    assetType: agreementData.asset.type,
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
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter a brief description of the agreement"
                    />
                </label>

                <br />

                <h3>Asset Information</h3>

                <label>
                    Asset Name:
                    <input
                        name="assetName"
                        value={formData.assetName}
                        onChange={handleChange}
                        placeholder="Enter the asset name"
                    />
                </label>

                <br />

                <label>

                    Asset Type:
                    <select
                        name="assetType"
                        value={formData.assetType}
                        onChange={handleChange}
                        placeholder="Enter the asset type"
                    >
                        <option value="">Select an asset type</option>
                        <option value="equipment">Equipment</option>
                        <option value="electronic">Electronic</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="property">Property</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                <br />
               {props.user && props.user.role === "owner" && (
                <>
                <h3>Customer Information</h3>
                <label>
                        Customer Phone:
                        <input
                            name="customerPhone"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            placeholder="Enter the customer's phone number"
                        />
                    </label>
                    
                <br />
                </>
                )}                    

                <label>
                    Document Title:
                    <input
                        type="text"
                        name="title"
                        value={documentData.title}
                        onChange={handleDocumentChange}
                        placeholder="e.g. iPhone receipt"
                        required/>
                    </label>

                    <br />

                    <label>
                    Document Type:
                    <select
                        name="documentType"
                        value={documentData.documentType}
                        onChange={handleDocumentChange}
                    >
                        <option value="contract">Contract</option>
                        <option value="receipt">Receipt</option>
                        <option value="warranty">Warranty</option>
                        <option value="insurance">Insurance</option>
                        <option value="other">Other</option>
                    </select>
                    </label>

                    <br />

                    <label>
                    Document URL:
                    <input
                        type="url"
                        name="url"
                        value={documentData.url}
                        onChange={handleDocumentChange}
                        placeholder="https://example.com/document.pdf"
                        required/>
                    </label>
                  

                    <br/>

                <button type="submit">
                    {agreementId ? "Update Agreement" : "Create Agreement"}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default AgreementForm
