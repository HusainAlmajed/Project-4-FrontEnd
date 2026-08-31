import React from "react"
import { Link } from "react-router"

const DashboardCostumer = ({ agreements = [], user }) => {

    const activeAgreements = agreements.filter(
        (agreement) => agreement.status === "active"
    )

    const expiringAgreements = agreements.filter(
        (agreement) => agreement.status === "expiring soon"
    )

    const expiredAgreements = agreements.filter(
        (agreement) => agreement.status === "expired"
    )
    return (
        <div>
             <header>
                <div>
                    <h1>Customer Dashboard</h1>
                    <h3>Welcome, {user.username}</h3>

                </div>
            </header>

            <section>

                <div>
                    <h3>Active Warranties</h3>
                    <h2>{activeAgreements.length}</h2>
                </div>

                <div>
                    <h3>Expiring Soon</h3>
                    <h2>{expiringAgreements.length}</h2>
                </div>

                <div>
                    <h3>Expired</h3>
                    <h2>{expiredAgreements.length}</h2>
                </div>

                <div>
                    <h3>Total Warranties</h3>
                    <h2>{agreements.length}</h2>
                </div>

                <section>
                    <h2>My Agreements</h2>
                    {agreements.length === 0 ? (
                        <p>No agreements found.</p>
                    ) : (
                        <ul>
                            {agreements.map((agreement) => (
                                <li key={agreement._id}>
                                    <Link to={`/agreements/${agreement._id}`}>
                                        {agreement.type} - {agreement.description}- {agreement.status}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

            </section>
        </div>
    )
}

export default DashboardCostumer