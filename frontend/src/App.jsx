import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AutenProvider } from "./context/AutenContext";
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import IndicatorForm from "./pages/IndicatorFormPage";
import IndicatorsPage from "./pages/IndicatorsPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import CreateObjetives from "./pages/CreateObjetives";
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
              <Route path="/create-indicator" element={<IndicatorForm/>}/>
              <Route path="/profile/:num_doc" element={<ProfilePage/>}/>
              <Route path="/create-objetives" element={<CreateObjetives/>}/>
              <Route path="/indicators" element={<IndicatorsPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AutenProvider>
  )
}