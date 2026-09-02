
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router"
import * as agreementServices from "../services/agreement.js"

const AgreementDetails = (props) => {

    
    
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
            <h2>Asset Information</h2>
            <p><strong>Name:</strong> {agreement.asset.name}</p>
            <p><strong>Type:</strong> {agreement.asset.assetType}</p>
            
            {props.user && props.user.role === "customer" && String(props.user._id) === String(agreement.customer._id) ? (
                <>
                    <h2>Business Information</h2>
                <p>
                     <strong>Business:</strong>{" "}
                     {agreement.business?.name || "You created this agreement"}
                </p>
            </>
            ) : null}

            {props.user && props.user.role === "owner" && String(props.user._id) === String(agreement.owner._id) ? (
                <>
                <h2>Customer Information</h2>
                <p><strong>Name:</strong> {agreement.customer.username}</p>
                <p><strong>Email:</strong> {agreement.customer.email}</p>
                <p><strong>Phone:</strong> {agreement.customer.phone}</p>
                </>
            ) : null}
            <Link to={`/agreements/${agreement._id}/documents`}>View Documents</Link>
            {props.user && 
            props.user.role === "owner" &&
             String(props.user._id) === String(agreement.owner._id) && (
             <>
             
            <Link to={`/agreements/${agreement._id}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteAgreement(agreement._id)}>Delete</button>
            </>
            
            )}

            {props.user &&
            props.user.role === "customer" &&
            String(props.user._id) === String(agreement.createdBy?._id) && (
            <>
            <button onClick={() => props.handleDeleteAgreement(agreement._id)}>Delete</button>
            </>
            )}

        </div>
    )
}

export default AgreementDetails

