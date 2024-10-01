// import axios from "axios";

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// const instance = axios.create({  
//   baseURL: apiBaseUrl,
//   withCredentials: true,
// });

// export default instance;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const customFetch = async (endpoint, options = {}) => {
  const defaultOptions = {
    credentials: 'include',
  };

  const finalOptions = { ...defaultOptions, ...options };

  const response = await fetch(`${apiBaseUrl}${endpoint}`, finalOptions);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default customFetch;

