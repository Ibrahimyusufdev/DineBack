import { useRestaurantAuthStore } from "../store/useRestaurantAuthStore";
import { Outlet, Navigate } from "react-router-dom";
import { RestaurantLoginForm } from "../pages/RestaurantLoginForm";

export const RestaurantProtectedRoute = () => {
    const token = useRestaurantAuthStore((state) => state.token);

    return token ? <Outlet /> : <RestaurantLoginForm />
}