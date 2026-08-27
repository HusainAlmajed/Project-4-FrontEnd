const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/agreements`

const  getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

const create = async (agreementData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(agreementData)
        })
        if (!response.ok) {
            throw new Error('Failed to create agreement')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating agreement:', error)
        throw error
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

const getMyAgreements = async () => {
    try {
        const response = await fetch(`${BASE_URL}/my-agreements`, {
            method: 'GET',
            headers: getHeaders()
        })
        if (!response.ok) {
            throw new Error('Failed to fetch my agreements')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching my agreements:', error)
        throw error
    }
}

const show = async (agreementId) => {
    try {
        const response = await fetch(`${BASE_URL}/${agreementId}`, {
            method: 'GET',
            headers: getHeaders()
        })  
        if (!response.ok) {
            throw new Error('Failed to fetch agreement')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching agreement:', error)
        throw error
    }
}

const update = async (agreementId, updatedData) => {
    try {
        const response = await fetch(`${BASE_URL}/${agreementId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(updatedData)
        })
        if (!response.ok) {
            throw new Error('Failed to update agreement')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error updating agreement:', error)
        throw error
    }
}