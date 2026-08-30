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
            const agreementDocuments = allDocuments.filter((document) => {
                return String(document.agreement?._id) === String(agreementId)
            })

            setDocuments(agreementDocuments)
            setLoading(false)
        }
        fetchDocuments()
    }, [agreementId])

    if (loading) {
        return <h2>Loading documents...</h2>
    }

    return (
        <div>
            <h1>Document List</h1>
            <Link to={`/agreements/${agreementId}/documents/new`}>Add Document</Link>

            {documents.length === 0 ? (<p>No documents added yet</p>) : (
                <ul>
                    {documents.map((document) => (
                        <li key={document._id}>
                            <p>{document.title}</p>
                            <p>{document.documentType}</p>
                            <a href="{document.url}">View document</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

}

export default DocumentList