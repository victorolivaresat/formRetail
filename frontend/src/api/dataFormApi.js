// import axios from "./axios";

// // Get All Stores
// export const getAllStores = async () => {
//   const { data } = await axios.get("stores");
//   return data;
// };


// export const getStoreDetails = async (storeId) => {

//   const { data } = await axios.get(`stores/${storeId}`);
//   return data;

// };

// // Get All Promotions
// export const getAllPromotions = async () => {
//   const { data } = await axios.get("promotions");
//   return data;
// };

// // Get All Document Types
// export const getAllDocumentTypes = async () => {
//   const { data } = await axios.get("document-types");
//   return data;
// };

// // Crear un nuevo DataForm
// export const createDataForm = async (dataForm) => {
//   try {
//     const { data } = await axios.post("data-forms", dataForm);
//     return data;
//   } catch (error) {
//     console.error("Error creating data form:", error);
//     throw error;
//   }
// };

// // Leer todos los DataForms
// export const getAllDataForms = async () => {
//   try {
//     const { data } = await axios.get("data-forms");
//     return data;
//   } catch (error) {
//     console.error("Error fetching data forms:", error);
//     throw error;
//   }
// };

// // Leer un DataForm por ID
// export const getDataFormById = async (id) => {
//   try {
//     const { data } = await axios.get(`data-forms/${id}`);
//     return data;
//   } catch (error) {
//     console.error(`Error fetching data form with ID ${id}:`, error);
//     throw error;
//   }
// };

// // Actualizar un DataForm por ID
// export const updateDataForm = async (id, updatedDataForm) => {
//   try {
//     const { data } = await axios.put(`data-forms/${id}`, updatedDataForm);
//     return data;
//   } catch (error) {
//     console.error(`Error updating data form with ID ${id}:`, error);
//     throw error;
//   }
// };

// // Eliminar un DataForm por ID (soft delete)
// export const deleteDataForm = async (id) => {
//   try {
//     const { data } = await axios.delete(`data-forms/${id}`);
//     return data;
//   } catch (error) {
//     console.error(`Error deleting data form with ID ${id}:`, error);
//     throw error;
//   }
// };

// // Buscar un cliente por número de documento
// export const getClientByNumDoc = async (numberDocumentClient, documentTypeId) => {
//   const response = await axios.get(
//     `/clientes/document/${numberDocumentClient}/${documentTypeId}`
//   );
//   return response.data;
// };


import customFetch from "./axios"; // Sustituye axios por customFetch

// Get All Stores
export const getAllStores = async () => {
  const data = await customFetch("stores", { method: 'GET' });
  return data;
};

// Get Store Details
export const getStoreDetails = async (storeId) => {
  const data = await customFetch(`stores/${storeId}`, { method: 'GET' });
  return data;
};

// Get All Promotions
export const getAllPromotions = async () => {
  const data = await customFetch("promotions", { method: 'GET' });
  return data;
};

// Get All Document Types
export const getAllDocumentTypes = async () => {
  const data = await customFetch("document-types", { method: 'GET' });
  return data;
};

// Create a new DataForm
export const createDataForm = async (dataForm) => {
  try {
    const data = await customFetch("data-forms", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    });
    return data;
  } catch (error) {
    console.error("Error creating data form:", error);
    throw error;
  }
};

// Get All DataForms
export const getAllDataForms = async () => {
  try {
    const data = await customFetch("data-forms", { method: 'GET' });
    return data;
  } catch (error) {
    console.error("Error fetching data forms:", error);
    throw error;
  }
};

// Get DataForm by ID
export const getDataFormById = async (id) => {
  try {
    const data = await customFetch(`data-forms/${id}`, { method: 'GET' });
    return data;
  } catch (error) {
    console.error(`Error fetching data form with ID ${id}:`, error);
    throw error;
  }
};

// Update DataForm by ID
export const updateDataForm = async (id, updatedDataForm) => {
  try {
    const data = await customFetch(`data-forms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDataForm),
    });
    return data;
  } catch (error) {
    console.error(`Error updating data form with ID ${id}:`, error);
    throw error;
  }
};

// Delete DataForm by ID (soft delete)
export const deleteDataForm = async (id) => {
  try {
    const data = await customFetch(`data-forms/${id}`, { method: 'DELETE' });
    return data;
  } catch (error) {
    console.error(`Error deleting data form with ID ${id}:`, error);
    throw error;
  }
};

// Get Client by Document Number
export const getClientByNumDoc = async (numberDocumentClient, documentTypeId) => {
  const data = await customFetch(`/clientes/document/${numberDocumentClient}/${documentTypeId}`, { method: 'GET' });
  return data;
};
