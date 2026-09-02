import { useEffect, useState } from "react"
import * as adminServices from "../services/admin"
import * as businessServices from "../services/business"

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
        <div>

            <h1>Admin Dashboard</h1>

            {message && <p>{message}</p>}


            {/* ================= USERS ================= */}

            <h2>Users</h2>

            <table>

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
                                {user.username}
                            </td>

                            <td>
                                {user.email}
                            </td>

                            <td>
                                {user.phone}
                            </td>

                            <td>

                                <select
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


            {/* ================= BUSINESSES ================= */}

            <h2>Businesses</h2>

            <table>

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
                                {business.name}
                            </td>

                            <td>
                                {business.type}
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
    )
}

export default AdminDashboard