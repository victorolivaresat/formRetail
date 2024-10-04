import PropTypes from "prop-types";

const ConfirmationModal = ({
  show,
  handleClose,
  handleConfirm,
  formData,
  storeDetails,
}) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-semibold">Confirmación de registro</h3>
              <button
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="modal-content">
                <div className="mb-4 p-4 bg-slate-200 rounded-lg">
                  <p>
                    <strong>Tienda:</strong> {formData.storeId}
                  </p>
                  <p>
                    <strong>Zona:</strong> {storeDetails.zonaNombre}
                  </p>
                  <p>
                    <strong>Supervisor:</strong>{" "}
                    {storeDetails.supervisorNombre}
                  </p>
                </div>

                <div className="mb-4 p-4 bg-green-200 rounded-lg">
                  <p>
                    <strong>Nombre del Cliente:</strong> {formData.clientName}
                  </p>
                  <p>
                    <strong>Número de Documento:</strong>{" "}
                    {formData.numberDocumentClient}
                  </p>
                  <p>
                    <strong>Número de Ticket:</strong> {formData.ticketNumber}
                  </p>
                  <p>
                    <strong>Fecha de Canje:</strong> {formData.exchangeDate}
                  </p>
                  <p>
                    <strong>Promoción:</strong> {formData.promotionId}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-4 border-t border-gray-200">
              <p>¿Estás seguro que deseas guardar este registro?</p>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none mr-2"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  storeDetails: PropTypes.object.isRequired,
};

export default ConfirmationModal;
