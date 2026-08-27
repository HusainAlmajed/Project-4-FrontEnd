const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/agreements`

const  getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

const getAllAgreements = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: getHeaders()
        })
        if (!response.ok) {
            throw new Error('Failed to fetch agreements')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching agreements:', error)
        throw error
    }
}