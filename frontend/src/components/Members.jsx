import { FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';

function DeveloperInfo({ name, role, subTitle, description }) {
    
    return (
        <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <h4 className="text-xl font-bold italic">{role}</h4>
            <h6 className="italic">{subTitle}</h6>
            <p className="text-gray-700 mb-4 mt-3">{description}</p>
        </div>
    );
}

DeveloperInfo.propTypes = {
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

function GitHubLink({ href, children }) {
    return (
        <>
        <div className="flex items-center text-indigo-500 hover:text-indigo-700">
            <FaGithub className="mr-1" />
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        </div>
        </>
    );
}

GitHubLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

function Members() {

    
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Equipo de Desarrollo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-100 rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105 flex flex-col justify-between">
                        <DeveloperInfo
                            name="Alejandro Galvis Giraldo"
                            role="Desarrollador Principal"
                            subTitle="Lead Developer"
                            description="Diseñador de la Base de Datos, Backend y API del aplicativo. Contribuidor en Diseño."/>
                        <GitHubLink href="https://github.com/gJethro">
                            gJethro
                        </GitHubLink>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105 flex flex-col justify-between">
                        <DeveloperInfo
                            name="Julián Andrés Caracas Sánchez"
                            role="Desarrollador Frontend"
                            subTitle="Frontend Developer"
                            description="Diseñador principal del Frontend. Comunicación con la API."/>
                        <GitHubLink href="https://github.com/julianandrescaracas0623/">
                            julianandrescaracas0623
                        </GitHubLink>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-lg shadow-md transition transform duration-300 ease-in-out hover:scale-105 flex flex-col justify-between">
                        <DeveloperInfo
                            name="Santiago Méndez Montoya"
                            role="Diseñador"
                            subTitle="Designer"
                            description="Contribuidor en Diseño. Documentación."/>
                            <GitHubLink href="https://github.com/MendezSM">
                                MendezSM
                            </GitHubLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Members;