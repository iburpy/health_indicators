import { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, subject, message } = formData;
        const mailtoLink = `mailto:metas.salud.contacto@gmail.com?subject=${encodeURIComponent(subject)}&body=Remitente: ${encodeURIComponent(name)}%0D%0ACorreo de remitente: ${encodeURIComponent(email)}%0D%0A${encodeURIComponent(message)}`;
        window.open(mailtoLink, '_blank', 'noopener noreferrer');
    };

    return (
        <>
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contáctanos</h2>
                    <div className="max-w-lg mx-auto">
                    <p className="text-center text-gray-600 mb-4">
                        Por favor, déjanos tu nombre, correo electrónico, asunto y tu mensaje. Estaremos encantados de ayudarte.
                    </p>
                        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Nombre</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-lg"
                                    type="text"
                                    id="name"
                                    placeholder="Tu nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="subject">Asunto</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-lg"
                                    type="text"
                                    id="subject"
                                    placeholder="Asunto"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Correo Electrónico</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-lg"
                                    type="email"
                                    id="email"
                                    placeholder="Tu correo electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="message">Mensaje</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-lg"
                                    id="message"
                                    rows="4"
                                    placeholder="Tu mensaje"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded transition transform duration-300 ease-in-out hover:scale-105"
                                    type="submit"
                                >
                                    Enviar mensaje
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;
