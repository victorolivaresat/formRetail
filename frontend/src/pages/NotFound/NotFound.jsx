import { FaExclamationCircle } from "react-icons/fa";
import LoaderPage from "../../utils/LoaderPage";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [loading, setLoading] = useState(true);
  const urlBasic = import.meta.env.VITE_URL;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <LoaderPage />
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-slate-600">404</h1>
            <p className="text-3xl mt-4">
              <span className="text-red-500">
                <FaExclamationCircle className="inline" /> Oops!
              </span>{" "}
              Página no encontrada.
            </p>
            <p className="text-xl mt-2 text-gray-600">
              La página que estás buscando no existe.
            </p>
            <Link to={urlBasic} className="mt-6 inline-block px-8 py-3 bg-slate-600 text-white text-lg font-semibold shadow hover:bg-slate-700 transition">
              Volver
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NotFound;
