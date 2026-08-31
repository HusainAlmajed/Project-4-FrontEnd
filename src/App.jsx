import Nav from "./components/Nav"
import CustomerSignUpForm from "./pages/CustomerSignUp.jsx"
import OwnerSignUpForm from "./pages/OwnerSignUp.jsx"
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"
// import SignInForm from "./pages/SignInForm"
// import Landing from "./pages/Landing"
import DashboardCostumer from "./pages/DashboardCostumer.jsx"
import { useParams } from "react-router"
import AgreementForm from "./pages/AgreementForm"
import AgreementList from "./pages/AgreementList"
import AgreementDetails from "./pages/AgreementDetails"
import DocumentList from "./pages/DocumentList.jsx"
import DocumentForm from "./pages/DocumentForm.jsx"
import CustomerAgreement from "./pages/CostumerAgreement.jsx"


import * as agreementServices from "./services/agreement.js"
import SignInForm from "./pages/SignIn.jsx"
import UserProfile from "./pages/UserProfile.jsx"

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
    return newAgreement

    // navigate("/agreements-list")
  }

  const handleDeleteAgreement = async (agreementId) => {
    await agreementServices.deleteAgreement(agreementId)
    setAgreements(agreements.filter((agreement) => agreement._id !== agreementId))
    navigate("/agreements-list")
  }

  const handleUpdateAgreement = async (agreementId, formData) => {
    const updatedAgreement = await agreementServices.update(agreementId, formData)

    const updatedAgreements = agreements.map((agreement) =>{
      return agreement._id === agreementId ? updatedAgreement : agreement
  })

  setAgreements(updatedAgreements)
  navigate(`/agreements/${agreementId}`)
  }


  return (
    <div>
        <Nav user={user} setUser={setUser} />

      <Routes>

        <Route path="/" element={<h1>Welcome to the Warranty App</h1>} />


        <Route path="/sign-up/customer" element={<CustomerSignUpForm setUser={setUser}/>} />

        <Route path="/sign-up/owner" element={<OwnerSignUpForm setUser={setUser}/>} />

        <Route path="/sign-in" element={<SignInForm setUser={setUser}/>} />

        <Route path="/dashboard" element={<DashboardCostumer agreements={agreements} />} />

        <Route path="/agreements" element={<AgreementForm handleAddAgreement={handleAddAgreement} />} />

        <Route path="/agreements/:agreementId" element={<AgreementDetails user={user} handleEditAgreement={handleUpdateAgreement} handleDeleteAgreement={handleDeleteAgreement} />} />

        <Route path="/agreements-list" element={<AgreementList agreements={agreements} user={user} />} />

        <Route path="/agreements-customer" element={<CustomerAgreement agreements={agreements} user={user} />} />

        <Route path="/agreements/:agreementId/documents/new" element={<DocumentForm />} />

        <Route path="/agreements/:agreementId/documents/:documentId/edit" element={<DocumentForm />} />

        <Route path="/agreements/:agreementId/documents" element={<DocumentList />} />
        
        <Route path="/user-profile" element={<UserProfile user={user}  />} />

      </Routes>
    </div>
  )
}

export default App