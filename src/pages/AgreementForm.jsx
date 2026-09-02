import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import * as agreementServices from "../services/agreement.js"
import * as documentServices from "../services/document"
import * as inspectionServices from "../services/inspection"
import UploadWidget from "../components/UploadWidget.jsx"
import "../styles/agreementForm.css"

const AgreementForm = (props) => {
    const navigate = useNavigate()
    const { agreementId } = useParams()
    const [documentId, setDocumentId] = useState(null)
    const [inspectionId, setInspectionId] = useState(null)

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

    const inspectionInitialState = {
        inspectionType: '',
        images: [],
        notes: '',
        date: '',
    }

    const [inspectionData, setInspectionData] = useState(inspectionInitialState)

    const [documentData, setDocumentData] = useState(documentInitialState)
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

    const handleInspectionChange = (event) => {
        setInspectionData({
            ...inspectionData,
            [event.target.name]: event.target.value,
        })
    }

    const handleInspectionImageUpload = (imageUrl) => {
        setInspectionData({
            ...inspectionData,
            images: [...inspectionData.images, imageUrl]
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
                await props.handleUpdateAgreement(
                    agreementId,
                    agreementData
                )

                if (documentId) {
                    await documentServices.update(
                        documentId,
                        documentData
                    )
                } else if (documentData.title || documentData.url) {
                    await documentServices.create({
                        ...documentData,
                        agreement: agreementId,
                    })
                }

                if (formData.assetType === "property") {

                    if (inspectionId) {
                        await inspectionServices.update(
                            inspectionId,
                            inspectionData
                        )
                    } else if (
                        inspectionData.inspectionType ||
                        inspectionData.notes ||
                        inspectionData.images.length > 0
                    ) {
                        await inspectionServices.create({
                            ...inspectionData,
                            agreement: agreementId,
                        })
                    }
                }

            } else {
                const newAgreement =
                    await props.handleAddAgreement(agreementData)

                await documentServices.create({
                    ...documentData,
                    agreement: newAgreement._id,
                })

                if (formData.assetType === "property") {
                    await inspectionServices.create({
                        ...inspectionData,
                        agreement: newAgreement._id,
                    })
                }
            }

            setFormData(initialState)
            setDocumentData(documentInitialState)
            setInspectionData(inspectionInitialState)

        } catch (error) {
            setMessage(error.message)
            console.error(
                "Error submitting agreement form:",
                error
            )
        }
    }
    useEffect(() => {
        const fetchAgreement = async () => {
            try {
                const agreementData = await agreementServices.show(agreementId)

                setFormData({
                    type: agreementData.type,
                    startDate: agreementData.startDate ? agreementData.startDate.split("T")[0] : "",
                    endDate: agreementData.endDate ? agreementData.endDate.split("T")[0] : "",
                    status: agreementData.status,
                    description: agreementData.description,
                    assetName: agreementData.asset.name,
                    assetType: agreementData.asset?.assetType,

                    customerPhone: agreementData.customer.phone,

                })

                const documentData = await documentServices.index(agreementId)
                if (documentData.length > 0) {
                    const document = documentData[0]
                    setDocumentId(document._id)
                    setDocumentData({
                        title: document.title,
                        documentType: document.documentType,
                        url: document.url,
                    })
                }

                const inspectionData = await inspectionServices.index(agreementId)
                if (inspectionData.length > 0) {
                    setInspectionId(inspectionData._id)
                    setInspectionData({
                        inspectionType: inspectionData.inspectionType,
                        notes: inspectionData.notes,
                        date: inspectionData.date ? inspectionData[0].date.split("T")[0] : "",
                        images: inspectionData.images,
                    })
                }

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
        <div className="agreement-page">

            <div className="agreement-container">

                <div className="agreement-header">
                    <h1>
                        {agreementId ? "Edit Agreement" : "Create Agreement"}
                    </h1>

                    <p>
                        {agreementId
                            ? "Update the agreement information below."
                            : "Create a new warranty or insurance agreement."}
                    </p>
                </div>


                <form className="agreement-form" onSubmit={handleSubmit}>

                    {/* ================= AGREEMENT INFORMATION ================= */}

                    <div className="form-section">

                        <div className="section-header">
                            <h2>Agreement Information</h2>
                            <p>Enter the basic agreement details</p>
                        </div>

                        <div className="form-grid">

                            <label>
                                <span>Type</span>

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


                            <label>
                                <span>Start Date</span>

                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </label>


                            <label>
                                <span>End Date</span>

                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                        </div>


                        <label className="full-width">
                            <span>Description</span>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter a brief description of the agreement"
                            />
                        </label>

                    </div>


                    {/* ================= ASSET INFORMATION ================= */}

                    <div className="form-section">

                        <div className="section-header">
                            <h2>Asset Information</h2>
                            <p>Enter the information about the covered asset</p>
                        </div>

                        <div className="form-grid">

                            <label>
                                <span>Asset Name</span>

                                <input
                                    name="assetName"
                                    value={formData.assetName}
                                    onChange={handleChange}
                                    placeholder="Enter the asset name"
                                />
                            </label>


                            <label>
                                <span>Asset Type</span>

                                <select
                                    name="assetType"
                                    value={formData.assetType}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select an asset type
                                    </option>

                                    <option value="equipment">
                                        Equipment
                                    </option>

                                    <option value="electronic">
                                        Electronic
                                    </option>

                                    <option value="vehicle">
                                        Vehicle
                                    </option>

                                    <option value="property">
                                        Property
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                            </label>

                        </div>

                    </div>


                    {/* ================= CUSTOMER INFORMATION ================= */}

                    {props.user && props.user.role === "owner" && (
                        <div className="form-section">

                            <div className="section-header">
                                <h2>Customer Information</h2>
                                <p>Enter the customer's contact information</p>
                            </div>

                            <label>
                                <span>Customer Phone</span>

                                <input
                                    name="customerPhone"
                                    value={formData.customerPhone}
                                    onChange={handleChange}
                                    placeholder="Enter the customer's phone number"
                                />
                            </label>

                        </div>
                    )}


                    {/* ================= INSPECTION ================= */}

                    {!agreementId &&
                        props.user?.role === "owner" &&
                        formData.assetType === "property" && (

                            <div className="form-section inspection-section">

                                <div className="section-header">
                                    <h2>Property Inspection</h2>

                                    <p>
                                        Add inspection information and property
                                        images.
                                    </p>
                                </div>


                                <label>
                                    <span>Inspection Type</span>

                                    <select
                                        name="inspectionType"
                                        value={inspectionData.inspectionType}
                                        onChange={handleInspectionChange}
                                        required
                                    >
                                        <option value="">
                                            Select type
                                        </option>

                                        <option value="before">
                                            Before move-in
                                        </option>

                                        <option value="after">
                                            After move-out
                                        </option>

                                    </select>

                                </label>


                                <div className="upload-area">

                                    <label>
                                        <span>Property Images</span>
                                    </label>

                                    <UploadWidget
                                        setImage={handleInspectionImageUpload}
                                    />


                                    <div className="inspection-images">

                                        {inspectionData.images.map(
                                            (image, index) => (

                                                <div
                                                    className="inspection-image"
                                                    key={index}
                                                >

                                                    <img
                                                        src={image}
                                                        alt={`Property inspection ${index + 1}`}
                                                    />

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>


                                <label>
                                    <span>Notes</span>

                                    <textarea
                                        name="notes"
                                        value={inspectionData.notes}
                                        onChange={handleInspectionChange}
                                        placeholder="Describe the property condition"
                                    />

                                </label>


                                <label>
                                    <span>Inspection Date</span>

                                    <input
                                        type="date"
                                        name="date"
                                        value={inspectionData.date}
                                        onChange={handleInspectionChange}
                                        required
                                    />

                                </label>

                            </div>
                        )}


                    {/* ================= DOCUMENT ================= */}

                    <div className="form-section">

                        <div className="section-header">
                            <h2>Document Information</h2>

                            <p>
                                Add a document related to this agreement.
                            </p>
                        </div>


                        <div className="form-grid">

                            <label>
                                <span>Document Title</span>

                                <input
                                    type="text"
                                    name="title"
                                    value={documentData.title}
                                    onChange={handleDocumentChange}
                                    placeholder="e.g. iPhone receipt"
                                    required
                                />

                            </label>


                            <label>
                                <span>Document Type</span>

                                <select
                                    name="documentType"
                                    value={documentData.documentType}
                                    onChange={handleDocumentChange}
                                >

                                    <option value="contract">
                                        Contract
                                    </option>

                                    <option value="receipt">
                                        Receipt
                                    </option>

                                    <option value="warranty">
                                        Warranty
                                    </option>

                                    <option value="insurance">
                                        Insurance
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                            </label>

                        </div>


                        <label className="full-width">
                            <span>Document URL</span>

                            <input
                                type="url"
                                name="url"
                                value={documentData.url}
                                onChange={handleDocumentChange}
                                placeholder="https://example.com/document.pdf"
                                required
                            />

                        </label>

                    </div>


                    {/* ================= SUBMIT ================= */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            {agreementId
                                ? "Update Agreement"
                                : "Create Agreement"}
                        </button>

                    </div>

                </form>


                {message && (
                    <div className="form-message">
                        {message}
                    </div>
                )}

            </div>

        </div>
    )
}

export default AgreementForm
