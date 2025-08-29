import { DinersSignUpForm } from "./diners/pages/DinersSignUpForm.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DinersLoginForm } from "./diners/pages/DinersLoginForm.jsx";
import { DinersProtectedRoute } from "./diners/util/DinersProtectedRoute.jsx";
import { UserDashboard } from "./diners/pages/UserDashboard.jsx";
import { NoPage } from "./diners/pages/NoPage";
import { HomePage } from "./Landing/HomePage.jsx";
import { RestaurantProtectedRoute } from "./restaurant/util/RestaurantProtectedRoute.jsx";
import { RestaurantDashboard } from "./restaurant/pages/RestaurantDashBoard.jsx";
import { RestaurantSignUpForm } from "./restaurant/pages/RestaurantSignUpForm.jsx";
import { RestaurantLoginForm } from "./restaurant/pages/RestaurantLoginForm.jsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Index page for project */}
        <Route path="/" element={<HomePage />} />

        {/* Routing for Diners */}
        <Route path="diners/signup" element={<DinersSignUpForm />} />
        <Route path="diners/login" element={<DinersLoginForm />} />

        {/* Protected Routes Diners */}
        <Route element={<DinersProtectedRoute />}>
          <Route path="/diners/dashboard" element={<UserDashboard />} />
        </Route>

        {/* Routing for Restaurant */}
        <Route path="restaurant/signup" element={<RestaurantSignUpForm />} />
        <Route path="restaurant/login" element={<RestaurantLoginForm />} />

        {/* Protected Routes Restaurant */}
        <Route element={<RestaurantProtectedRoute />}>
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};
