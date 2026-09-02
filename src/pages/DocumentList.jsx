import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import * as documentServices from "../services/document"
import "../styles/documentList.css"

const DocumentList = () => {

    const { agreementId } = useParams()
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                if (!agreementId) {
                    console.error("Agreement ID is missing")
                    return
                }


                const documentData = await documentServices.index(agreementId)
                setDocuments(documentData)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching documents:", error)
            }
        }
        fetchDocuments()
    }, [agreementId])

    const handleDeleteDocument = async (documentId) => {
        await documentServices.deleteDocument(documentId)

        setDocuments(documents.filter((document) => document._id !== documentId))
    }

    if (loading) {
        return <h2>Loading documents...</h2>
    }

    return (
        <div className="document-list-page">

            <div className="document-list-header">
                <p className="document-list-label">
                    AGREEMENT DOCUMENTS
                </p>

                <h1>Document Details</h1>

                <p>
                    View the documents attached to this agreement.
                </p>
            </div>


            {documents.length === 0 ? (

                <div className="document-empty">

                    <h3>No documents added yet</h3>

                    <p>
                        There are currently no documents attached to this agreement.
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

        </div>
    )

}

export default DocumentList