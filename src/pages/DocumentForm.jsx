import { useState , useEffect} from "react"
import * as documentServices from "../services/document"
import { useNavigate , useParams } from "react-router"

const DocumentForm = () => {

    const navigate = useNavigate()
    const { agreementId , documentId} = useParams()

    const initialState = {
        title: '',
        documentType: 'contract',
        url: '',
    }

    const [formData , setFormData] = useState(initialState)
    const [message , setMessage] = useState('')

    useEffect(() => {
      const fetchDocument = async () => {
        try {
          const documentData = await documentServices.show(documentId)

        setFormData({
          title: documentData.title,
          documentType: documentData.documentType,
          url: documentData.url,
        })
      } catch (error) {
        setMessage(error.message)
    }
  }

  if (documentId) {
    fetchDocument()
  }
}, [documentId])

    const handleChange = (event) => {
        setFormData({...formData , [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
          if (documentId) {
            await documentServices.update(documentId , formData)
          }else{
              await documentServices.create({
                ...formData,
                agreement: agreementId
            })
           } navigate(`/agreements/${agreementId}/documents`)
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <div>
        <h1>{documentId ? "Edit Document" : "Add Document"}</h1>

        <form onSubmit={handleSubmit}>
            <label>
          Document Title:
          <input
            type="text"
            name="title"
            placeholder="e.g. iPhone receipt"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <br />

        <label>
          Document Type:
          <select 
          name = "documentType"
          value={formData.documentType}
          onChange={handleChange}
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
            placeholder="https://example.com/document.pdf"
            required
            value={formData.url}
            onChange={handleChange}
          />
        </label>

        <br />

        <button type="submit">{documentId ? "Update Document" : "Add Document"}</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    )

}

export default DocumentForm