import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import * as documentServices from "../services/document"
import * as inspectionServices from "../services/inspection"
import "../styles/documentList.css"

const DocumentList = () => {

    const { agreementId } = useParams()

    const [documents, setDocuments] = useState([])
    const [inspections, setInspections] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchData = async () => {

            try {

                if (!agreementId) {
                    console.error("Agreement ID is missing")
                    return
                }

                const documentData =
                    await documentServices.index(agreementId)

                const inspectionData =
                    await inspectionServices.index(agreementId)

                setDocuments(documentData)
                setInspections(inspectionData)

                setLoading(false)

            } catch (error) {

                console.error("Error fetching documents and inspections:", error)

                setLoading(false)
            }
        }

        fetchData()

    }, [agreementId])


    const handleDeleteDocument = async (documentId) => {

        await documentServices.deleteDocument(documentId)

        setDocuments(
            documents.filter(
                (document) => document._id !== documentId
            )
        )
    }


    if (loading) {
        return (
    <div
        className="loading-screen"
        role="status"
        aria-live="polite"
    >
        <div className="loading-spinner"></div>
        <p>Loading documents...</p>
    </div>
)
    }


    return (

        <div className="document-list-page">

            {/* ================= HEADER ================= */}

            <div className="document-list-header">

                <p className="document-list-label">
                    AGREEMENT DOCUMENTS
                </p>

                <h1>Document Details</h1>

                <p>
                    View the documents and property inspection
                    evidence attached to this agreement.
                </p>

            </div>


            {/* ================= DOCUMENTS ================= */}

            <section className="documents-section">

                <div className="section-heading">

                    <h2>Documents</h2>

                </div>


                {documents.length === 0 ? (

                    <div className="document-empty">

                        <h3>No documents added yet</h3>

                        <p>
                            There are currently no documents
                            attached to this agreement.
                        </p>

                    </div>

                ) : (

                    <div className="documents-grid">

                        {documents.map((document) => (

                            <div
                                className="document-list-card"
                                key={document._id}
                            >

                                <div className="document-icon">
                                    📄
                                </div>


                                <div className="document-list-info">

                                    <h3>
                                        {document.title}
                                    </h3>

                                    <span className="document-type">
                                        {document.documentType}
                                    </span>

                                </div>


                                <div className="document-card-action">

                                    <a
                                        href={document.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View
                                    </a>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>


            {/* ================= INSPECTIONS ================= */}

            <section className="inspection-section">

                <div className="section-heading">

                    <p className="document-list-label">
                        PROPERTY EVIDENCE
                    </p>

                    <h2>Property Inspections</h2>

                    <p>
                        Photos and information recorded during
                        the property inspection.
                    </p>

                </div>


                {inspections.length === 0 ? (

                    <div className="document-empty">

                        <h3>No inspections added yet</h3>

                        <p>
                            There is currently no property
                            inspection evidence for this agreement.
                        </p>

                    </div>

                ) : (

                    <div className="inspection-list">

                        {inspections.map((inspection) => (

                            <div
                                className="inspection-card"
                                key={inspection._id}
                            >

                                <div className="inspection-header">

                                    <div>

                                        <span className="inspection-type">
                                            {inspection.inspectionType === "before"
                                                ? "Before Move-in"
                                                : "After Move-out"
                                            }
                                        </span>

                                        <h3>
                                            Property Inspection
                                        </h3>

                                    </div>


                                    <span className="inspection-date">

                                        {inspection.date
                                            ? new Date(
                                                inspection.date
                                            ).toLocaleDateString()
                                            : ""
                                        }

                                    </span>

                                </div>


                                {/* ================= IMAGES ================= */}

                                {inspection.images &&
                                    inspection.images.length > 0 && (

                                        <div className="inspection-images">

                                            {inspection.images.map(
                                                (image, index) => (

                                                    <a
                                                        href={image}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        key={index}
                                                    >

                                                        <img
                                                            className="inspection-image"
                                                            src={image}
                                                            alt={`Property inspection ${index + 1}`}
                                                        />

                                                    </a>

                                                )
                                            )}

                                        </div>

                                    )}


                                {/* ================= NOTES ================= */}

                                {inspection.notes && (

                                    <div className="inspection-notes">

                                        <h4>
                                            Notes
                                        </h4>

                                        <p>
                                            {inspection.notes}
                                        </p>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    )
}

export default DocumentList