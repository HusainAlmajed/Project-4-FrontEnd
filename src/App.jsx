import Nav from "./components/Nav"
import "./App.css"
import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"

import Dashboard from "./pages/Dashboard"
import AgreementForm from "./pages/AgreementForm"

import * as agreementServices from "./services/agreement.js"

const getUserFromToken = () => {
  const token = localStorage.getItem("token")

  if (!token) return null

  return JSON.parse(atob(token.split(".")[1])).payload
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

  return (
    <div>
      <Nav />

      <h1>Welcome to the Warranty App</h1>

      <Routes>
        <Route path="/dashboard"element={<Dashboard agreements={agreements} />}/>

        <Route path="/agreement" element={<AgreementForm handleAddAgreement={handleAddAgreement}/>} />
      </Routes>
    </div>
  )
}

export default App