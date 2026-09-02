import { Link } from "react-router"
import "../styles/agreementList.css"

const AgreementList = (props) => {


    if (!props.agreements) {
        return <p>Loading agreements...</p>
    }

    const ownerAgreements = props.agreements.filter(
        (agreement) => props.user?.role === "owner" &&
            String(agreement.owner?._id) === String(props.user._id))

    return (
        <div className="agreement-list-page">

            <div className="agreement-list-header">
                <h1>Agreements</h1>
                <p>Manage and view your agreements</p>
            </div>

            {ownerAgreements.length === 0 ? (

                <div className="empty-agreements">
                    <div className="empty-icon">📄</div>
                    <h3>No agreements found</h3>
                    <p>You don't have any agreements yet.</p>
                </div>

            ) : (

                <div className="agreement-grid">

                    {ownerAgreements.map((agreement) => (

                        <Link
                            key={agreement._id}
                            to={`/agreements/${agreement._id}`}
                            className="agreement-card"
                        >

                            <div className="agreement-card-top">

                                <span className="agreement-type">
                                    {agreement.type}
                                </span>

                                <span className={`agreement-status ${agreement.status}`}>
                                    {agreement.status}
                                </span>

                            </div>

                            <div className="agreement-card-content">

                                <h3>
                                    {agreement.description || "Agreement"}
                                </h3>

                                <p>
                                    View agreement details
                                </p>

                            </div>

                            <div className="agreement-card-footer">

                                <span>
                                    View Details
                                </span>

                                <span className="agreement-arrow">
                                    →
                                </span>

                            </div>

                        </Link>

                    ))}

                </div>

            )}

        </div>
    )
}

export default AgreementList