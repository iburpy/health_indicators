import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AutenProvider } from "./context/AutenContext";
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (

  <AutenProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Pagina Principal</h1>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  </AutenProvider>
    
  )
}