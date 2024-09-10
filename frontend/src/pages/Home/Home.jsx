import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify'; // Para los toasts
import 'react-toastify/dist/ReactToastify.css'; // Estilos de react-toastify
import {
  getAllStores,
  getAllPromotions,
  getAllDocumentTypes,
  createDataForm,
} from "../../api/dataFormApi";

const Home = () => {
  const { currentUser, isAuthenticated, logoutUser } = useAuth();

  // Estados para el formulario
  const [clientName, setClientName] = useState("");
  const [numberDocumentClient, setNumberDocumentClient] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [exchangeDate, setExchangeDate] = useState("");
  const [store, setStore] = useState(null);
  const [promotionId, setPromotionId] = useState("");
  const [documentTypeId, setDocumentTypeId] = useState("");
  const [stores, setStores] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  
  // Estados de errores
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getAllStores();
        setStores(data.data.map(store => ({
          value: store.storeId,
          label: store.storeName
        })));
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const data = await getAllDocumentTypes();
        setDocumentTypes(data.data.map(docType => ({
          value: docType.documentTypeId,
          label: docType.documentTypeName
        })));
      } catch (error) {
        console.error("Error fetching document types:", error);
      }
    };

    fetchDocumentTypes();
  }, []);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getAllPromotions();
        setPromotions(data.data.map(promotion => ({
          value: promotion.promotionId,
          label: promotion.promotionName
        })));
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  // Validaciones de formulario
  const validateForm = () => {
    let formErrors = {};
    if (!clientName) formErrors.clientName = "El nombre del cliente es obligatorio.";
    if (!numberDocumentClient) formErrors.numberDocumentClient = "El número de documento es obligatorio.";
    if (!ticketNumber) formErrors.ticketNumber = "El número de ticket es obligatorio.";
    if (!exchangeDate) formErrors.exchangeDate = "La fecha es obligatoria.";
    if (!store) formErrors.store = "Debe seleccionar una tienda.";
    if (!promotionId) formErrors.promotionId = "Debe seleccionar una promoción.";
    if (!documentTypeId) formErrors.documentTypeId = "Debe seleccionar un tipo de documento.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Por favor, corrija los errores antes de enviar.");
      return;
    }

    try {
      const dataForm = {
        userId: parseInt(currentUser.userId, 10),
        exchangeDate: new Date(exchangeDate).toISOString(),
        clientName,
        numberDocumentClient,
        storeId: store ? store.value : "",
        promotionId: parseInt(promotionId, 10),
        ticketNumber,
        documentTypeId: parseInt(documentTypeId, 10),
      };

      const response = await createDataForm(dataForm);
      console.log("DataForm created:", response);

      toast.success("Formulario enviado con éxito!");
      
      // Resetear formulario
      setClientName("");
      setNumberDocumentClient("");
      setTicketNumber("");
      setExchangeDate("");
      setStore(null);
      setPromotionId("");
      setDocumentTypeId("");

    } catch (error) {
      console.error("Error creating DataForm:", error);
      toast.error("Hubo un error al enviar el formulario.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <ToastContainer /> {/* Contenedor para mostrar los toasts */}
        <h1 className="text-4xl font-bold text-center mb-4 text-slate-800">
          Bienvenido
          {isAuthenticated && currentUser ? `, ${currentUser.userName}` : ""}
        </h1>
        <p className="text-lg text-center text-indigo-600 my-8">
          {isAuthenticated
            ? "Has iniciado sesión con éxito. ¡Registra la promoción!"
            : "Por favor, inicia sesión para acceder a tu cuenta."}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-4">
              <Select
                options={stores}
                placeholder="Selecciona una tienda"
                value={store}
                onChange={setStore}
              />
              {errors.store && <p className="text-red-500 text-sm">{errors.store}</p>}
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="clientName"
                type="text"
                placeholder="Nombre del cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName}</p>}
            </div>
            <div className="mb-4">
              <Select
                options={documentTypes}
                placeholder="Tipo de documento"
                value={documentTypes.find(docType => docType.value === documentTypeId)}
                onChange={selected => setDocumentTypeId(selected ? selected.value : "")}
              />
              {errors.documentTypeId && <p className="text-red-500 text-sm">{errors.documentTypeId}</p>}
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="numberDocumentClient"
                type="text"
                placeholder="Numero de documento"
                value={numberDocumentClient}
                onChange={(e) => setNumberDocumentClient(e.target.value)}
              />
              {errors.numberDocumentClient && <p className="text-red-500 text-sm">{errors.numberDocumentClient}</p>}
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ticketNumber"
                type="text"
                placeholder="Ingresa el numero de ticket"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
              />
              {errors.ticketNumber && <p className="text-red-500 text-sm">{errors.ticketNumber}</p>}
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="exchangeDate"
                type="date"
                placeholder="Ingresa la fecha de la promocion"
                value={exchangeDate}
                onChange={(e) => setExchangeDate(e.target.value)}
              />
              {errors.exchangeDate && <p className="text-red-500 text-sm">{errors.exchangeDate}</p>}
            </div>
            <div className="mb-4">
              <Select
                options={promotions}
                placeholder="Selecciona una promocion"
                value={promotions.find(promotion => promotion.value === promotionId)}
                onChange={selected => setPromotionId(selected ? selected.value : "")}
              />
              {errors.promotionId && <p className="text-red-500 text-sm">{errors.promotionId}</p>}
            </div>
          </div>

          <hr className="my-8" />
          <div className="flex items-center justify-center mx-8 my-2 gap-6">
            <button
              className="bg-blue-900 text-white py-2 px-8 rounded hover:bg-blue-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Enviar
            </button>
            <button
              className="bg-gray-900 text-white py-2 px-8 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={logoutUser}
            >
              Salir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
