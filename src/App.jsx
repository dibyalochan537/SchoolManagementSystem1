import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginSignUpPage from './Pages/auth/LoginSignUp.jsx'
import AdminHomePage from './Pages/admin/AdminHomePage.jsx'
import { ThemeProvider } from 'react-bootstrap';
import HrHomePage from "./Pages/hr/HrHomePage.jsx";
import ParentHomePage from "./Pages/parent/ParentHomePage.jsx";
import StaffHomePage from "./Pages/staff/StaffHomePage.jsx"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignUpPage />}/>
        <Route path="/admin" element={<AdminHomePage />}/>
        <Route path="/hr" element={<HrHomePage />}/>
        <Route path="/parent" element={<ParentHomePage />}/>
        <Route path="/staff" element={<StaffHomePage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
