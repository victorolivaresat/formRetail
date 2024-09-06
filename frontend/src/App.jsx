
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
//Styles
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
