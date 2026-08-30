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

 

    return (
        <div>
            <h1>Agreement Form</h1>
        </div>
    )
}

export default AgreementForm