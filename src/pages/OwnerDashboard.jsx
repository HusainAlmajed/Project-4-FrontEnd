import React, { useEffect } from "react"
import { Link } from "react-router"
import { useState } from "react"
import "../styles/ownerDashboard.css"

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
        <div className="owner-dashboard">

            {/* ================= HEADER ================= */}
            <header className="dashboard-header">
                <div className="dashboard-header-content">
                    <h1>Owner Dashboard</h1>
                    <h3>Welcome, {user.username}</h3>
                </div>
            </header>


            {/* ================= STATISTICS ================= */}
            <section className="dashboard-stats">

                <div className="stat-card">
                    <h3>Active Warranties</h3>
                    <h2>{activeAgreements.length}</h2>
                </div>

                <div className="stat-card">
                    <h3>Expiring Soon</h3>
                    <h2>{expiringAgreements.length}</h2>
                </div>

                <div className="stat-card">
                    <h3>Expired</h3>
                    <h2>{expiredAgreements.length}</h2>
                </div>

                <div className="stat-card">
                    <h3>Total Warranties</h3>
                    <h2>{agreements.length}</h2>
                </div>

                <div className="stat-card">
                    <h3>Total Customers</h3>
                    <h2>{uniqueCustomers.length}</h2>
                </div>

            </section>


            {/* ================= AGREEMENTS ================= */}
            <section className="agreements-section">

                <div className="agreements-header">
                    <div>
                        <p className="section-label">MANAGEMENT</p>
                        <h2>All Agreements</h2>
                    </div>

                    <input
                        className="agreement-search"
                        type="text"
                        placeholder="Search by customer phone"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>


                {agreements.length === 0 ? (

                    <div className="empty-state">
                        <p>No agreements found.</p>
                    </div>

                ) : (

                    <div className="table-container">

                        <table className="agreements-table">

                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Customer Phone</th>
                                    <th>Asset Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredAgreements.map((agreement) => (

                                    <tr key={agreement._id}>

                                        <td>
                                            <div className="customer-name">
                                                {agreement.customer?.username || "Unknown"}
                                            </div>
                                        </td>

                                        <td>
                                            {agreement.customer?.phone || "N/A"}
                                        </td>

                                        <td>
                                            {agreement.asset?.name || "N/A"}
                                        </td>

                                        <td>
                                            <span
                                                className={`status-badge status-${agreement.status?.toLowerCase()}`}
                                            >
                                                {agreement.status}
                                            </span>
                                        </td>

                                        <td>
                                            <Link
                                                className="view-agreement"
                                                to={`/agreements/${agreement._id}`}
                                            >
                                                View Agreement
                                            </Link>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

        </div>
    )
}


export default OwnerDashboard

