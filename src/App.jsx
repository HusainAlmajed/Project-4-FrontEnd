import Nav from "./components/Nav"
// import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"
// import SignInForm from "./pages/SignInForm"
// import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import AgreementForm from "./pages/AgreementForm"
import { useParams } from "react-router"
import * as agreementServices from './services/agreements'


const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const navigate = useNavigate()
  const {agreementId} = useParams()

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

  return (
    <div>
      <Nav />
      <h1>Welcome to the Blog App</h1>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agreement" element={<AgreementForm />} />
      </Routes>
    </div>
  )
}

export default App