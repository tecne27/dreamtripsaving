import React, { useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(() => !localStorage.getItem("cookiesAceite"));
  const aceitar = () => {
    localStorage.setItem("cookiesAceite", "sim");
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 flex justify-center">
      <div className="bg-blue-700 text-white rounded-lg px-6 py-4 shadow-lg flex items-center gap-4">
        <span>
          Este site usa cookies para melhorar a experiência. Consulte a <a href="/politica-cookies" className="underline text-white">Política de Cookies</a>.
        </span>
        <button className="ml-4 bg-white text-blue-700 font-bold px-3 py-1 rounded" onClick={aceitar}>
          Aceitar
        </button>
      </div>
    </div>
  );
}
