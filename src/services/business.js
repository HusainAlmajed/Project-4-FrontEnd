const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL


const getBusinesses = async () => {

    const response = await fetch(
        `${BASE_URL}/admin/businesses`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.err ||
            data.message ||
            "Failed to fetch businesses"
        )
    }

    return data
}


const deleteBusiness = async (businessId) => {

    const response = await fetch(
        `${BASE_URL}/admin/businesses/${businessId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.err ||
            data.message ||
            "Failed to delete business"
        )
    }

    return data
}


export {
    getBusinesses,
    deleteBusiness
}