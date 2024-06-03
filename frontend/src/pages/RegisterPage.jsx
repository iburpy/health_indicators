import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuten } from "../context/AutenContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuten();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    values.unidades_medida = {
      presion_arterial: "mmHg",
      frecuencia_cardiaca: "bpm",
      nivel_glucosa_sangre: "mg/dL",
      peso_corporal: "kg",
      altura: "m",
      temperatura_corporal: "°C",
      saturacion_oxigeno: "SpO2",
      consumo_agua: "L",
      tiempo_actividad_fisica: "min",
      medidas_cintura: "cm",
      medidas_cadera: "cm",
      capacidad_cardiovascular: "ml/kg/min",
      fuerza_muscular: "N",
    };
    await signup(values);
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Registro
        </h2>

        {Array.isArray(registerErrors) &&
          registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white">
              {error}
            </div>
          ))}

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
            className="mt-6 space-y-6"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label
                  htmlFor="num_doc"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Número de Documento:
                </label>
                <input
                  type="text"
                  {...register("num_doc", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Número de Documento"
                />
                {errors.num_doc && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  {...register("nombre", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Nombre"
                />
                {errors.nombre && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="apellido"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Apellido:
                </label>
                <input
                  type="text"
                  {...register("apellido", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Apellido"
                />
                {errors.apellido && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fecha_de_nacimiento"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  {...register("fecha_de_nacimiento", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.fecha_de_nacimiento && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="generos_id"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Género:
                </label>
                <select
                  {...register("generos_id", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={1}>Masculino</option>
                  <option value={2}>Femenino</option>
                </select>
                {errors.generos_id && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Correo Electrónico"
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
                  Contraseña:
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
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Ya estas Registrado? Inicia Sesión
              </Link>
            </p>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Siguiente
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={onSubmit} className="mt-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Contacto de Emergencia
            </h3>

            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.num_doc"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Número de Documento:
                </label>
                <input
                  type="text"
                  {...register("contacto_emergencia.num_doc", {
                    required: true,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Número de Documento"
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
                  Nombre Completo:
                </label>
                <input
                  type="text"
                  {...register("contacto_emergencia.nombre_completo", {
                    required: true,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Nombre Completo"
                />
                {errors.contacto_emergencia?.nombre_completo && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.generos_id"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Género
                </label>
                <select
                  {...register("contacto_emergencia.generos_id", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={1}>Masculino</option>
                  <option value={2}>Femenino</option>
                  <option value={3}>Prefiero no decirlo</option>
                </select>
                {errors.contacto_emergencia?.generos_id && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.telefono"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Teléfono
                </label>
                <input
                  type="text"
                  {...register("contacto_emergencia.telefono", {
                    required: true,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Teléfono"
                />
                {errors.contacto_emergencia?.telefono && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.parentesco"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Parentesco
                </label>
                <input
                  type="text"
                  {...register("contacto_emergencia.parentesco", {
                    required: true,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Parentesco"
                />
                {errors.contacto_emergencia?.parentesco && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.relacion"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Relación
                </label>
                <input
                  type="text"
                  {...register("contacto_emergencia.relacion", {
                    required: true,
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Relación"
                />
                {errors.contacto_emergencia?.relacion && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contacto_emergencia.email"
                  className="block text-sm font-bold mb-2 mt-2"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  {...register("contacto_emergencia.email", { required: true })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Correo Electrónico"
                />
                {errors.contacto_emergencia?.email && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>
            </div>

            <p className="mt-2 text-center text-sm text-gray-600">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Ya estas Registrado? Inicia Sesión
              </Link>
            </p>
            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarse
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
