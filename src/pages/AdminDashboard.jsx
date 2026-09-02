import { useEffect, useState } from "react"
import * as adminServices from "../services/admin"

const AdminDashboard = () => {

    const [users, setUsers] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const data = await adminServices.getUsers()

                setUsers(data)

            } catch (error) {

                setMessage(error.message)

            }
        }

        fetchUsers()

    }, [])

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

    return (
        <div>

            <h1>Admin Dashboard</h1>

            {message && <p>{message}</p>}

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

        </div>
    )
}

export default AdminDashboard