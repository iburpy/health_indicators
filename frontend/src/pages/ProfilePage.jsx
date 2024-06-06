import { useEffect } from "react";
import { useAuten } from "../context/AutenContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUser, faEnvelope, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';

import '../assets/fonts/fonts.css';

function Profiles() {
  const { user, isAuthenticated, profile } = useAuten();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      profile();
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
              <p className="text-gray-700 text-lg font-semibold mb-2 flex items-center">
                <FontAwesomeIcon icon={faIdCard} className="text-indigo-500 mr-2" />
                <strong className="text-indigo-500"><br/></strong>
                <span className="text-gray-700 ml-2">{user.numDoc}</span>
              </p>
              <p className="text-gray-700 text-lg font-semibold mb-2 flex items-center">
                <FontAwesomeIcon icon={faUser} className="text-indigo-500 mr-2" />
                <strong className="text-indigo-500"><br/></strong>
                <span className="text-gray-700 ml-2">{user.name}</span>
              </p>
              <p className="text-gray-700 text-lg font-semibold mb-2 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-indigo-500 mr-2" />
                <strong className="text-indigo-500"><br/></strong>
                <span className="text-gray-700 ml-2">{user.email}</span>
              </p>
              <p className="text-gray-700 text-lg font-semibold mb-2 flex items-center">
                <FontAwesomeIcon icon={faBirthdayCake} className="text-indigo-500 mr-2" />
                <strong className="text-indigo-500"><br/></strong>
                <span className="text-gray-700 ml-2">{user.birthdate}</span>
              </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Profiles;