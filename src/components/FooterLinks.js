import React from "react";
import { Link } from "react-router-dom";

export default function FooterLinks() {
  return (
    <footer className="w-full bg-gray-50 border-t pt-8 pb-5 mt-10 text-center text-sm text-gray-700">
      <div className="mb-3 flex flex-wrap gap-5 justify-center">
        <Link to="/politica-privacidade" className="hover:underline">Política de Privacidade</Link>
        <Link to="/termos-condicoes" className="hover:underline">Termos e Condições</Link>
        <Link to="/politica-cookies" className="hover:underline">Política de Cookies</Link>
        <Link to="/faq" className="hover:underline">Perguntas Frequentes</Link>
        <Link to="/contacto" className="hover:underline">Contacto</Link>
      </div>
      <div className="mb-2">
        <span className="font-semibold">DreamTripSavings</span> &copy; {new Date().getFullYear()} — Ricardo Fernandes. Todos os direitos reservados.
      </div>
      <div className="text-xs text-gray-500">
        Este site pode receber comissão por vendas/afiliações.<br />
        Reservas de pacotes são feitas diretamente com a nossa equipa; produtos de parceiros são externos.
      </div>
    </footer>
  );
}
