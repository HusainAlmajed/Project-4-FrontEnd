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

const index = async () => {
    try {
        const res = await fetch(BASE_URL , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const show = async (inspectionData) => {
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

export {
    create,
    index,
    show,
}