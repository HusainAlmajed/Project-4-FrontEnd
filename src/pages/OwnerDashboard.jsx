import React, { useEffect } from "react"
import { Link } from "react-router" 
import { useState } from "react"

const OwnerDashboard = ({ agreements = [], user }) => {

    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

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

    const filteredAgreements = agreements.filter(
        (agreement) => {
            const customerPhone = agreement.customer?.phone || ""
            return customerPhone.toLowerCase().includes(search.toLowerCase())
        }
    )

    if (loading) {
        return <h2>Loading Dashboard...</h2>
    }

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
    <input
        type="text"
        placeholder="Search by customer phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    {agreements.length === 0 ? (
        <p>No agreements found.</p>
    ) : (
        <table>
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Customer Phone</th>
                    <th>Asset Type</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {filteredAgreements.map((agreement) => (
                    <tr key={agreement._id}>

                        <td>
                            {agreement.customer?.username || "Unknown"}
                        </td>

                        <td>
                            {agreement.customer?.phone}
                        </td>

                        <td>
                            {agreement.asset?.name}
                        </td>

                        <td>
                            {agreement.status}
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

