import { SignUpForm } from "./diners/pages/SignUpForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm } from "./diners/pages/LoginForm.jsx";
import { ProtectedRoute } from "./diners//util/ProtectedRoute.jsx";
import { Dashboard } from "./diners//pages/Dashboard.jsx";
import { NoPage } from "./diners/pages/NoPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="login" element={<LoginForm />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};
