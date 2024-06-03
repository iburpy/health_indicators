import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuten } from "../context/AutenContext";
import { Link, useNavigate } from "react-router-dom";
import '../assets/fonts/fonts.css'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, isAuthenticated, signin, signinErrors = [] } = useAuten();
  const navigate = useNavigate();

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
      navigate(`/profile/${user.num_doc}`);
    }
  }, [isAuthenticated, user, navigate]);


  return (
    <div className="flex bg-slate-200  min-h-screen items-center justify-center px-6 py-12 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
        </div>

        {signinErrors.length > 0 && signinErrors.map((error, i) => (
          <div key={i} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ))}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                {...register("email", { required: "Este campo es requerido" })}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Correo electrónico"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                {...register("password", { required: "Este campo es requerido" })}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Contraseña"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">¿No tienes cuenta?&nbsp;
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            ¡Crea una aquí!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
