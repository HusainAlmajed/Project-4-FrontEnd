import Nav from "./components/Nav"
import CustomerSignUpForm from "./pages/CustomerSignUp.jsx"
import OwnerSignUpForm from "./pages/OwnerSignUp.jsx"
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"
// import SignInForm from "./pages/SignInForm"
// import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import { useParams } from "react-router"
import AgreementForm from "./pages/AgreementForm"
import AgreementList from "./pages/AgreementList"
import AgreementDetails from "./pages/AgreementDetails"

import * as agreementServices from "./services/agreement.js"
import SignInForm from "./pages/SignIn.jsx"

const getUserFromToken = () => {
  const token = localStorage.getItem("token")

  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.payload
  } catch (error) {
    localStorage.removeItem("token")
    return null
  }
}

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())
  const [agreements, setAgreements] = useState([])

  useEffect(() => {
    const fetchAgreements = async () => {
      const agreementsData = await agreementServices.index()
      setAgreements(agreementsData)
    }

    if (user) {
      fetchAgreements()
    }
  }, [user])

  const handleAddAgreement = async (agreementData) => {
    const newAgreement = await agreementServices.create(agreementData)

    setAgreements([newAgreement, ...agreements])

    navigate("/dashboard")
  }

  const handleDeleteAgreement = async (agreementId) => {
    await agreementServices.deleteAgreement(agreementId)
    setAgreements(agreements.filter((agreement) => agreement._id !== agreementId))
    navigate("/dashboard")
  }

  const handleUpdateAgreement = async (agreementId, formData) => {
    const updatedAgreement = await agreementServices.update(agreementId, formData)

    const updatedAgreements = agreements.map((agreement) =>{
      return agreement._id === agreementId ? updatedAgreement : agreement
  })

  setAgreements(updatedAgreements)
  navigate("/dashboard")
  }


  return (
    <div>
      <Routes>

        <Route path="/" element={<h1>Welcome to the Warranty App</h1>} />

        <Nav user={user} setUser={setUser} />

        <Route path="/sign-up/customer" element={<CustomerSignUpForm />} />

        <Route path="/sign-up/owner" element={<OwnerSignUpForm />} />

        <Route path="/sign-in" element={<SignInForm setUser={setUser}/>} />

        <Route path="/dashboard" element={<Dashboard agreements={agreements} />} />

        <Route path="/agreements" element={<AgreementForm handleAddAgreement={handleAddAgreement}/>} />

        <Route path="/agreements/:agreementId" element={<AgreementDetails />} />

        <Route path="/agreements-list" element={<AgreementList agreements={agreements}/>} />
      </Routes>
    </div>
  )
}

export default App