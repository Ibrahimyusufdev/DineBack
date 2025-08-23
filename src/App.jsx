import { SignUpForm } from "./pages/SignUpForm.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../Layout.jsx";
import { LoginForm } from "./pages/LoginForm.jsx";
import { ProtectedRoute } from "./util/ProtectedRoute.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { NoPage } from "./pages/NoPage";

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
