import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import Select from 'react-select';
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

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataForm = {
        userId: parseInt(currentUser.userId, 10),
        exchangeDate: new Date(exchangeDate).toISOString(),
        clientName,
        numberDocumentClient,
        storeId: store ? store.value : "",  // Aquí usamos `store.value`
        promotionId: parseInt(promotionId, 10),
        ticketNumber,
        documentTypeId: parseInt(documentTypeId, 10),
      };

      console.log(dataForm);

      const response = await createDataForm(dataForm);
      console.log("DataForm created:", response);
    } catch (error) {
      console.error("Error creating DataForm:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
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
              <label className="block text-gray-700 font-bold mb-2">
                Store
              </label>
              <Select
                options={stores}
                placeholder="Select a store"
                value={store}
                onChange={setStore}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Client Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="clientName"
                type="text"
                placeholder="Enter client name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Document Type
              </label>
              <Select
                options={documentTypes}
                placeholder="Select a document type"
                value={documentTypes.find(docType => docType.value === documentTypeId)}
                onChange={selected => setDocumentTypeId(selected ? selected.value : "")}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                National ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="numberDocumentClient"
                type="text"
                placeholder="Enter national ID"
                value={numberDocumentClient}
                onChange={(e) => setNumberDocumentClient(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Ticket Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ticketNumber"
                type="text"
                placeholder="Enter ticket number"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Exchange Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="exchangeDate"
                type="date"
                placeholder="Select a date"
                value={exchangeDate}
                onChange={(e) => setExchangeDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Promotion
              </label>
              <Select
                options={promotions}
                placeholder="Select a promotion"
                value={promotions.find(promotion => promotion.value === promotionId)}
                onChange={selected => setPromotionId(selected ? selected.value : "")}
              />
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
