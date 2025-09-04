import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function PublicRoutes() {
  const { token } = useContext(AuthContext);
  return token ? <Navigate to={"/home"} /> : <Outlet />;
}
