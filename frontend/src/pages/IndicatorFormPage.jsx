import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuten } from "../context/AutenContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import '../assets/fonts/fonts.css';

function IndicadorForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const navigate = useNavigate();
    const { user, isAuthenticated, submitErrors = [], getAllIndicators } = useAuten();

    useEffect(() => { document.title = "Registro de Indicadores"; }, []);

    const onSubmit = async (data) => {
        const indicadorData = {
            ...data,
            fecha_hora_registro: new Date(),
            usuarios_num_doc: user?.numDoc, 
        };
        await getAllIndicators(indicadorData);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Navbar />
            <div className="flex bg-slate-200 min-h-screen items-center justify-center px-6 py-12 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrar Indicador</h2>
                    </div>

                    {submitErrors.length > 0 && submitErrors.map((error, i) => (
                        <div key={i} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">¡Algo ha ocurrido!</strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    ))}
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">  
                                <label htmlFor="tipo_indicador_id" className="block text-sm font-bold text-gray-700 mb-2">
                                    Indicador
                                </label>
                                <select
                                    defaultValue=""
                                    {...register("tipo_indicador_id", { required: true, valueAsNumber: true })}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Selecciona un indicador...</option>
                                    <option value={1}>Altura</option>
                                    <option value={2}>Peso Corporal</option>
                                    <option value={3}>Presión Arterial</option>
                                    <option value={4}>Glucosa en Sangre</option>
                                    <option value={5}>Frecuencia Cardiaca</option>
                                    <option value={6}>Temperatura Corporal</option>
                                    <option value={8}>Oxígeno en Sangre</option>
                                    <option value={9}>Consumo de Agua</option>
                                    <option value={10}>Horas de Sueño</option>
                                    <option value={11}>Pasos Diarios</option>
                                    <option value={12}>Nivel Actividad Física</option>
                                    <option value={14}>Capacidad cardiovascular</option>
                                    <option value={15}>Fuerza muscular</option>
                                    <option value={17}>Medida de Cintura</option>
                                    <option value={18}>Medida de Cadera</option>
                                </select>
                                {errors.tipo_indicador_id && (
                                    <span className="text-red-500 text-sm">{errors.tipo_indicador_id.message}</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="valor_indicador" className="block text-sm font-bold text-gray-700 mb-2">
                                    Valor del Indicador
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register("valor_indicador", { required: true })}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Valor del Indicador"
                                />
                                {errors.valor_indicador && (
                                    <span className="text-red-500 text-sm">{errors.valor_indicador.message}</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="notas_adicionales" className="block text-sm font-bold text-gray-700 mb-2">
                                    Notas Adicionales
                                </label>
                                <textarea
                                    {...register("notas_adicionales")}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Notas Adicionales"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Registrar Indicador
                            </button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-sm text-gray-600">¿Volver al perfil?&nbsp;
                        <Link to={`/profile/${user?.num_doc}`} className="font-medium text-indigo-600 hover:text-indigo-500">
                            Haz clic aquí.
                        </Link>
                    </p>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default IndicadorForm;
