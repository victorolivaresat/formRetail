import { ToastContainer } from "react-toastify";
import AppRoutes from "../routes/routes";
const Layout = () => {

  return (
    <>
      <ToastContainer
        position="top-center"
      />
      <div>
        <AppRoutes />
      </div>
    </>
  );
};

export default Layout;
