import { useState } from "react"
import { useParams } from "react-router"

const DocumentList = () => {

    const { agreementId } = useParams
    const [documents , setDocuments] = useState([])
    const [loading , setLoading] = useState(true)


    return (
        <h1>Document List</h1>
    )

}

export default DocumentList