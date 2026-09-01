import React, { useEffect } from "react"
import { Link } from "react-router" 
import { useState } from "react"

const OwnerDashboard = ({ agreements = [], user }) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (agreements.length > 0) {
            setLoading(false)
        }
    }, [agreements])

    const uniqueCustomers = [...new Set
        (agreements.map((agreement) => agreement.customer?._id).filter(Boolean))]

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
                    <h1>Owner Dashboard</h1>
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
                <div>
                    <h3>Total Customers</h3>
                    <h2>{uniqueCustomers.length}</h2>
                </div>

                <section>
    <h2>All Agreements</h2>

    {agreements.length === 0 ? (
        <p>No agreements found.</p>
    ) : (
        <table>
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Customer Phone</th>
                </tr>
            </thead>

            <tbody>
                {agreements.map((agreement) => (
                    <tr key={agreement._id}>

                        <td>
                            {agreement.customer?.username || "Unknown"}
                        </td>

                        <td>
                            {agreement.status}
                        </td>

                        <td>
                            {agreement.customer.phone }
                        </td>

                        <td>
                            <Link to={`/agreements/${agreement._id}`}>
                                View Agreement
                            </Link>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    )}
</section>

            </section>
        </div>
    )
}


export default OwnerDashboard

