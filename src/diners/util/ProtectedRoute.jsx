import { Outlet, Navigate } from "react-router-dom";
import { useDinersAuthStore } from "../store/useDinersAuthStore";

export const ProtectedRoute = () => {

    const token = useDinersAuthStore((state) => state.token);

    return token ? <Outlet /> : <Navigate to="login" />
}