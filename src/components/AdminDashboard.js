import React, { useState } from "react";
import destinos from "../data/destinos";

export default function AdminDashboard({ onBack, onSelecionarDestino }) {
  const [filtro, setFiltro] = useState("");
  const destinosFiltrados = destinos.filter(
    d => d.nome.toLowerCase().includes(filtro.toLowerCase()) ||
         d.pais.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        className="mb-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        onClick={onBack}
        title="Retroceder"
      >
        ← Retroceder
      </button>
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Painel de Administração</h2>
      <input
        type="text"
        placeholder="Filtrar destinos..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-6"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {destinosFiltrados.length === 0 && (
          <p className="text-gray-500">Nenhum destino encontrado.</p>
        )}
        {destinosFiltrados.map(dest => (
          <div
            key={dest.id}
            className="bg-white rounded-xl shadow p-4 cursor-pointer hover:scale-105 transition"
            onClick={() => onSelecionarDestino(dest)}
          >
            <img src={dest.imagemUrl} alt={dest.nome} className="h-36 w-full object-cover rounded mb-3" />
            <h3 className="text-xl font-bold">{dest.nome}</h3>
            <p className="text-gray-700 mb-1">{dest.descricao}</p>
            <span className="text-blue-600 font-semibold">{dest.precoDesde}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
