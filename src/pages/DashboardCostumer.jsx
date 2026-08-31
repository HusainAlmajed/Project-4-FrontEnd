import React from "react"
import { Link } from "react-router"

const DashboardCostumer = ({ agreements = [] }) => {

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
            <h1>Customer Dashboard</h1>
        </div>
    )
}

export default DashboardCostumer
