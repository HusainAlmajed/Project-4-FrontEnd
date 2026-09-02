const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const getUsers = async () => {

    const response = await fetch(`${BASE_URL}/admin/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.err || data.message || "Failed to fetch users")
    }

    return data
}

const updateUserRole = async (userId, role) => {

    const response = await fetch(`${BASE_URL}/admin/users/${userId}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },

        body: JSON.stringify({
            role: role
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.err || data.message || "Failed to update user")
    }

    return data
}

const deleteUser = async (userId) => {

    const response = await fetch(`${BASE_URL}/admin/users/${userId}`, {
        method: "DELETE",

        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.err || data.message || "Failed to delete user")
    }

    return data
}

export {
    getUsers,
    updateUserRole,
    deleteUser
}