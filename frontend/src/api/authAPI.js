import axios from "./axios";

// Login
export const login = async (nationalId) => {
  const { data } = await axios.post('auth/login', { nationalId });
  console.log(data);
  return data;
};

// Logout
export const logout = async () => {
  const { data } = await axios.post('auth/logout');
  return data;
};

// Verify Token
export const verifyToken = async () => {
  const { data } = await axios.get('auth/verify-token');
  return data;
};
