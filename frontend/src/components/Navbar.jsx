// Navbar.jsx
import { Link } from "react-router-dom";
import { useAuten } from "../context/AutenContext";

function Navbar() {
  const { user, isAuthenticated, signout } = useAuten();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">Inicio</Link>
        </li>
        {isAuthenticated && user && (
          <>
            <li>
              <Link to={`/profile/${user.numDoc}`} className="text-white">Perfil</Link>
            </li>
            <li>
              <Link to="/create-indicator" className="text-white">Crear Indicador</Link>
            </li>
            <li>
              <Link to="/create-objetives" className="text-white">Crear Objetivo</Link>
            </li>
            <li>
              <button onClick={signout} className="text-white">Cerrar Sesión</button>
            </li>
          </>
        )}
        {!isAuthenticated && !user && (
          <>
            <li>
              <Link to="/login" className="text-white">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/register" className="text-white">Registrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;