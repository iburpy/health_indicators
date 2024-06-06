import { useEffect, useState, useCallback } from 'react';
import { useAuten } from '../context/AutenContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/fonts/fonts.css';

function IndicatorsPage() {
    const { user, isAuthenticated, getIndicators, indicator } = useAuten();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const fetchIndicators = useCallback(async () => {
        setLoading(true);
        await getIndicators(user.num_doc);
        setLoading(false);
    }, [getIndicators, user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchIndicators();
    }
  }, [isAuthenticated, navigate, fetchIndicators]);

  

  if (!isAuthenticated) {
    return <div>Redirigiendo al login...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex bg-slate-200 min-h-screen items-center justify-center px-6 py-12 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Mis Indicadores</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {loading ? (
              <p>Cargando indicadores...</p>
            ) : indicator && indicator.length > 0 ? (
              <ul>
                {indicator.map((ind, index) => (
                  <li key={index} className="mb-4">
                    <p><strong>Nombre:</strong> {ind.nombre}</p>
                    <p><strong>Descripción:</strong> {ind.descripcion}</p>
                    <p><strong>Valor:</strong> {ind.valor}</p>
                    {/* Añade otros campos según sea necesario */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tienes indicadores disponibles.</p>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default IndicatorsPage;
