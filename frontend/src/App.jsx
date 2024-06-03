import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AutenProvider } from "./context/AutenContext";
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import IndicatorForm from "./pages/IndicatorFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <AutenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route element={<ProtectedRoute/>}>
              <Route path="/create-indicator" element={<IndicatorForm/>}></Route>
              <Route path="/profile/:num_doc" element={<ProfilePage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AutenProvider>
  )
}