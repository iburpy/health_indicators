// src/pages/HomePage.js
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaHeartbeat, FaChartLine, FaBullseye, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function HomePage() {
    return (
        <>
            <Navbar />
            <header className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(assets/imagenes/bg.jpg'})` }}>
                <div className="bg-black bg-opacity-50 h-full flex items-center">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold text-white">Bienvenido a MetaSalud</h1>
                        <p className="mt-4 text-lg text-gray-200">Tu plataforma para registrar y monitorear tus indicadores de salud</p>
                        <Link to="/register" className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded transition transform duration-300 ease-in-out hover:scale-105">
                            Comienza Ahora
                        </Link>
                    </div>
                </div>
            </header>
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Características Principales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105">
                            <FaHeartbeat className="text-4xl text-indigo-600 mb-4 mx-auto" />
                            <h3 className="text-xl font-bold mb-4 text-center">Monitoreo de Salud</h3>
                            <p className="text-center">Registra y monitorea tus indicadores de salud con facilidad.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105">
                            <FaChartLine className="text-4xl text-indigo-600 mb-4 mx-auto" />
                            <h3 className="text-xl font-bold mb-4 text-center">Análisis de Datos</h3>
                            <p className="text-center">Obtén análisis detallados sobre tu estado de salud.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105">
                            <FaBullseye className="text-4xl text-indigo-600 mb-4 mx-auto" />
                            <h3 className="text-xl font-bold mb-4 text-center">Objetivos Personalizados</h3>
                            <p className="text-center">Establece y alcanza tus objetivos de salud personalizados.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Testimonios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105">
                            <p className="text-gray-700 mb-4">&quot;MetaSalud ha cambiado mi vida. Ahora puedo monitorear mi salud de manera efectiva y alcanzar mis objetivos de bienestar.&quot;</p>
                            <h4 className="text-xl font-bold">Juan Pérez</h4>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105">
                            <p className="text-gray-700 mb-4">&quot;La plataforma es increíblemente fácil de usar y me ha ayudado a mantener un seguimiento constante de mis indicadores de salud.&quot;</p>
                            <h4 className="text-xl font-bold">María Rodríguez</h4>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105">
                            <p className="text-gray-700 mb-4">&quot;Gracias a MetaSalud, he podido establecer y alcanzar mis objetivos de salud. ¡La recomiendo a todos!&quot;</p>
                            <h4 className="text-xl font-bold">Carlos García</h4>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contáctanos</h2>
                    <div className="max-w-lg mx-auto">
                        <form className="bg-white p-6 rounded-lg shadow-md">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Nombre</label>
                                <input className="w-full px-3 py-2 border rounded-lg" type="text" id="name" placeholder="Tu nombre" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Correo Electrónico</label>
                                <input className="w-full px-3 py-2 border rounded-lg" type="email" id="email" placeholder="Tu correo electrónico" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="message">Mensaje</label>
                                <textarea className="w-full px-3 py-2 border rounded-lg" id="message" rows="4" placeholder="Tu mensaje"></textarea>
                            </div>
                            <div className="text-center">
                                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded transition transform duration-300 ease-in-out hover:scale-105" type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 MetaSalud. Todos los derechos reservados a los mas Programadores.</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <Link to="#" className="text-gray-400 hover:text-white transition transform duration-300 ease-in-out hover:scale-105"><FaFacebook size={24} /></Link>
                        <Link to="#" className="text-gray-400 hover:text-white transition transform duration-300 ease-in-out hover:scale-105"><FaTwitter size={24} /></Link>
                        <Link to="#" className="text-gray-400 hover:text-white transition transform duration-300 ease-in-out hover:scale-105"><FaInstagram size={24} /></Link>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default HomePage;
