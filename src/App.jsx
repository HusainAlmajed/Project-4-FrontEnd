import Nav from "./components/Nav"
import CustomerSignUpForm from "./components/CustomerSignUp"
import OwnerSignUpForm from "./components/OwnerSignUp"
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"
// import SignInForm from "./pages/SignInForm"
// import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import { useParams } from "react-router"


const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())

  return (
    <div>
      <Nav />
      <Dashboard />
      {/* <h1>Welcome to the Blog App</h1> */}
      <Routes>
        <Route path="/sign-up/customer" element={<CustomerSignUpForm />}/>

        <Route path="/sign-up/owner" element={<OwnerSignUpForm />}/>

        {/* <Route path="/sign-in" element={<SignInForm />}/> */}
      </Routes>
    </div>
  )
}

export default App