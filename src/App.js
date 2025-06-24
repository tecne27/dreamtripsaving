import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import MainNav from "./components/MainNav";
import RightBar from "./components/RightBar";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Perfil from "./components/Perfil";
import Mensagens from "./components/Mensagens";
import Reviews from "./components/Reviews";
import Convites from "./components/Convites";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import LojaViagens from "./components/LojaViagens";
import Voluntariado from "./components/Voluntariado";
import Suporte from "./components/Suporte";
import PoliticaPrivacidade from "./components/PoliticaPrivacidade";
import TermosCondicoes from "./components/TermosCondicoes";
import PoliticaCookies from "./components/PoliticaCookies";
import Faq from "./components/Faq";
import Contacto from "./components/Contacto";
import FooterLinks from "./components/FooterLinks";
import CookieBanner from "./components/CookieBanner";

function isAdmin(user) {
  return user && (
    user.email === "ricardo35fernandes@gmail.com" ||
    user.email === "dreamtripsavingsbook@gmail.com"
  );
}

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      {/* Banner legal de cookies */}
      <CookieBanner />

      {currentUser && (
        <>
          <div className="fixed top-0 left-0 z-40">
            <MainNav />
          </div>
          <RightBar />
        </>
      )}
      <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 flex flex-col justify-between">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <LandingPage />} />
            <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/perfil" element={currentUser ? <Perfil /> : <Navigate to="/" />} />
            <Route path="/mensagens" element={currentUser ? <Mensagens /> : <Navigate to="/" />} />
            <Route path="/reviews" element={currentUser ? <Reviews /> : <Navigate to="/" />} />
            <Route path="/convites" element={currentUser ? <Convites /> : <Navigate to="/" />} />
            <Route path="/loja" element={currentUser ? <LojaViagens /> : <Navigate to="/" />} />
            <Route path="/voluntariado" element={currentUser ? <Voluntariado /> : <Navigate to="/" />} />
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-condicoes" element={<TermosCondicoes />} />
            <Route path="/politica-cookies" element={<PoliticaCookies />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin/*" element={currentUser && isAdmin(currentUser) ? <Admin /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <FooterLinks />
      </div>
    </Router>
  );
}

export default App;
