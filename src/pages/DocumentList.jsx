import { useEffect, useState } from "react"
import { useParams , Link } from "react-router"
import * as documentServices from "../services/document"

const DocumentList = () => {

    const { agreementId } = useParams()
    const [documents , setDocuments] = useState([])
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        const fetchDocuments = async () => {
            const allDocuments = await documentServices.index()

            console.log("All documents:", allDocuments)
            console.log("Current agreement ID:", agreementId)

            const agreementDocuments = allDocuments.filter((document) => {
                const documentAgreementId = document.agreement?._id || document.agreement
                return String(documentAgreementId) === String(agreementId)
            })

            setDocuments(agreementDocuments)
            setLoading(false)
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
        <div>
            <h1>Document List</h1>
            {/* <Link to={`/agreements/${agreementId}/documents/new`}>Add Document</Link> */}

            {documents.length === 0 ? (<p>No documents added yet</p>) : (
                <ul>
                    {documents.map((document) => (
                        <li key={document._id}>
                            <p>{document.title}</p>
                            <a href="{document.url}">View document</a>
                            
                            <Link to={`/agreements/${agreementId}/documents/${document._id}/edit`}>Edit</Link>
                            <button onClick={() => handleDeleteDocument(document._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

}

export default DocumentList