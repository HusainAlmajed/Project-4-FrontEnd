import React from "react"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import "../styles/customerDashboard.css"

const DashboardCostumer = ({ agreements = [], user }) => {

    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        if (agreements.length > 0) {
            setLoading(false)
        }
    }, [agreements])

    const activeAgreements = agreements.filter(
        (agreement) => agreement.status === "active"
    )

    const expiringAgreements = agreements.filter(
        (agreement) => agreement.status === "expiring soon"
    )

    const expiredAgreements = agreements.filter(
        (agreement) => agreement.status === "expired"
    )

    if (loading) {
        return <h2>Loading Dashboard...</h2>
    }
    return (
        <div className="customer-dashboard">

            {/* ================= HEADER ================= */}

            <header className="dashboard-header">

                <div>
                    <p className="dashboard-label">
                        CUSTOMER DASHBOARD
                    </p>

                    <h1>Welcome, {user.username}</h1>

                    <p className="dashboard-subtitle">
                        Keep track of your warranties and agreements.
                    </p>
                </div>

            </header>


            {/* ================= STATISTICS ================= */}

            <section className="dashboard-stats">

                <div className="stat-card">
                    <div className="stat-card-content">
                        <h3>Active Warranties</h3>
                        <h2>{activeAgreements.length}</h2>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-card-content">
                        <h3>Expiring Soon</h3>
                        <h2>{expiringAgreements.length}</h2>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-card-content">
                        <h3>Expired</h3>
                        <h2>{expiredAgreements.length}</h2>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-card-content">
                        <h3>Total Warranties</h3>
                        <h2>{agreements.length}</h2>
                    </div>
                </div>

            </section>


            {/* ================= AGREEMENTS ================= */}

            <section className="agreements-section">

                <div className="section-header">

                    <div>
                        <h2>My Agreements</h2>

                        <p>
                            View and manage your agreements.
                        </p>
                    </div>

                </div>


                {agreements.length === 0 ? (

                    <div className="empty-agreements">

                        <h3>No agreements found</h3>

                        <p>
                            You don't have any agreements yet.
                        </p>

                    </div>

                ) : (

                    <div className="agreements-list">

                        {agreements.map((agreement) => (

                            <Link
                                key={agreement._id}
                                to={`/agreements/${agreement._id}`}
                                className="agreement-card"
                            >

                                <div className="agreement-info">

                                    <h3>
                                        {agreement.type}
                                    </h3>

                                    <p>
                                        {agreement.description}
                                    </p>

                                </div>


                                <div className="agreement-status">

                                    <span
                                        className={`status ${agreement.status?.toLowerCase()}`}
                                    >
                                        {agreement.status}
                                    </span>

                                    <span className="agreement-arrow">
                                        →
                                    </span>

                                </div>

                            </Link>

                        ))}

                    </div>

                )}

            </section>

        </div>
    )
}

export default DashboardCostumer