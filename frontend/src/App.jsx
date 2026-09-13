import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoritosProvider } from "./context/FavoritosContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Anuncios from "./pages/Anuncios";
import CriarAnuncio from "./pages/CriarAnuncio";

export default function App() {
  return (
    <AuthProvider>
      <FavoritosProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/anuncios" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/anuncios" element={<Anuncios />} />
            <Route path="/anuncios/novo" element={<CriarAnuncio />} />
          </Route>

          <Route path="*" element={<Navigate to="/anuncios" replace />} />
        </Routes>
      </FavoritosProvider>
    </AuthProvider>
  );
}
