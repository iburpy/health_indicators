import { FaHeartbeat, FaBullseye } from 'react-icons/fa';
import FeatureCard from './FeatureCard';
import '../assets/fonts/fonts.css';

function FeaturesSection() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Qué puedes hacer con nosotros:</h2>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
                    <FeatureCard redirectTo="/create-indicator">
                        <>
                            <FaHeartbeat className="text-4xl text-indigo-600 mb-4 mx-auto" />
                            <h3 className="text-xl font-bold mb-4 text-center">Monitoreo de Salud</h3>
                            <p className="text-center">Registra y monitorea tus indicadores de salud con facilidad.</p>
                        </>
                    </FeatureCard>
                    <FeatureCard redirectTo="/create-objetives">
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
