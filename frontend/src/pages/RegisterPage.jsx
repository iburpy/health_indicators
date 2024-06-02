import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuten } from "../context/AutenContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { MdAssignmentAdd } from "react-icons/md";
import '../assets/fonts/fonts.css';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuten();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  useEffect(() => { if (isAuthenticated) navigate("/login") }, [isAuthenticated, navigate]);
  useEffect(() => { document.title = "Registro" }, []);

  const progress = (step / 3) * 100;

  const onSubmit = handleSubmit(async (values) => { await signup(values) });

  const [otherRelation, setRelation] = useState('');
  const [selectedRelation, setSelectedRelation] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedRelation(value);
    if (value === 'Otros') setRelation('');
  };
  const nextStep = () => { setStep(step + 1) };
  const prevStep = () => { if(step > 1) setStep(step - 1) };
  return (
    <div id="bg" /*style={{ backgroundImage: `url(${background})` }}*/ className="flex bg-slate-200  min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-full bg-slate-300 h-2 rounded-full mt-4 relative">
        <div className="bg-indigo-600 h-2 rounded-full" 
          style={{ width: `${progress}%` }}>
        </div>
      </div>
        <h2 className="mt-10 text-center flex items-center justify-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          <MdAssignmentAdd className="mr-2"/>
          Registro
        </h2>
        {Array.isArray(registerErrors) && registerErrors.map((error, i) => ( 
                <div key={i} className="bg-red-500 p-2 text-white">{error}</div> 
        ))}

        {step === 1 && (
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
            className="mt-6 space-y-6"
          >
            <div className="rounded-md  -space-y-px">
            <h3 className="text-lg text-center mb-2 font-medium text-gray-900">
              Información Personal
            </h3>
            <fieldset>
            <h5 className="text-center text-sm text-gray-600 mb-6">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
              Este es el primer paso para registrarte. Completa los siguientes campos para continuar.
            </h5>
            </fieldset>
              <div className="mb-4">
                <label
                  htmlFor="num_doc"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Número de documento
                </label>
                <input
                  type="text"
                  {...register("num_doc", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Documento de Identidad Principal"
                />
                {errors.num_doc && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-bold mb-2 mt-2">
                  Nombre(s)
                </label>
                <input
                  type="text"
                  {...register("nombre", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Nombre(s)"
                />
                {errors.nombre && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="apellido"
                  className="block text-sm font-bold mb-2 mt-2">
                  Apellidos
                </label>
                <input
                  type="text"
                  {...register("apellido", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Apellidos"
                />
                {errors.apellido && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fecha_de_nacimiento"
                  className="block text-sm font-bold mb-2 mt-2">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  {...register("fecha_de_nacimiento", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.fecha_de_nacimiento && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="generos_id"
                  className="block text-sm font-bold mb-2 mt-2">
                  Género
                </label>
                <select
                  {...register("generos_id", { required: true, valueAsNumber: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Selecciona tu género</option>
                  <option value={1}>Masculino</option>
                  <option value={2}>Femenino</option>
                </select>
                {errors.generos_id && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-bold mb-2 mt-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Correo electrónico. Asegúrate que sea válido."
                />
                {errors.email && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Contraseña"
                />
                {errors.password && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>
            </div>
            <p className="mt-2 text-center text-sm text-gray-600">
            
          </p>
            <div>
              <button
                type="button"
                onClick={nextStep}
                {...window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Siguiente
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={onSubmit} className="mt-6 space-y-6">
            <div className="rounded-md  -space-y-px">
            <h3 className="text-lg text-center mb-2 font-medium text-gray-900">
              Contacto de Emergencia
            </h3>
            <h5 className="text-center  text-sm text-gray-600 mb-6">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                Ahora crea tu contacto de emergencia para ocasiones imprevistas. Completa los siguientes campos para seguir con el último paso.
            </h5>
              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.num_doc"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Número de documento
                </label>
                <input
                  type="text"
                  {...register("contacto_emergencia.num_doc", {
                    required: true,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Documento de Identidad Principal"
                />
                {errors.contacto_emergencia?.num_doc && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.nombre_completo"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  {...register("contacto_emergencia.nombre_completo", {
                    required: true,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Nombre Completo"
                />
                {errors.contacto_emergencia?.nombre_completo && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.generos_id"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Género
                </label>
                <select 
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("contacto_emergencia.generos_id", {
                    required: true, valueAsNumber: true })}
                  >
                  <option value="">Escoge el género de tu contacto...</option>
                  <option value={1}>Masculino</option>
                  <option value={2}>Femenino</option>
                  <option value={3}>Prefiero no decirlo</option>
                </select>
                {errors.contacto_emergencia?.generos_id && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.telefono"
                  className="block text-sm font-bold mb-2 mt-2">
                  Teléfono
                </label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Teléfono"
                  {...register("contacto_emergencia.telefono", { required: true })}
                />
                {errors.contacto_emergencia?.telefono && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>

              <div className="mb-4">
                <label  className="block text-sm font-bold mb-2 mt-2"
                        htmlFor="contacto_emergencia.parentesco">
                  Parentesco
                </label> 
                <select className="w-full px-3 py-2 border rounded-lg"
                  {...register("contacto_emergencia.parentesco", { required: true})}>
                  <option value="">Selecciona el parentesco de tu contacto</option>
                  <optgroup label="Por consanguinidad">
                    <option value="Padre">Padre</option>
                    <option value="Madre">Madre</option>
                    <option value="Hijo">Hijo</option>
                    <option value="Hermano">Hermano</option>
                    <option value="Primo">Primo</option>
                    <option value="Tío">Tío</option>
                    <option value="Abuelo">Abuelo</option>
                    <option value="Sobrino">Sobrino</option>
                    <option value="Nieto">Nieto</option>
                  </optgroup>
                  <optgroup label="Por afinidad">
                    <option value="Suegro">Suegro</option>
                    <option value="Yerno">Yerno</option>
                    <option value="Nuera">Nuera</option>
                    <option value="Cuñado">Cuñado</option>
                    <option value="Tío Político">Tío Político</option>
                    <option value="Abuelo Político">Abuelo Político</option>
                    <option value="Sobrino Político">Sobrino Político</option>
                  </optgroup>
                  <option value="Otros">Otro...</option>
                </select>
                {errors.contacto_emergencia?.parentesco && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>

              <div className="mb-4">
                <label  className="block text-sm font-bold mb-2 mt-2"
                        htmlFor="contacto_emergencia.relacion">
                  Relación
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  onChange={handleChange} value={selectedRelation}>
                  <option value="">Selecciona tu relación con tu contacto</option>
                  <option value="Amigo/a">Amigo o Amiga</option>
                  <option value="Vecino/a">Vecino o Vecina</option>
                  <option value="Compañero/a de trabajo">Compañero o Compañera de trabajo</option>
                  <option value="Conocido/a">Conocido o Conocida</option>
                  <option value="Otros">Otros</option>
                </select>
                {selectedRelation === 'Otros' && (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg mt-2"
                    placeholder="Especifica la relación"
                    value={otherRelation}
                    onChange={(e) => setRelation(e.target.value)}
                  />
                )}
                {errors.contacto_emergencia?.relacion && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.email"
                  className="block text-sm font-bold mb-2 mt-2">
                Correo electrónico
                </label>
                <input
                  type="email"
                  {...register("contacto_emergencia.email", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Correo electrónico de tu contacto. Asegúrate que sea válido."
                />
                {errors.contacto_emergencia?.email && ( <span className="text-red-500">Este campo es requerido</span> )}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                {...window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800  hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={nextStep}
                {...window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex w-full justify-center rounded-md ml-2 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Siguiente
              </button>
            </div>
          </form>
        )}
        {step === 3 && (
        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          <h3 className="text-lg text-center mb-2 font-medium text-gray-900">Unidades de Medida</h3>
          <h5 className="text-center text-sm text-gray-600 mb-6">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
              ¡Ya casi estás listo! Termina con las unidades de medidas y ya tendrás tu cuenta de usuario.
            </h5>
          <div className="rounded-md -space-y-px">
            <div className="mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.presion_arterial" className="block text-sm font-bold mb-2 mt-2 mr-2">Presión Arterial</label>
              <select {...register("unidades_medida.presion_arterial")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box">
                  <option value="">...</option>
                  <option value="mmHg">mmHg</option>
                  <option value="kPa">kPa</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.frecuencia_cardiaca" className="block text-sm font-bold mb-2 mt-2 mr-2">Frecuencia Cardiaca</label>
              <select {...register("unidades_medida.frecuencia_cardiaca")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box">
                  <option value="">...</option>
                  <option value="bpm">bpm</option>
                  <option value="Hz">Hz</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.nivel_glucosa_sangre" className="block text-sm font-bold mb-2 mt-2 mr-2">Nivel Glucosa</label>
              <select {...register("unidades_medida.nivel_glucosa_sangre")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box select-box">
                  <option value="">...</option>
                  <option value="mg/dL">mg/dL</option>
                  <option value="mmol/L">mmol/L</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.peso_corporal" className="block text-sm font-bold mb-2 mt-2 mr-2">Peso Corporal</label>
              <select {...register("unidades_medida.peso_corporal")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box select-box">
                  <option value="">...</option>
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.altura" className="block text-sm font-bold mb-2 mt-2 mr-2">Altura</label>
              <select {...register("unidades_medida.altura")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box select-box">
                  <option value="">...</option>
                  <option value="m">m</option>
                  <option value="cm">cm</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.temperatura_corporal" className="block text-sm font-bold mb-2 mt-2 mr-2">Temperatura Corporal</label>
              <select {...register("unidades_medida.temperatura_corporal")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box select-box">
                  <option value="">...</option>
                  <option value="°C">°C</option>
                  <option value="°F">°F</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="saturacion_oxigeno" className="block text-sm font-bold mb-2 mt-2 mr-2">Saturación de Oxígeno</label>
              <select name="saturacion_oxigeno" className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box select-box">
                  <option value="">...</option>
                  <option value="SpO2">SpO2</option>
                  <option value="ppO2">ppO2</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.consumo_agua" className="block text-sm font-bold mb-2 mt-2 mr-2">Consumo de Agua</label>
              <select {...register("unidades_medida.consumo_agua")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box select-box">
                  <option value="">...</option>
                  <option value="L">L</option>
                  <option value="ml">ml</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.tiempo_actividad_fisica" className="block text-sm font-bold mb-2 mt-2 mr-2">Tiempo de Actividad Física</label>
              <select {...register("unidades_medida.tiempo_actividad_fisica")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box">
                  <option value="">...</option>
                  <option value="min">min</option>
                  <option value="h">h</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.medidas_cintura" className="block text-sm font-bold mb-2 mt-2 mr-2">Medidas de Cintura</label>
              <select {...register("unidades_medida.medidas_cintura")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box">
                  <option value="">...</option>
                  <option value="cm">cm</option>
                  <option value="in">in</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.medidas_cadera" className="block text-sm font-bold mb-2 mt-2 mr-2">Medidas de Cadera</label>
              <select {...register("unidades_medida.medidas_cadera")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box">
                  <option value="">...</option>
                  <option value="cm">cm</option>
                  <option value="in">in</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.capacidad_cardiovascular" className="block text-sm font-bold mb-2 mt-2 mr-2">Capacidad Cardiovascular</label>
              <select {...register("unidades_medida.capacidad_cardiovascular")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box">
                  <option value="">...</option>
                  <option value="ml/kg/min">ml/kg/min</option>
                  <option value="L/min">L/min</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex flex-wrap justify-between items-center">
              <label htmlFor="unidades_medida.fuerza_muscular" className="block text-sm font-bold mb-2 mt-2 mr-2 rounded-md">Fuerza Muscular</label>
              <select {...register("unidades_medida.fuerza_muscular")} className="flex mb-1 mt-1 rounded relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select-box select-box">
                  <option value="">...</option>
                  <option value="N">N</option>
                  <option value="kgF">kgF</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              {...window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800  hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"x
            >
              Anterior
            </button>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md ml-2 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Finalizar
            </button>
          </div>
        </form>
      )}
      </div>
      <p className="flex mt-4 justify-center text-gray-500 text-sm">¿Ya tienes cuenta?&nbsp;
            <Link to="/login" className="font-medium mb-4 text-indigo-600 hover:text-indigo-500">
              Inicia sesión aquí.
            </Link>
        </p>
    </div>
  );
}

export default RegisterPage;