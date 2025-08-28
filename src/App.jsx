import { DinersSignUpForm } from "./diners/pages/DinersSignUpForm.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DinersLoginForm } from "./diners/pages/DinersLoginForm.jsx";
import { DinersProtectedRoute } from "./diners/util/DinersProtectedRoute.jsx";
import { Dashboard } from "./diners//pages/Dashboard.jsx";
import { NoPage } from "./diners/pages/NoPage";
import { HomePage } from "./Landing/HomePage.jsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Index page for project */}
        <Route path="/" element={<HomePage />} />

        {/* Routing for Diners */}
        <Route path="diners/signup" element={<DinersSignUpForm />} />
        <Route path="diners/login" element={<DinersLoginForm />} />

        {/* Routing for Restaurant */}

        {/* Protected Routes Diners */}
        <Route element={<DinersProtectedRoute />}>
          <Route path="/diners/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};
