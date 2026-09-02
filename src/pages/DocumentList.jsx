import { useEffect, useState } from "react"
import { useParams , Link } from "react-router"
import * as documentServices from "../services/document"

const DocumentList = () => {

    const { agreementId } = useParams()
    const [documents , setDocuments] = useState([])
    const [loading , setLoading] = useState(true)

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
        <div>
            <h1>Document details</h1>
            {/* <Link to={`/agreements/${agreementId}/documents/new`}>Add Document</Link> */}

            {documents.length === 0 ? (<p>No documents added yet</p>) : (
                <ul>
                    {documents.map((document) => (
                        <li key={document._id}>
                            <p>{document.title}</p>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

}

export default DocumentList