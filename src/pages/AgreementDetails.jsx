
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import * as agreementServices from "../services/agreement.js"

const AgreementDetails = () => {
    const { agreementId } = useParams()
    const [agreement, setAgreement] = useState(null)

    useEffect(() => {
        const fetchAgreement = async () => {
            try {
                const agreementData = await agreementServices.show(agreementId)
                setAgreement(agreementData)
            } catch (error) {
                console.error("Error fetching agreement:", error)
            }
        }

        fetchAgreement()
    }, [agreementId])

    if (!agreement) {
        return <h2>Loading agreement...</h2>
    }

    return (
        <div>
            <h1>Agreement Details</h1>

            <p><strong>Type:</strong> {agreement.type}</p>
            <p><strong>Start Date:</strong> {new Date(agreement.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(agreement.endDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {agreement.status}</p>
            <p><strong>Description:</strong> {agreement.description}</p>
        </div>
    )
}

export default AgreementDetails

