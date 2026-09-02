const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/documents`

const create = async (documentData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(documentData),
        })

        const data = await res.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

const index = async (agreementId) => {
    try {
       const res = await fetch(
            `${BASE_URL}?agreement=${agreementId}`,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        return res.json()
    } catch(error) {
        console.log(error)
    }
}

const show = async (documentId) => {
    try {
    const res = await fetch(`${BASE_URL}/${documentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const update = async (documentId , documentData) => {
    try {
        const res = await fetch (`${BASE_URL}/${documentId}` , {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(documentData),
        })

        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const deleteDocument = async (documentId) => {

    if(confirm("Are you sure you want to delete this document? This action cannot be undone.")) {

    try {
        const res = await fetch (`${BASE_URL}/${documentId}` , { 
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
}

export {
    create,
    index,
    show,
    update,
    deleteDocument,
}