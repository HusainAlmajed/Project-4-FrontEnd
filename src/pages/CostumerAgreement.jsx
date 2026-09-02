import { Link } from "react-router"
import "../styles/customerAgreements.css"

const CustomerAgreement = (props) => {

    if (!props.agreements) {
        return <p>Loading agreements...</p>
    }

    const customerAgreements = props.agreements.filter(
        (agreement) => props.user?.role === "customer" &&
            String(agreement.customer?._id) === String(props.user._id))


    return (
        <div className="customer-agreements-page">

            <div className="customer-agreements-header">
                <h1>My Agreements</h1>
                <p>View and manage your warranty and insurance agreements</p>
            </div>

            {customerAgreements.length === 0 ? (

                <div className="customer-empty-agreements">
                    <div className="customer-empty-icon">📄</div>

                    <h3>No agreements found</h3>

                    <p>
                        You don't have any agreements yet.
                    </p>

                </div>

            ) : (

                <div className="customer-agreement-grid">

                    {customerAgreements.map((agreement) => (

                        <Link
                            key={agreement._id}
                            to={`/agreements/${agreement._id}`}
                            className="customer-agreement-card"
                        >

                            <div className="customer-agreement-card-top">

                                <span className="customer-agreement-type">
                                    {agreement.type}
                                </span>

                                <span
                                    className={`customer-agreement-status ${agreement.status}`}
                                >
                                    {agreement.status}
                                </span>

                            </div>

                            <div className="customer-agreement-content">

                                <h3>
                                    {agreement.description || "Agreement"}
                                </h3>

                                <p>
                                    View agreement details
                                </p>

                            </div>

                            <div className="customer-agreement-footer">

                                <span>
                                    View Details
                                </span>

                                <span className="customer-agreement-arrow">
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

export default CustomerAgreement