
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router"
import * as agreementServices from "../services/agreement.js"
import "../styles/AgreementDetails.css"

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
        <div className="agreement-details-page">

            <div className="agreement-details-card">

                {/* Header */}
                <div className="agreement-details-header">

                    <div>
                        <p className="details-back">← Agreement details</p>
                        <h1>Agreement Details</h1>
                    </div>

                    <span className={`agreement-status status-${agreement.status?.replace(/\s+/g, "-")}`}>
                        {agreement.status}
                    </span>

                </div>


                {/* Agreement Information */}
                <section className="details-section">

                    <h2>Agreement Information</h2>

                    <div className="details-grid">

                        <div className="detail-item">
                            <span>Type</span>
                            <strong>{agreement.type}</strong>
                        </div>

                        <div className="detail-item">
                            <span>Status</span>
                            <strong>{agreement.status}</strong>
                        </div>

                        <div className="detail-item">
                            <span>Start Date</span>
                            <strong>
                                {new Date(agreement.startDate).toLocaleDateString()}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>End Date</span>
                            <strong>
                                {new Date(agreement.endDate).toLocaleDateString()}
                            </strong>
                        </div>

                    </div>

                    <div className="description-box">

                        <span>Description</span>

                        <p>
                            {agreement.description || "No description provided."}
                        </p>

                    </div>

                </section>


                {/* Asset Information */}
                <section className="details-section">

                    <h2>Asset Information</h2>

                    <div className="asset-card">

                        <div className="asset-icon">
                            {agreement.asset?.name?.charAt(0)}
                        </div>

                        <div className="asset-info">

                            <h3>{agreement.asset.name}</h3>

                            <p>
                                <span>Type:</span>{" "}
                                {agreement.asset.assetType}
                            </p>

                        </div>

                    </div>

                </section>


                {/* Customer Information */}
                {props.user &&
                    props.user.role === "owner" &&
                    String(props.user._id) === String(agreement.owner._id) && (

                        <section className="details-section">

                            <h2>Customer Information</h2>

                            <div className="person-card">

                                <div className="person-avatar">
                                    {agreement.customer.username?.charAt(0)}
                                </div>

                                <div>

                                    <h3>
                                        {agreement.customer.username}
                                    </h3>

                                    <p>
                                        {agreement.customer.email}
                                    </p>

                                    <p>
                                        {agreement.customer.phone}
                                    </p>

                                </div>

                            </div>

                        </section>

                    )}


                {/* Business Information */}
                {props.user &&
                    props.user.role === "customer" &&
                    String(props.user._id) === String(agreement.customer._id) ? (

                    <section className="details-section">

                        <h2>Business Information</h2>

                        <div className="business-info">

                            <span>Business</span>

                            <strong>
                                {agreement.business?.name ||
                                    "You created this agreement"}
                            </strong>

                        </div>

                    </section>

                ) : null}


                {/* Documents */}
                <section className="details-section">

                    <h2>Documents</h2>

                    <Link
                        className="documents-button"
                        to={`/agreements/${agreement._id}/documents`}
                    >
                        View Documents
                        <span>→</span>
                    </Link>

                </section>


                {/* Actions */}
                <div className="agreement-actions">

                    {props.user &&
                        props.user.role === "owner" &&
                        String(props.user._id) === String(agreement.owner._id) && (

                            <>

                                <Link
                                    className="edit-button"
                                    to={`/agreements/${agreement._id}/edit`}
                                >
                                    Edit Agreement
                                </Link>

                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        props.handleDeleteAgreement(agreement._id)
                                    }
                                >
                                    Delete
                                </button>

                            </>

                        )}


                    {props.user &&
                        props.user.role === "customer" &&
                        String(props.user._id) === String(agreement.createdBy?._id) && (

                            <button
                                className="delete-button"
                                onClick={() =>
                                    props.handleDeleteAgreement(agreement._id)
                                }
                            >
                                Delete
                            </button>

                        )}

                </div>

            </div>

        </div>
    )
}

export default AgreementDetails

