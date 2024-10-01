// import axios from "./axios";

// // Login
// export const login = async (nationalId) => {
//   const { data } = await axios.post('auth/login', { nationalId });
//   console.log(data);
//   return data;
// };

// // Logout
// export const logout = async () => {
//   const { data } = await axios.post('auth/logout');
//   return data;
// };

// // Verify Token
// export const verifyToken = async () => {
//   const { data } = await axios.get('auth/verify-token');
//   return data;
// };


import customFetch from "./axios";

// Login
export const login = async (nationalId) => {
  try {
    const data = await customFetch('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nationalId }),
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    const data = await customFetch('auth/logout', {
      method: 'POST',
    });
    return data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

// Verify Token
export const verifyToken = async () => {
  try {
    const data = await customFetch('auth/verify-token', {
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
};
