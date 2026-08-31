const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/agreements`

const getHeaders = () => {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }
}

const index = async () => {
    try {
        const response = await fetch(BASE_URL, {
            headers: getHeaders(),
        })

        if (!response.ok) {
            throw new Error("Failed to fetch agreements")
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching agreements:", error)
        throw error
    }
}

const create = async (agreementData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(agreementData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error("Backend error:", errorData)

            throw new Error(errorData.message || "Failed to create agreement")
        }

        return await response.json()
    } catch (error) {
        console.error("Error creating agreement:", error)
        throw error
    }
}

const show = async (agreementId) => {
    try {
        const response = await fetch(`${BASE_URL}/${agreementId}`, {
            headers: getHeaders(),
        })

        if (!response.ok) {
            throw new Error("Failed to fetch agreement")
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching agreement:", error)
        throw error
    }
}

const update = async (agreementId, agreementData) => {
    try {
        const response = await fetch(`${BASE_URL}/${agreementId}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(agreementData),
        })

        if (!response.ok) {
            throw new Error("Failed to update agreement")
        }

        return await response.json()
    } catch (error) {
        console.error("Error updating agreement:", error)
        throw error
    }
}

const deleteAgreement = async (agreementId) => {
    try {
        const response = await fetch(`${BASE_URL}/${agreementId}`, {
            method: "DELETE",
            headers: getHeaders(),
        })

        if (!response.ok) {
            throw new Error("Failed to delete agreement")
        }

        return await response.json()
    } catch (error) {
        console.error("Error deleting agreement:", error)
        throw error
    }
}



export {
    index,
    create,
    show,
    update,
    deleteAgreement,
}

