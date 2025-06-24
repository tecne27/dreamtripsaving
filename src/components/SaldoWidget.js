import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserSaldo } from "../services/saldoService"; // Função que busca saldo do utilizador (ajusta se usares contexto direto)

export default function SaldoWidget() {
  const { currentUser, logout } = useAuth();
  const [mostrar, setMostrar] = useState(true);
  const [saldo, setSaldo] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    // Busca saldo do utilizador (Firebase ou outra fonte)
    getUserSaldo(currentUser.uid).then(setSaldo);
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <div className="flex items-center justify-end mb-4 px-2">
      <div className="flex items-center gap-2 bg-white/90 rounded-xl px-4 py-2 shadow-lg">
        <span className="font-bold text-gray-700">Saldo:</span>
        <span className="font-mono text-xl text-blue-700 min-w-[70px] text-right">
          {mostrar ? (saldo !== null ? `${saldo.toFixed(2)} €` : "—") : "••••"}
        </span>
        <button
          className="ml-2 text-blue-700 hover:text-blue-900 text-2xl transition"
          onClick={() => setMostrar((m) => !m)}
          title={mostrar ? "Esconder saldo" : "Mostrar saldo"}
        >
          {mostrar ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {/* olho aberto */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.5 12S5 4.5 12 4.5 22.5 12 22.5 12 19 19.5 12 19.5 1.5 12 1.5 12z" />
              <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth={2} fill="none"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {/* olho fechado */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M1.5 12S5 4.5 12 4.5c2.36 0 4.45.71 6.22 1.79M22.5 12s-3.5 7.5-10.5 7.5c-2.36 0-4.45-.71-6.22-1.79" />
              <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth={2} fill="none"/>
            </svg>
          )}
        </button>
        <button
          onClick={logout}
          className="ml-4 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Terminar sessão
        </button>
      </div>
    </div>
  );
}
