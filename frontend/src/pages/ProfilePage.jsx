import { useEffect } from "react";
import { useAuten } from "../context/AutenContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../assets/fonts/fonts.css';

function Profiles() {
  const { user, isAuthenticated, profile } = useAuten();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      profile(); // Fetch the user profile data
    }
  }, [isAuthenticated, navigate, profile]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex bg-slate-200 min-h-screen items-center justify-center px-6 py-12 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Perfil de Usuario</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
            <p><strong>Correo electrónico:</strong> {user.email}</p>
            <p><strong>Número de documento:</strong> {user.num_doc}</p> {/* Mostrar el número de documento */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profiles;
