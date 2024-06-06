import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuten } from "../context/AutenContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import '../assets/fonts/fonts.css'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, isAuthenticated, signin, signinErrors = [] } = useAuten();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => { document.title = "Inicio de sesión" }, []);

  const onSubmit = async (data) => {
    try {
      await signin(data);
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/profile/${user.numDoc}`);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
    <Navbar/>
      <div className="flex bg-white min-h-screen items-center justify-center px-6 py-12 lg:px-8">
        <div className="bg-slate-200 shadow-xl rounded-lg max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
          </div>

          {signinErrors.length > 0 && signinErrors.map((error, i) => (
            <div key={i} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ))}

         <form onSubmit={handleSubmit(onSubmit)} className=" mt-8 space-y-6 p-4 rounded-lg">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4 flex items-center">
              <label htmlFor="email" className="block p-2 text-sm font-bold text-gray-700 mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 p-1 text-lg" />
              </label>
              <input
                type="email"
                {...register("email", { required: "Este campo es requerido" })}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}

            <div className="mb-4 flex items-center">
              <label htmlFor="password" className="block p-2 text-sm font-bold text-gray-700 mb-2">
                <FontAwesomeIcon icon={faLock} className="mr-2 p-1 text-lg" />
              </label>
              <input
                type="password"
                {...register("password", { required: "Este campo es requerido" })}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Contraseña. Mínimo 6 caracteres"
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <div className="flex justify-center align-center">
            <button
              type="submit"
              className="flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Iniciar sesión
            </button>
          </div>
        </form>

          <p className="mt-2 p-4 text-center text-sm text-gray-600">¿No tienes cuenta?&nbsp;
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Créate una aquí
            </Link>
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default LoginPage;
