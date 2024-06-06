import { useState } from 'react';
import { FaHeartbeat, FaChartLine, FaBullseye, FaSignInAlt, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthPrompt({ onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg relative" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg p-3 font-bold mb-4">Debes iniciar sesión para realizar esta acción.</h2>
                <Link to="/login" className="text-indigo-600 hover:underline flex items-center mb-4">
                    <FaSignInAlt className="mr-2" /> Iniciar sesión
                </Link>
                <button className="absolute top-2 right-2 z-10 text-red-500 hover:text-red-700" onClick={onClose}>
                    <FaTimes />
                </button>
            </div>
        </div>
    );
}

// Add props validation for AuthPrompt component
AuthPrompt.propTypes = { onClose: PropTypes.func.isRequired };

function FeatureCard({ children }) {
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const handleFeatureClick = () => { setShowAuthPrompt(true) };

    const handleCloseAuthPrompt = () => { setShowAuthPrompt(false) };

    return (
        <>
            {showAuthPrompt && <AuthPrompt onClose={handleCloseAuthPrompt} />}
            <div className="p-6 bg-white rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105" onClick={handleFeatureClick}>
                {children}
            </div>
        </>
    );
}

// Add props validation for FeatureCard component
FeatureCard.propTypes = { children: PropTypes.node.isRequired };

function FeaturesSection() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Qué puedes hacer con nosotros:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard>
                        <>
                            <FaHeartbeat className="text-4xl text-indigo-600 mb-4 mx-auto" />
                            <h3 className="text-xl font-bold mb-4 text-center">Monitoreo de Salud</h3>
                            <p className="text-center">Registra y monitorea tus indicadores de salud con facilidad.</p>
                        </>
                    </FeatureCard>
                    <FeatureCard>
                        <>
                            <FaChartLine className="text-4xl text-indigo-600 mb-4 mx-auto" />
                            <h3 className="text-xl font-bold mb-4 text-center">Análisis de Datos</h3>
                            <p className="text-center">Obtén análisis detallados sobre tu estado de salud.</p>
                        </>
                    </FeatureCard>
                    <FeatureCard>
                        <>
                            <FaBullseye className="text-4xl text-indigo-600 mb-4 mx-auto" />
                            <h3 className="text-xl font-bold mb-4 text-center">Objetivos Personalizados</h3>
                            <p className="text-center">Establece y alcanza tus objetivos de salud personalizados.</p>
                        </>
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
