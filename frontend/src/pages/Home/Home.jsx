import ConfirmationModal from "../../utils/ConfirmationModal";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import Select from "react-select";
import {
  getAllStores,
  createDataForm,
  getAllPromotions,
  getClientByNumDoc,
  getAllDocumentTypes,
  getStoreDetails,
} from "../../api/dataFormApi";

const Home = () => {
  const { currentUser, isAuthenticated, logoutUser } = useAuth();
  const [prevNumberDocumentLength, setPrevNumberDocumentLength] = useState(0);
  const [numberDocumentClient, setNumberDocumentClient] = useState("");
  const [documentTypeId, setDocumentTypeId] = useState("");
  const [documentTypes, setDocumentTypes] = useState([]);
  const [ticketNumber, setTicketNumber] = useState("");
  const [exchangeDate, setExchangeDate] = useState("");
  const [promotionId, setPromotionId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [clientName, setClientName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [stores, setStores] = useState([]);
  const [errors, setErrors] = useState({});
  const [ path, setPath ] = useState("");

  const [formData2, setFormData2] = useState({});
  

  const [isClientNameEditable, setIsClientNameEditable] = useState(false);

  useEffect(() => {
    // Solo borrar el nombre si el número de documento es más corto que el anterior
    if (numberDocumentClient.length < prevNumberDocumentLength) {
      setClientName("");
    }
    // Actualizar la longitud previa del número de documento
    setPrevNumberDocumentLength(numberDocumentClient.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberDocumentClient]);

  const [formData, setFormData] = useState({
    clientName: "",
    numberDocumentClient: "",
    ticketNumber: "",
    exchangeDate: "",
    storeId: "",
    promotionId: "",
    documentTypeId: "",
    path: "",
  });

  // Get all stores
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getAllStores();

        setStores(
          data.data.map((store) => ({
            value: store.storeId,
            label: store.storeName,
            labell: store.district,
            
          }))
        );
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);


  // Get all document types
  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const data = await getAllDocumentTypes();
        setDocumentTypes(
          data.data.map((docType) => ({
            value: docType.documentTypeId,
            label: docType.documentTypeName,
          }))

        );
      } catch (error) {
        console.error("Error fetching document types:", error);
      }
    };

    fetchDocumentTypes();
  }, []);

  // Get all promotions
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getAllPromotions();
        setPromotions(
          data.data.map((promotion) => ({
            value: promotion.promotionId,
            label: promotion.promotionName,
          }))
        );
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  // Validaciones de formulario
  const validateForm = () => {
    const requiredFields = [
      {
        field: clientName,
        name: "clientName",
        message: "El nombre del cliente es obligatorio.",
      },
      {
        field: numberDocumentClient,
        name: "numberDocumentClient",
        message: "El número de documento es obligatorio.",
      },
      {
        field: ticketNumber,
        name: "ticketNumber",
        message: "El número de ticket es obligatorio.",
      },
      {
        field: exchangeDate,
        name: "exchangeDate",
        message: "La fecha es obligatoria.",
      },
      {
        field: storeId,
        name: "store",
        message: "Debe seleccionar una tienda.",
      },
      {
        field: promotionId,
        name: "promotionId",
        message: "Debe seleccionar una promoción.",
      },
      {
        field: documentTypeId,
        name: "documentTypeId",
        message: "Debe seleccionar un tipo de documento.",
      },
      {
        field: path,
        name: "path",
        message: "Debe seleccionar una ruta.",
      }
    ];

    const formErrors = requiredFields.reduce(
      (errors, { field, name, message }) => {
        if (!field) errors[name] = message;
        return errors;
      },
      {}
    );

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const apiDni = async (dni) => {
    const token = import.meta.env.VITE_API_KEY;
    const url = `https://api.apuestatotal.com/v2/dni?dni=${dni}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error consultando cliente", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      return null;
    }
  };

  const searchClient = async () => {
    console.log(documentTypeId);

    if (!numberDocumentClient || !documentTypeId.value) {
      toast.error("Debe ingresar el número y tipo de documento.");
      return;
    }

    try {
      const client = await getClientByNumDoc(
        numberDocumentClient,
        documentTypeId.value
      );

      if (client && client.data && client.data.length > 0) {
        setClientName(
          `${client.data[0].nombres} ${client.data[0].apePaterno} ${client.data[0].apeMaterno}`
        );

        setIsClientNameEditable(false);
        toast.success("Cliente encontrado en base de datos interna!");
      } else {
        toast.error("Cliente no encontrado en base de datos interna.");
      }
    } catch (error) {
      if (!error.response.data.success) {
        const clientDni = await apiDni(numberDocumentClient);
        if (clientDni && clientDni.http_code === 200) {
          setClientName(
            `${clientDni.result.nombres} ${clientDni.result.apellido_paterno} ${clientDni.result.apellido_materno}`
          );

          console.log(clientDni);
          setIsClientNameEditable(false);
          toast.success("Cliente encontrado en API de DNI!");
          return;
        } else {
          toast.info(
            "Cliente no encontrado en API de DNI, buscando en base de datos interna."
          );
        }
      }
      console.error("Error buscando cliente:", error.response.data.message);
      toast.error("Hubo un error al buscar el cliente.");
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Por favor, corrija los errores antes de enviar.");
      return;
    }

    setShowModal(true);
    
    const data2 = await getStoreDetails(storeId.value);
    console.log(data2);

    if (data2 && data2.success && data2.data.length > 0) {
      setFormData2({ supervisorNombre: data2.data[0].supervisorNombre,
        zonaNombre: data2.data[0].zonaNombre 
       });
    } else {
      toast.error("No se encontraron datos para el storeId");
    }

    setFormData({
      clientName,
      numberDocumentClient,
      ticketNumber,
      exchangeDate,
      storeId: storeId ? storeId.label : "",
      promotionId: promotionId ? promotionId.label : "",
      path,
      documentTypeId: documentTypeId ? documentTypeId.label : "",
      ...formData2
    });

  };

  const handleConfirm = async () => {
    setShowModal(false);
    console.log(formData);

    try {
      const dataForm = {
        userId: parseInt(currentUser.userId, 10),
        exchangeDate: new Date(exchangeDate).toISOString(),
        clientName,
        numberDocumentClient,
        storeId: storeId ? storeId.value : "",
        promotionId: parseInt(promotionId.value, 10),
        ticketNumber,
        path,
        documentTypeId: parseInt(documentTypeId.value, 10),
      };

      const response = await createDataForm(dataForm);
      
      console.log("DataForm created:", response);

      toast.success("Formulario enviado con éxito!");

      setClientName("");
      setNumberDocumentClient("");
      setTicketNumber("");
      setExchangeDate("");
      setStoreId("");
      setPromotionId("");
      setDocumentTypeId("");
      setPath("");
    } catch (error) {
      console.error("Error creating DataForm:", error);
      toast.error("Hubo un error al enviar el formulario: " + error.response.data.error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
      <ConfirmationModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        formData={formData}
        formData2={formData2}
      />

      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <ToastContainer />
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
                value={storeId}
                onChange={setStoreId}
              />
              {errors.store && (
                <p className="text-red-500 text-sm">{errors.store}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="clientName"
                type="text"
                placeholder="Nombre del cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                readOnly={!isClientNameEditable}
              />
              {errors.clientName && (
                <p className="text-red-500 text-sm">{errors.clientName}</p>
              )}
            </div>
            <div className="mb-4">
              <Select
                options={documentTypes}
                placeholder="Tipo de documento"
                value={documentTypeId}
                onChange={setDocumentTypeId}
              />
              {errors.documentTypeId && (
                <p className="text-red-500 text-sm">{errors.documentTypeId}</p>
              )}
            </div>
            <div className="mb-4">
              <div className="flex">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="numberDocumentClient"
                  type="text"
                  placeholder="Número de documento"
                  value={numberDocumentClient}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (value.length <= 12) {
                      setNumberDocumentClient(value);
                    }
                  }}
                  onPaste={() => {
                    setNumberDocumentClient("");
                  }}
                />
                <button
                  type="button"
                  className="bg-blue-600 text-white py-2 px-4 rounded ml-2 hover:bg-blue-500 focus:outline-none focus:shadow-outline"
                  onClick={searchClient}
                >
                  Buscar
                </button>
              </div>

              {errors.numberDocumentClient && (
                <p className="text-red-500 text-sm">
                  {errors.numberDocumentClient}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ticketNumber"
                type="text"
                placeholder="Ingresa el número de ticket"
                value={ticketNumber}
                onChange={(e) => {
                  const value = e.target.value
                  if (value.length <= 12) {
                    setTicketNumber(value);
                  }
                  }}
              />
              {errors.ticketNumber && (
                <p className="text-red-500 text-sm">{errors.ticketNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="exchangeDate"
                type="date"
                placeholder="Fecha de intercambio"
                value={exchangeDate}
                onChange={(e) => setExchangeDate(e.target.value)}
              />
              {errors.exchangeDate && (
                <p className="text-red-500 text-sm">{errors.exchangeDate}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="path"
                type="url"
                placeholder="URL de la imagen"
                onChange={(e) => setPath(e.target.value)}
                value={path}
              />
              {errors.path && (
                <p className="text-red-500 text-sm">{errors.path}</p>
              )}
            </div>
            <div className="mb-4">
              <Select
                options={promotions}
                placeholder="Selecciona una promoción"
                value={promotionId}
                onChange={setPromotionId}
              />
              {errors.promotionId && (
                <p className="text-red-500 text-sm">{errors.promotionId}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-8">
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
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
