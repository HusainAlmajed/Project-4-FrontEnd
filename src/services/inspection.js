const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/inspections`

const create = async (inspectionData) => {
    try {
        const res = await fetch (BASE_URL , {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json',
      },
      body: JSON.stringify(inspectionData),
        })

        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const index = async (agreementId) => {
    try {
        const res = await fetch(`${BASE_URL}?agreement=${agreementId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const show = async (inspectionId) => {
    try {
        const res = await fetch (`${BASE_URL}/${inspectionId}` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
        
    return res.json()
    } catch (error) {
        console.log(error)
    }
}

const update = async (inspectionId , inspectionData) => {
    try {
        const res = await fetch(`${BASE_URL}/${inspectionId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json',
      },
      body: JSON.stringify(inspectionData)
    })

    const data = await res.json()
    return data
    } catch (error) {
        console.log(error)
    }
}

const deleteInspection = async (inspectionId) => {

    if(confirm("Are you sure you want to delete this inspection? This action cannot be undone.")) {

    try {
        const res = await fetch(`${BASE_URL}/${inspectionId}`, {
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
    deleteInspection,
}