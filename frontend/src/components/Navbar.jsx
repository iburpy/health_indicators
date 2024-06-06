import { Link } from "react-router-dom";
import { useAuten } from "../context/AutenContext";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faChartLine, faBullseye, faSignOutAlt, faSignInAlt, faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const { user, isAuthenticated, signout } = useAuten();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log(user);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800 text-white py-6 p-4">
      <ul className="flex justify-between items-center">
        <li>
          <Link to="/" className="text-white">
            <FontAwesomeIcon icon={faHome} /> {/* Icon for Home */}
          </Link>
        </li>
        <div className="flex space-x-4 items-center">
          {isAuthenticated && user && (
            <>
              <li>
                <Link to={`/profile/${user.numDoc}`} className="text-white">
                  <FontAwesomeIcon icon={faUser} /> {/* Icon for Profile */}
                </Link>
              </li>
              <li className="relative">
                <button onClick={toggleDropdown} className="text-white">
                  <FontAwesomeIcon icon={faPlus} /> {/* Icon for Add */}
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-20">
                    <li>
                      <Link to="/create-indicator" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                        Crear Indicador
                      </Link>
                    </li>
                    <li>
                      <Link to="/create-objetives" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <FontAwesomeIcon icon={faBullseye} className="mr-2" />
                        Crear Objetivo
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
          {!isAuthenticated && !user && (
            <>
              <li>
                <Link to="/login" className="text-white">
                  <FontAwesomeIcon icon={faSignInAlt} /> {/* Icon for Sign In */}
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white">
                  <FontAwesomeIcon icon={faUserPlus} /> {/* Icon for Register */}
                </Link>
              </li>
            </>
          )}
        </div>
        {isAuthenticated && user && (
          <li>
            <button onClick={signout} className="text-white">
              <FontAwesomeIcon icon={faSignOutAlt} /> {/* Icon for Sign Out */}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;