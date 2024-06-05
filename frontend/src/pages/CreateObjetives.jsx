/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuten } from "../context/AutenContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../assets/fonts/fonts.css';

function MetaSaludForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { user, isAuthenticated, submitErrors = [], getIndicatorsByNumDoc, createGoal } = useAuten();
    const [indicadores, setIndicadores] = useState([]);

    useEffect(() => { document.title = "Registro de Metas de Salud"; }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            const fetchIndicadores = async () => {
                try {
                    const userIndicadores = await getIndicatorsByNumDoc(user.num_doc);
                    setIndicadores(userIndicadores);
                } catch (error) {
                    console.error(error);
                    setIndicadores([]);
                }
            };
            fetchIndicadores();
        }
    }, [isAuthenticated, navigate, user, getIndicatorsByNumDoc, indicadores]);

    const onSubmit = async (data) => {
        const metaSaludData = {
            ...data,
            fecha_creacion: new Date(),
        };
        await createGoal(metaSaludData);
    };

    return (
        <div>
            <Navbar />
            <div className="flex bg-slate-200 min-h-screen items-center justify-center px-6 py-12 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrar Objetivos de Salud</h2>
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
                                <label htmlFor="descripcion" className="block text-sm font-bold text-gray-700 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    {...register("descripcion")}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Descripción"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="objetivo" className="block text-sm font-bold text-gray-700 mb-2">
                                    Objetivo
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register("objetivo", { required: true })}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Objetivo"
                                />
                                {errors.objetivo && (
                                    <span className="text-red-500 text-sm">{errors.objetivo.message}</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="indicadores_id" className="block text-sm font-bold text-gray-700 mb-2">
                                    Indicadores
                                </label>
                                <select
                                    defaultValue=""
                                    {...register("indicadores_id", { required: true, valueAsNumber: true })}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Selecciona un indicador...</option>
                                    {Array.isArray(indicadores) && indicadores.map((indicador) => (
                                        <option key={indicador.id} value={indicador.id}>{indicador.nombre}</option>
                                    ))}
                                </select>
                                {errors.indicadores_id && (
                                    <span className="text-red-500 text-sm">{errors.indicadores_id.message}</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="fecha_cumplimiento" className="block text-sm font-bold text-gray-700 mb-2">
                                    Fecha de Cumplimiento
                                </label>
                                <input
                                    type="date"
                                    {...register("fecha_cumplimiento", { required: true })}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Fecha de Cumplimiento"
                                />
                                {errors.fecha_cumplimiento && (
                                    <span className="text-red-500 text-sm">{errors.fecha_cumplimiento.message}</span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="unidades_medida_id" className="block text-sm font-bold text-gray-700 mb-2">
                                    Unidades de Medida
                                </label>
                                <input
                                    type="number"
                                    {...register("unidades_medida_id", { required: true })}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Unidades de Medida"
                                />
                                {errors.unidades_medida_id && (
                                    <span className="text-red-500 text-sm">{errors.unidades_medida_id.message}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Registrar Meta de Salud
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
        </div>
    );
}

export default MetaSaludForm;
