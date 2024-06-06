import { useState } from 'react';
import { FaSignInAlt, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuten } from '../context/AutenContext';

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

AuthPrompt.propTypes = { onClose: PropTypes.func.isRequired };

function FeatureCard({ children, redirectTo }) {
    const { isAuthenticated } = useAuten();
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const navigate = useNavigate();

    const handleFeatureClick = () => {
        if (isAuthenticated) {
            navigate(redirectTo);
        } else {
            setShowAuthPrompt(true);
        }
    };

    const handleCloseAuthPrompt = () => {
        setShowAuthPrompt(false);
    };

    return (
        <>
            {showAuthPrompt && <AuthPrompt onClose={handleCloseAuthPrompt} />}
            <div className="p-6 bg-white rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105" onClick={handleFeatureClick}>
                {children}
            </div>
        </>
    );
}

FeatureCard.propTypes = {
    children: PropTypes.node.isRequired,
    redirectTo: PropTypes.string.isRequired,
};

export default FeatureCard;