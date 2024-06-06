import { Link } from 'react-router-dom';
import { useAuten } from "../context/AutenContext";

function HomeHeader() {
    const { user, isAuthenticated } = useAuten();
    console.log("User:", user);

    return (
        <header className="w-cover h-2/3-screen bg-white">
            <div className="bg-slate-500 bg-opacity-50 h-full flex items-center">
                <div className="container p-5 rounded-lg mx-auto px-4 text-center flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Bienvenido a MetaSalud</h1>
                    <p className="mt-4 text-base md:text-lg text-gray-100">Tu plataforma para registrar y monitorear tus indicadores de salud</p>
                    {isAuthenticated ? (
                        <Link to={`/profile/${user.found.doc}`} className="rounded-lg inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 transition transform duration-300 ease-in-out hover:scale-105">
                            Volver al perfil
                        </Link>
                    ) : (
                        <div className="flex mt-6 space-x-4">
                            <Link to="/register" className="rounded-lg inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 transition transform duration-300 ease-in-out hover:scale-105">
                                Regístrate
                            </Link>
                            <Link to="/login" className="rounded-lg inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 transition transform duration-300 ease-in-out hover:scale-105">
                                Iniciar sesión
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default HomeHeader;