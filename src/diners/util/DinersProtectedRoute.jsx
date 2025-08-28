import { Outlet, Navigate } from "react-router-dom";
import { useDinersAuthStore } from "../store/useDinersAuthStore";

export const DinersProtectedRoute = () => {

    const token = useDinersAuthStore((state) => state.token);

    return token ? <Outlet /> : <Navigate to="/diners/login" />
}