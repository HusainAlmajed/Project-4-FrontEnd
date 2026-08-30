const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const customerSignUp = async (formData) => {
    const response = await fetch(`${BASE_URL}/sign-up/customer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    const data = await response.json ()

    if (!response.ok) {
        throw new Error(data.err || "Somthing went wrong")
    }

    return data
}

const ownerSignUp = async (formData) => {
    const response = await fetch(`${BASE_URL}/sign-up/owner`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    const data = await response.json ()

    if (!response.ok) {
        throw new Error(data.err || "Somthing went wrong")
    }

    return data
}

const signIn = async (formData) => {
    const response = await fetch(`${BASE_URL}/sign-in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.err || "Something went wrong");
    }

    return data;
}

export {
    customerSignUp,
    ownerSignUp,
    signIn
}