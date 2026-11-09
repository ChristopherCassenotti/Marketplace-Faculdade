import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoritosProvider } from "./context/FavoritosContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Anuncios from "./pages/Anuncios";
import CriarAnuncio from "./pages/CriarAnuncio";
import ResumoCategorias from "./pages/ResumoCategorias";
import EmpresaVitrine from "./pages/EmpresaVitrine";
import AnuncioDetalhes from "./pages/AnuncioDetalhes";
import Favoritos from "./pages/Favoritos";

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

            <Route path="/empresas/:id" element={<EmpresaVitrine />} />

            <Route
              path="/relatorios/categorias"
              element={<ResumoCategorias />}
            />
          </Route>

          <Route path="/anuncios/:id" element={<AnuncioDetalhes />} />

          <Route path="/favoritos" element={<Favoritos />} />

          <Route path="*" element={<Navigate to="/anuncios" replace />} />
        </Routes>
      </FavoritosProvider>
    </AuthProvider>
  );
}
