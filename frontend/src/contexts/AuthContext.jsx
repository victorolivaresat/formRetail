/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import * as authAPI from "../api/authAPI";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import cookie from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const authenticateUser = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const loginUser = async (nationalId) => {
    try {
      const data = await authAPI.login(nationalId);
      if (data) {
        authenticateUser(data);
        toast.success("¡Bienvenido!");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión. Por favor, inténtalo de nuevo. ");
      console.error("Error during login", error.response.data.message);
    }
  };

  const logoutUser = async () => {
    try {
      await authAPI.logout();
      cookie.remove("token");
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);;
    }
  };


  useEffect(() => {
    async function checkLoginStatus() {
      const cookies = cookie.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setCurrentUser(null);
      }

      try {
        const res = await authAPI.verifyToken();
        if (!res.success) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setCurrentUser(res);
        setLoading(false);

      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setCurrentUser(null);
        setLoading(false);
      }
    }

    checkLoginStatus();
  }, []);

  const value = {
    currentUser,
    setCurrentUser: authenticateUser,
    loginUser,
    logoutUser,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
