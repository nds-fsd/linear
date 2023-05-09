import { Navigate, Outlet } from "react-router-dom";
import { getUserToken } from "./localStorage.utils";
import Home from "../pages/home/home";

const PrivateRoutes = () => {
  if (getUserToken()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
