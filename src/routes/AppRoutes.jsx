import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cadastro from "../pages/cadastro";
import Login from "../pages/login";
import Principal from "../pages/principal";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/principal"
          element={
            <PrivateRoute>
              <Principal />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}