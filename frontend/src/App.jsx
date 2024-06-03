import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AutenProvider } from "./context/AutenContext";
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import IndicadorForm from "./pages/IndicatorFormPage";

export default function App() {
  return (
    <AutenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Página Principal en Construcción...</h1>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/create-indicator" element={<IndicadorForm/>}/>
        </Routes>
      </BrowserRouter>
    </AutenProvider>
  )
}