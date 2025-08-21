import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const ProtectedRoute = () => {

    const token = useAuthStore((state) => state.token);

    return token ? <Outlet /> : <Navigate to="login" />
}