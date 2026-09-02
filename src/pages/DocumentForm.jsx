import { useState, useEffect } from "react"
import * as documentServices from "../services/document"
import { useNavigate, useParams } from "react-router"
import "../styles/documentForm.css"

const DocumentForm = () => {

  const navigate = useNavigate()
  const { agreementId, documentId } = useParams()

  const initialState = {
    title: '',
    documentType: 'contract',
    url: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [message, setMessage] = useState('')

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
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (documentId) {
        await documentServices.update(documentId, formData)
      } else {
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
    <div className="document-page">

      <div className="document-card">

        <div className="document-header">
          <p className="document-label">
            DOCUMENTS
          </p>

          <h1>
            {documentId ? "Edit Document" : "Add Document"}
          </h1>

          <p>
            {documentId
              ? "Update your document information."
              : "Add a document to your agreement."
            }
          </p>
        </div>


        <form
          className="document-form"
          onSubmit={handleSubmit}
        >

          <div className="document-form-group">

            <label htmlFor="title">
              Document Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="e.g. iPhone receipt"
              required
              value={formData.title}
              onChange={handleChange}
            />

          </div>


          <div className="document-form-group">

            <label htmlFor="documentType">
              Document Type
            </label>

            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
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

          </div>


          <div className="document-form-group">

            <label htmlFor="url">
              Document URL
            </label>

            <input
              type="url"
              name="url"
              placeholder="https://example.com/document.pdf"
              required
              value={formData.url}
              onChange={handleChange}
            />

            <span className="document-help">
              Add a link to your document.
            </span>

          </div>


          <button
            className="document-submit"
            type="submit"
          >
            {documentId
              ? "Update Document"
              : "Add Document"
            }
          </button>

        </form>


        {message && (
          <p className="document-message">
            {message}
          </p>
        )}

      </div>

    </div>
  )

}

export default DocumentForm