import axios from './axios';

// Get All Stores
export const getAllStores = async () => {
  const { data } = await axios.get('stores');
  return data;
};

// Get All Promotions
export const getAllPromotions = async () => {
  const { data } = await axios.get('promotions');
  return data;
};

// Get All Document Types
export const getAllDocumentTypes = async () => {
  const { data } = await axios.get('document-types');
  return data;
};

// Get All Data Forms
export const getAllDataForms = async () => {
  const { data } = await axios.get('data-forms');
  return data;
};
