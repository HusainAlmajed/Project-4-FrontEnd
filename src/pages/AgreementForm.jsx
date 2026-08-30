import {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router"
import * as agreementServices from '../services/agreement.js'

const AgreementForm = (props) => {

    const navigate = useNavigate()
    const {agreementId} = useParams()

    const initialState = {
        type: '',
        startDate: '',
        endDate: '',
        status: '',
        description: '',

        assetName: '',
        assetType: '',
    }

    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (agreementId) {
               await props.handleUpdateAgreement(agreementId, formData)
            } else {
                await props.handleAddAgreement(formData)
            }

            setFormData(initialState)
            navigate('/dashboard')
        } catch (error) {
            console.error('Error submitting agreement form:', error)
        }
    }
 

    return (
        <div>
            <h1>Agreement Form</h1>
        </div>
    )
}

export default AgreementForm