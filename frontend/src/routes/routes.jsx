import { Route, Routes, Navigate } from "react-router-dom";
import RouteTransition from "../utils/RouteTransition";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";


const urlBasic = import.meta.env.VITE_URL;

const AppRoutes = () => (
  <Routes>
    <Route
      path={urlBasic + "login"}
      element={
        <RouteTransition>
          <Login />
        </RouteTransition>
      }
    />
    <Route element={<ProtectedRoute />}>
      <Route
        path={urlBasic}
        element={
          <RouteTransition>
            <Home />
          </RouteTransition>
        }
      />

      <Route
        path="*"
        element={
          <RouteTransition>
            <NotFound />
          </RouteTransition>
        }
      />
    </Route>
    <Route path="*" element={<Navigate to={urlBasic + "login"} />} />
  </Routes>
);

export default AppRoutes;
