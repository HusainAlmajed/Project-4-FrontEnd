import { useEffect, useState } from "react"
import * as adminServices from "../services/admin"
import * as businessServices from "../services/business"
import "../styles/admin.css"

const AdminDashboard = () => {

    const [users, setUsers] = useState([])
    const [businesses, setBusinesses] = useState([])
    const [message, setMessage] = useState("")


    // Fetch users and businesses
    useEffect(() => {

        const fetchData = async () => {

            try {

                const usersData = await adminServices.getUsers()
                setUsers(usersData)

                const businessesData = await businessServices.getBusinesses()
                setBusinesses(businessesData)

            } catch (error) {

                setMessage(error.message)

            }
        }

        fetchData()

    }, [])


    // Change user role
    const handleRoleChange = async (userId, role) => {

        try {

            const updatedUser =
                await adminServices.updateUserRole(userId, role)

            setUsers(
                users.map((user) =>
                    user._id === userId
                        ? updatedUser
                        : user
                )
            )

        } catch (error) {

            setMessage(error.message)

        }
    }


    // Delete user
    const handleDelete = async (userId) => {

        try {

            await adminServices.deleteUser(userId)

            setUsers(
                users.filter((user) => user._id !== userId)
            )

        } catch (error) {

            setMessage(error.message)

        }
    }


    // Delete business
    const handleDeleteBusiness = async (businessId) => {

        try {

            await businessServices.deleteBusiness(businessId)

            setBusinesses(
                businesses.filter(
                    (business) => business._id !== businessId
                )
            )

        } catch (error) {

            setMessage(error.message)

        }
    }


    return (
    <div className="admin-dashboard">

        <div className="admin-header">
            <div>
                <h1>Admin Dashboard</h1>
                <p>Manage users and businesses</p>
            </div>
        </div>

        {message && (
            <div className="admin-message">
                {message}
            </div>
        )}

        {/* ================= USERS ================= */}

        <section className="admin-section">

            <div className="section-header">
                <div>
                    <h2>Users</h2>
                    <p>Manage registered users and their roles</p>
                </div>

                <div className="section-count">
                    {users.length} Users
                </div>
            </div>

            <div className="table-container">

                <table className="admin-table">

                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user._id}>

                                <td>
                                    <div className="user-name">
                                        {user.username}
                                    </div>
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    {user.phone}
                                </td>

                                <td>

                                    <select
                                        className="role-select"
                                        value={user.role}
                                        onChange={(event) =>
                                            handleRoleChange(
                                                user._id,
                                                event.target.value
                                            )
                                        }
                                    >

                                        <option value="customer">
                                            Customer
                                        </option>

                                        <option value="owner">
                                            Owner
                                        </option>

                                        <option value="admin">
                                            Admin
                                        </option>

                                    </select>

                                </td>

                                <td>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(user._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </section>


        {/* ================= BUSINESSES ================= */}

        <section className="admin-section">

            <div className="section-header">

                <div>
                    <h2>Businesses</h2>
                    <p>Manage registered businesses and owners</p>
                </div>

                <div className="section-count">
                    {businesses.length} Businesses
                </div>

            </div>

            <div className="table-container">

                <table className="admin-table">

                    <thead>

                        <tr>
                            <th>Business Name</th>
                            <th>Type</th>
                            <th>Owner</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {businesses.map((business) => (

                            <tr key={business._id}>

                                <td>
                                    <div className="business-name">
                                        {business.name}
                                    </div>
                                </td>

                                <td>
                                    <span className="business-type">
                                        {business.type}
                                    </span>
                                </td>

                                <td>
                                    {business.owner?.username}
                                </td>

                                <td>
                                    {business.owner?.email}
                                </td>

                                <td>
                                    {business.owner?.phone}
                                </td>

                                <td>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDeleteBusiness(
                                                business._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </section>

    </div>
)
}

export default AdminDashboard