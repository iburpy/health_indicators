import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">&copy; 2024 MetaSalud. Todos los derechos reservados a los más Programadores.</p>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://www.fb.me/cotecnova" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform duration-300 ease-in-out hover:scale-105">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.x.com/cotecnova" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform duration-300 ease-in-out hover:scale-105">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com/cotecnova" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform duration-300 ease-in-out hover:scale-105">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.co.linkedin.com/company/cotecnova---corporaci-n-de-estudios-tecnol-gicos-del-norte-del-valle" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform duration-300 ease-in-out hover:scale-105">
            <FaLinkedin size={24} />
          </a>
          <a href="https://www.youtube.com/@redescotecnova" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform duration-300 ease-in-out hover:scale-105">
            <FaYoutube size={24} />
          </a>
        </div>
        <div className="flex justify-center">
            <p className="text-sm">
                <a href="https://github.com/gJethro/health_indicators/blob/main" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition transform duration-300 ease-in-out hover:scale-105 flex items-center">
                    <FaGithub className="mr-1" />
                    Código fuente
                </a>
            </p>
        </div>
        </div>
    </footer>
    );
}

export default Footer;
