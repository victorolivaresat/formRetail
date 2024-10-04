import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const urlBasic = import.meta.env.VITE_URL;

  const onSubmit = async (data) => {
    const { nationalId } = data;
    try {
      await loginUser(nationalId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(urlBasic);
    }
  }, [isAuthenticated, navigate, urlBasic]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
        <img src="logo.png" alt="Logo" className="w-20 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-center mb-6">Comenzar ahora</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              id="nationalId"
              type="text"
              placeholder="Número de DNI"
              autoFocus
              {...register("nationalId", {
                required: "El DNI es requerido",
              })}
              className="mt-1 block w-full px-3 py-2 border rounded border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.nationalId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.nationalId.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded py-2 px-4 bg-indigo-500 text-white font-semibold hadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
